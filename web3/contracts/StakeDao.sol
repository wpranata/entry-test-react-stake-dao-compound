//// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract StakeDao is Initializable {
    // ERC20 token
    using SafeERC20 for IERC20;
    IERC20 public TOKEN;

    // Constants
    uint256 public REWARD_EMISSION;
    uint256 public EMISSION_PERIOD;
    uint256 public DISTRIBUTION_START;

    // Staker
    struct Staker {
        uint256 staked;
        uint256 claimableReward;
        uint256 rewardPerToken;
        uint256 latestUpdateTime;
        uint256 latestPeriodSecondsRemainder;
    }
    mapping(address => Staker) public stakers;

    // Total
    struct Total {
        uint256 staked;
        uint256 rewardPerToken;
        uint256 latestUpdateTime;
        uint256 latestPeriodSecondsRemainder;
    }
    Total public total;

    event Staked(address indexed staker, uint256 amount);
    event Unstaked(address indexed staker, uint256 amount);
    event Claimed(address indexed staker, uint256 amount);
    event Compounded(address indexed staker, uint256 amount);

    function initialize(
        address token_,
        uint256 rewardEmission_,
        uint256 emissionPeriod_
    ) public initializer {
        IERC20 token = IERC20(token_);
        uint256 totalReward = token.balanceOf(address(this));
        require(
            totalReward >= rewardEmission_,
            "Insufficient balance for reward distribution"
        );

        TOKEN = token;
        REWARD_EMISSION = rewardEmission_;
        EMISSION_PERIOD = emissionPeriod_;
        DISTRIBUTION_START = block.timestamp;
        total.latestUpdateTime = block.timestamp;
        total.latestPeriodSecondsRemainder = _getPeriodSecondsRemainder(
            _getDeltaSeconds(DISTRIBUTION_START)
        );
    }

    function claimableReward(address staker_) public view returns (uint256) {
        uint256 reward = stakers[staker_].claimableReward;
        uint256 latestReward = _getLatestStakerReward(staker_);

        return reward + latestReward;
    }

    function stake(uint256 amount_) public {
        require(amount_ > 0, "Stake amount should be more than 0");
        require(TOKEN.balanceOf(msg.sender) >= amount_, "Insufficient balance");

        _updateStakerReward();

        stakers[msg.sender].staked += amount_;
        total.staked += amount_;

        TOKEN.safeTransferFrom(msg.sender, address(this), amount_);

        emit Staked(msg.sender, amount_);
    }

    function unstake(uint256 amount_) public {
        require(amount_ > 0, "Unstake amount should be more than 0");
        require(
            stakers[msg.sender].staked >= amount_,
            "Insufficient staked amount"
        );

        _updateStakerReward();

        stakers[msg.sender].staked -= amount_;
        total.staked -= amount_;

        TOKEN.safeTransfer(msg.sender, amount_);
        emit Unstaked(msg.sender, amount_);
    }

    function claimReward() public {
        _updateStakerReward();

        uint256 reward = stakers[msg.sender].claimableReward;
        require(reward > 0, "No claimable reward");

        stakers[msg.sender].claimableReward = 0;

        TOKEN.safeTransfer(msg.sender, reward);

        emit Claimed(msg.sender, reward);
    }

    function compoundReward() public {
        _updateStakerReward();

        Staker storage staker = stakers[msg.sender];

        uint256 reward = staker.claimableReward;
        require(reward > 0, "No compoundable reward");

        staker.claimableReward = 0;

        staker.staked += reward;
        total.staked += reward;

        emit Compounded(msg.sender, reward);
    }

    function _initializeStaker(address staker_) internal {
        Staker storage staker = stakers[staker_];
        staker.latestUpdateTime = block.timestamp;
        staker.latestPeriodSecondsRemainder = _getPeriodSecondsRemainder(
            _getDeltaSeconds(DISTRIBUTION_START)
        );
        staker.rewardPerToken = total.rewardPerToken;
    }

    function _updateStakerReward() internal {
        _updateTotalRewardPerToken();

        // If staker is not staking, initialize `staker` with current timestamp
        if (stakers[msg.sender].latestUpdateTime == 0) {
            _initializeStaker(msg.sender);
            return;
        }

        Staker storage staker = stakers[msg.sender];

        (uint256 deltaPeriod, uint256 remainder) = _getDeltaPeriodWithRemainder(
            staker.latestUpdateTime,
            staker.latestPeriodSecondsRemainder
        );

        // If deltaPeriod is not 0, update reward
        if (deltaPeriod != 0)
            staker.claimableReward += _getLatestStakerReward(msg.sender);

        staker.rewardPerToken = total.rewardPerToken;
        staker.latestUpdateTime = block.timestamp;
        staker.latestPeriodSecondsRemainder = remainder;
    }

    function _updateTotalRewardPerToken() internal {
        (
            uint256 latestTotalReward,
            uint256 periodSecondsRemainder
        ) = _getCurrentTotalRewardPerToken();

        // If deltaPeriod is not 0, add rewardPerToken
        if (total.rewardPerToken != latestTotalReward)
            total.rewardPerToken = latestTotalReward;

        total.latestUpdateTime = block.timestamp;
        total.latestPeriodSecondsRemainder = periodSecondsRemainder;
    }

    function getCurrentTotalRewardPerToken()
        public
        view
        returns (uint256, uint256)
    {
        return _getCurrentTotalRewardPerToken();
    }

    function _getCurrentTotalRewardPerToken()
        internal
        view
        returns (uint256, uint256)
    {
        // If latest update is current block, return current rewardPerToken
        if (total.latestUpdateTime == block.timestamp)
            return (total.rewardPerToken, total.latestPeriodSecondsRemainder);

        (
            uint256 deltaPeriod,
            uint256 periodSecondsRemainder
        ) = _getDeltaPeriodWithRemainder(
                total.latestUpdateTime,
                total.latestPeriodSecondsRemainder
            );

        // If deltaPeriod or total.staked is 0, return current rewardPerToken
        if (deltaPeriod == 0 || total.staked == 0)
            return (total.rewardPerToken, periodSecondsRemainder);

        uint256 reward = (REWARD_EMISSION * deltaPeriod) / total.staked;
        return (total.rewardPerToken + reward, periodSecondsRemainder);
    }

    function getLatestStakerReward(
        address staker_
    ) public view returns (uint256) {
        return _getLatestStakerReward(staker_);
    }

    function _getLatestStakerReward(
        address staker_
    ) internal view returns (uint256) {
        if (stakers[staker_].staked == 0) return 0;

        (uint256 latestTotalReward, ) = _getCurrentTotalRewardPerToken();
        uint256 deltaReward = latestTotalReward -
            stakers[staker_].rewardPerToken;
        return deltaReward * stakers[staker_].staked;
    }

    function getDeltaPeriodWithRemainder(
        uint256 since_,
        uint256 periodSecondsRemainder_
    ) public view returns (uint256, uint256) {
        return _getDeltaPeriodWithRemainder(since_, periodSecondsRemainder_);
    }

    function _getDeltaPeriodWithRemainder(
        uint256 since_,
        uint256 periodSecondsRemainder_
    ) internal view returns (uint256, uint256) {
        uint256 deltaSeconds = _getDeltaSeconds(since_);
        if (deltaSeconds < periodSecondsRemainder_)
            return (0, periodSecondsRemainder_ - deltaSeconds);
            
        uint256 deltaPeriod = deltaSeconds / EMISSION_PERIOD;
        uint256 periodSecondsRemainder = _getPeriodSecondsRemainder(
            deltaSeconds
        );

        return (deltaPeriod, periodSecondsRemainder);
    }

    function getDeltaSeconds(uint256 since_) public view returns (uint256) {
        return _getDeltaSeconds(since_);
    }

    function _getDeltaSeconds(uint256 since_) internal view returns (uint256) {
        return block.timestamp - since_;
    }

    function getPeriodSecondsRemainder(
        uint256 seconds_
    ) public view returns (uint256) {
        return _getPeriodSecondsRemainder(seconds_);
    }

    function _getPeriodSecondsRemainder(
        uint256 seconds_
    ) internal view returns (uint256) {
        return
            (EMISSION_PERIOD - (seconds_ % EMISSION_PERIOD)) % EMISSION_PERIOD;
    }
}
