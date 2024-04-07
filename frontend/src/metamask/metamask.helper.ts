import { MetaMaskInpageProvider } from "@metamask/providers";
import { BrowserProvider } from "ethers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export function getBrowserMetamask() {
  return window.ethereum?.isMetaMask ? window.ethereum : undefined;
}

export function getMetamaskProvider() {
  const browserMetamask = getBrowserMetamask();
  return browserMetamask ? new BrowserProvider(browserMetamask) : undefined;
}

export function metamaskIsConnected() {
  return getBrowserMetamask()?.isConnected();
}

export async function getSignerFromMetamask() {
  if (!metamaskIsConnected()) await connectMetamask();

  const provider = getMetamaskProvider();
  if (!provider) return undefined;

  return await provider.getSigner();
}

export async function connectMetamask() {
  if (metamaskIsConnected()) return;

  const provider = getMetamaskProvider();
  if (!provider) throw new Error("Metamask wallet is not installed");

  await provider.send("eth_requestAccounts", []);
}
