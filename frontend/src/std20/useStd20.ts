import { useCallback, useEffect, useState } from "react";
import { STD20, STD20__factory } from "../typechain-types";
import { Signer } from "ethers";

export function useStd20(args: {
  signer?: Signer;
  tokenAddress: string;
  signerAddress: string;
}) {
  const { signer, tokenAddress, signerAddress } = args;

  const [std20Contract, setStd20Contract] = useState<STD20>();
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);

  const updateTokenBalance = useCallback(async () => {
    if (!std20Contract || !signerAddress) return;
    const tokenBalance = await std20Contract.balanceOf(signerAddress);
    setAccountBalance(Number(tokenBalance));
  }, [std20Contract, signerAddress]);

  // Get STD20 contract
  useEffect(() => {
    if (!signer || !tokenAddress) return;
    const contract = STD20__factory.connect(tokenAddress, signer);
    setStd20Contract(contract);
  }, [signer, tokenAddress]);

  // Get symbol
  useEffect(() => {
    if (!std20Contract) return;
    std20Contract.symbol().then(setSymbol);
  }, [std20Contract]);

  // Get decimals
  useEffect(() => {
    if (!std20Contract) return;
    std20Contract.decimals().then((res) => setDecimals(Number(res)));
  }, [std20Contract]);

  // Get token balance
  useEffect(() => {
    updateTokenBalance();
  }, [updateTokenBalance]);

  return {
    std20Contract,
    symbol,
    decimals,
    accountBalance,
    updateTokenBalance,
  };
}
