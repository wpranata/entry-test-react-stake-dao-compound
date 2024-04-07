import { task, types } from "hardhat/config";
import { getLatestDeployment } from "../helpers/deployment.helper";

task("verify-proxy", "Verifies '${args.contractName}' contract")
  .addOptionalParam(
    "contractName",
    "The name of the contract",
    undefined,
    types.string
  )
  .addOptionalParam(
    "address",
    "The address of the contract to verify",
    undefined,
    types.string
  )
  .setAction(async (args, hre) => {
    if (!!args.contractName == !!args.address)
      throw new Error("One of 'contract-name' or 'address' must be provided.");

    const { run, ethers, network } = hre;

    let proxyAddress;
    if (args.address) {
      if (!ethers.isAddress(args.address)) throw new Error("Invalid address");

      console.log(
        `[i] Verifying '${args.contractName}' at address '${args.address}'...`
      );
      proxyAddress = args.address;
    } else {
      // args.contractName should already be defined
      console.log(
        `[i] Fetching latest '${args.contractName}' Proxy address...`
      );

      const latestProxy = getLatestDeployment(args.contractName, network.name);
      if (!latestProxy)
        throw new Error(`No deployed '${args.contractName}' contract found`);

      proxyAddress = latestProxy.proxyAddress;
      console.log(
        `[i] Verifying latest '${args.contractName}' at address '${proxyAddress}'...`
      );
    }

    await run("verify:verify", {
      address: proxyAddress,
    });
  });
