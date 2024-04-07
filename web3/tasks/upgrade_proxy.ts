import { task, types } from "hardhat/config";
import { getLatestDeployment } from "../helpers/deployment.helper";

type AvailableContracts = "STD20" | "StakeDao";

task("upgrade-proxy", "Verifies '${args.contractName}' contract")
  .addParam("contractName", "The name of the contract", undefined, types.string)
  .addOptionalParam(
    "address",
    "The address of the contract to verify",
    undefined,
    types.string
  )
  .setAction(async (args, hre) => {
    const { upgrades, ethers, network } = hre;

    let proxyAddress;
    if (args.address) {
      if (!ethers.isAddress(args.address)) throw new Error("Invalid address");

      console.log(
        `[i] Upgrading '${args.contractName}' at address '${args.address}'...`
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
        `[i] Upgrading latest '${args.contractName}' at address '${proxyAddress}'...`
      );
    }

    const contractFactory = await ethers.getContractFactory(
      args.contractName as AvailableContracts
    );

    await upgrades.upgradeProxy(proxyAddress, contractFactory);
  });
