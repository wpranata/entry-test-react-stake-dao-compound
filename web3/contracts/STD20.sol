//// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract STD20 is ERC20Upgradeable {
    using SafeERC20 for IERC20;

    function initialize(
        string memory name_,
        string memory symbol_,
        uint256 supply_
    ) public initializer {
        __ERC20_init(name_, symbol_);
        _mint(msg.sender, supply_);
    }
}
