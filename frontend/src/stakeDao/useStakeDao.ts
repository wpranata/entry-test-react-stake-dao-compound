import { useCallback, useEffect, useState } from "react";
import { StakeDao, StakeDao__factory } from "../typechain-types";
import { Signer } from "ethers";

const STAKEDAO_CONTRACT_ADDRESS = process.env.REACT_APP_STAKEDAO_ADDRESS!;

export function useStakeDao(args: { signer?: Signer; signerAddress: string }) {
  const { signer, signerAddress } = args;

  const [stakeDaoContract, setStakeDaoContract] = useState<StakeDao>();
  const [tokenAddress, setTokenAddress] = useState("");
  const [stakedBalance, setStakedBalance] = useState(0);
  const [rewardBalance, setRewardBalance] = useState(0);

  const updateStakedBalance = useCallback(async () => {
    if (!stakeDaoContract || !signerAddress) return;
    const staker = await stakeDaoContract.stakers(signerAddress);
    setStakedBalance(Number(staker.staked));
  }, [stakeDaoContract, signerAddress]);

  const updateRewardBalance = useCallback(async () => {
    if (!stakeDaoContract || !signerAddress) return;
    const claimableReward = await stakeDaoContract.claimableReward(
      signerAddress
    );
    setRewardBalance(Number(claimableReward));
  }, [stakeDaoContract, signerAddress]);

  // Get StakeDao contract
  useEffect(() => {
    if (!signer) return;
    const contract = StakeDao__factory.connect(
      STAKEDAO_CONTRACT_ADDRESS,
      signer
    );
    setStakeDaoContract(contract);
  }, [signer]);

  // Get token address
  useEffect(() => {
    if (!stakeDaoContract) return;
    stakeDaoContract.TOKEN().then(setTokenAddress);
  }, [stakeDaoContract]);

  // Get staked balance
  useEffect(() => {
    updateStakedBalance();
  }, [updateStakedBalance]);

  // Get reward balance
  useEffect(() => {
    updateRewardBalance();
  }, [updateRewardBalance]);

  return {
    stakeDaoContract,
    tokenAddress,
    stakedBalance,
    rewardBalance,
    updateStakedBalance,
    updateRewardBalance,
  };
}
