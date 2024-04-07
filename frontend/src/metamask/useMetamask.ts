import { BrowserProvider, Signer } from "ethers";
import { useEffect, useState } from "react";
import { getMetamaskProvider, getSignerFromMetamask } from "./metamask.helper";
import { useCustomContext } from "../context/useCustomContext";
import { LoadingContext } from "../loading/Loading.provider";

export function useMetamask() {
  const { clearLoadingMessage, setLoadingMessage } =
    useCustomContext(LoadingContext);

  const [signer, setSigner] = useState<Signer>();
  const [provider, setProvider] = useState<BrowserProvider>();
  const [signerAddress, setSignerAddress] = useState("");

  // Get signer
  useEffect(() => {
    setLoadingMessage("Loading Metamask...");
    getSignerFromMetamask()
      .then((res) => {
        setSigner(res);
        clearLoadingMessage();
      })
      .catch((e) => alert(e.message));
  }, [setLoadingMessage, clearLoadingMessage]);

  // Get provider
  useEffect(() => {
    if (!signer) return;
    const provider = getMetamaskProvider();
    if (provider) setProvider(provider);
  }, [signer]);

  // Get Signer address
  useEffect(() => {
    if (signer) signer.getAddress().then(setSignerAddress);
  }, [signer]);

  return {
    signer,
    provider,
    signerAddress,
  };
}
