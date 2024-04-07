import { useCallback, useEffect, useState } from "react";
import { useMetamask } from "./metamask/useMetamask";
import { useStakeDao } from "./stakeDao/useStakeDao";
import { useStd20 } from "./std20/useStd20";
import { Loading } from "./loading/Loading";
import { useCustomContext } from "./context/useCustomContext";
import { LoadingContext } from "./loading/Loading.provider";

const STAKEDAO_CONTRACT_ADDRESS = process.env.REACT_APP_STAKEDAO_ADDRESS!;
const EXPLORER_URL = process.env.REACT_APP_EXPLORER_URL!;

export function App() {
  const { clearLoadingMessage, setLoadingMessage } =
    useCustomContext(LoadingContext);
  const { signer, provider, signerAddress } = useMetamask();
  const {
    tokenAddress,
    stakedBalance,
    rewardBalance,
    stakeDaoContract,
    updateStakedBalance,
    updateRewardBalance,
  } = useStakeDao({ signer, signerAddress });
  const {
    std20Contract,
    symbol,
    decimals,
    accountBalance,
    updateTokenBalance,
  } = useStd20({
    signer,
    tokenAddress,
    signerAddress,
  });

  const [stakeAmount, setStakeAmount] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);

  // Set provider listen on every block addition
  useEffect(() => {
    if (!provider) return;

    provider.listenerCount("block").then((count) => {
      new Promise<void>(async (resolve) => {
        if (count !== 0) await provider.removeAllListeners("block");
        resolve();
      }).then(() =>
        provider.on("block", () => {
          updateRewardBalance();
          updateTokenBalance();
          updateStakedBalance();
        })
      );
    });
  }, [provider, updateRewardBalance, updateTokenBalance, updateStakedBalance]);

  const approve = useCallback(async () => {
    if (!stakeAmount || !std20Contract || !decimals) return undefined;
    const tx = await std20Contract.approve(
      STAKEDAO_CONTRACT_ADDRESS,
      `${stakeAmount * 10 ** decimals}`
    );
    await tx.wait();

    return tx.hash;
  }, [stakeAmount, std20Contract, decimals]);

  const stake = useCallback(async () => {
    if (!stakeAmount || !stakeDaoContract || !decimals) return;

    setLoadingMessage("Waiting for approval...");
    const approvalTxHash = await approve();
    if (!approvalTxHash) return;

    setLoadingMessage("Staking tokens...");
    const tx = await stakeDaoContract.stake(`${stakeAmount * 10 ** decimals}`);
    await tx.wait();

    clearLoadingMessage();
    return tx.hash;
  }, [stakeAmount, stakeDaoContract, decimals, approve, setLoadingMessage, clearLoadingMessage]);

  const unstake = useCallback(async () => {
    if (!unstakeAmount || !stakeDaoContract || !decimals) return;

    setLoadingMessage("Unstaking tokens...");
    const tx = await stakeDaoContract.unstake(
      `${unstakeAmount * 10 ** decimals}`
    );
    await tx.wait();

    clearLoadingMessage();
    return tx.hash;
  }, [unstakeAmount, stakeDaoContract, decimals, setLoadingMessage, clearLoadingMessage]);

  const compound = useCallback(async () => {
    if (!stakeDaoContract) return;

    setLoadingMessage("Compounding rewards...");
    const tx = await stakeDaoContract.compoundReward();
    await tx.wait();

    clearLoadingMessage();
    return tx.hash;
  }, [stakeDaoContract, setLoadingMessage, clearLoadingMessage]);

  const claimReward = useCallback(async () => {
    if (!stakeDaoContract) return;

    setLoadingMessage("Claiming rewards...");
    const tx = await stakeDaoContract.claimReward();
    await tx.wait();

    clearLoadingMessage();
    return tx.hash;
  }, [stakeDaoContract, setLoadingMessage, clearLoadingMessage]);

  return (
    <div className="container mt-5">
      <h1>StakeDAO</h1>

      <div className="mb-3">
        <label htmlFor="metamaskAddress" className="form-label">
          Metamask Account Address:
        </label>
        <a
          href={`${EXPLORER_URL}/address/${signerAddress}`}
          rel="noreferrer"
          target="_blank"
          id="metamaskAddress"
          className="form-control"
        >
          {signerAddress}
        </a>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="stakeDaoContractAddress" className="form-label">
            StakeDAO Contract Address:
          </label>
          <a
            href={`${EXPLORER_URL}/address/${STAKEDAO_CONTRACT_ADDRESS}`}
            rel="noreferrer"
            target="_blank"
            id="stakeDaoContractAddress"
            className="form-control"
          >
            {STAKEDAO_CONTRACT_ADDRESS}
          </a>
        </div>
        <div className="col">
          <label htmlFor="std20ContractAddress" className="form-label">
            STD20 Token Address:
          </label>
          <a
            href={`${EXPLORER_URL}/address/${STAKEDAO_CONTRACT_ADDRESS}`}
            rel="noreferrer"
            target="_blank"
            id="std20ContractAddress"
            className="form-control"
          >
            {tokenAddress}
          </a>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="accountBalance" className="form-label">
          Account Balance ({symbol}):
        </label>
        <input
          type="text"
          className="form-control"
          id="accountBalance"
          value={`${(accountBalance / 10 ** decimals).toLocaleString()}`}
          readOnly
        />
      </div>

      <div className="mb-3">
        <label htmlFor="stakingAmount" className="form-label">
          Staking Amount ({symbol}):
        </label>
        <input
          type="text"
          className="form-control"
          id="stakingAmount"
          value={`${(stakedBalance / 10 ** decimals).toLocaleString()}`}
          readOnly
        />
      </div>

      <div className="mb-3">
        <label htmlFor="claimableRewardAmount" className="form-label">
          Claimable Reward Amount ({symbol}):
        </label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="claimableRewardAmount"
            value={`${(rewardBalance / 10 ** decimals).toLocaleString()}`}
            readOnly
          />
          <button
            className="btn btn-success"
            type="button"
            disabled={rewardBalance <= 0}
            onClick={compound}
          >
            Compound
          </button>
          <button
            className="btn btn-warning"
            type="button"
            disabled={rewardBalance <= 0}
            onClick={claimReward}
          >
            Claim Reward
          </button>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="stakeAmount" className="form-label">
          Stake Amount:
        </label>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            id="stakeAmount"
            placeholder="Enter amount to stake"
            onChange={(e) => setStakeAmount(Number(e.target.value))}
          />
          <button
            className="btn btn-primary"
            type="button"
            disabled={stakeAmount <= 0 || stakeAmount > accountBalance}
            onClick={stake}
          >
            Stake
          </button>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="unstakeAmount" className="form-label">
          Unstake Amount:
        </label>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            id="unstakeAmount"
            placeholder="Enter amount to unstake"
            onChange={(e) => setUnstakeAmount(Number(e.target.value))}
          />
          <button
            className="btn btn-primary"
            type="button"
            disabled={unstakeAmount <= 0 || stakeAmount > stakedBalance}
            onClick={unstake}
          >
            Unstake
          </button>
        </div>
      </div>
      <Loading />
    </div>
  );
}
