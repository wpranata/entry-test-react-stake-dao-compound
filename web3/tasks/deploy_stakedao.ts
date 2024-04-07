import { task, types } from "hardhat/config";
import { getLatestDeployment, recordDeployment } from "../helpers/deployment.helper";

task("deploy:stakedao", "Deploys StakeDAO contract")
  .addParam(
    "allocatedRewards",
    "The total amount of rewards to be allocated",
    undefined,
    types.string
  )
  .addParam(
    "rewardEmission",
    "The reward emission rate",
    undefined,
    types.string
  )
  .addParam(
    "emissionPeriodSeconds",
    "The reward emission period in seconds",
    undefined,
    types.string
  )
  .addOptionalParam(
    "tokenAddress",
    "The address of the token contract. If not provided, the task will use the latest deployed STD20 contract",
    undefined,
    types.string
  )
  .addFlag(
    "forceRedeployImpl",
    "Whether to redeploy the implementation contract"
  )
  .setAction(async (args, hre) => {
    const { ethers, upgrades, network } = hre;

    // Fetching STD20 contract
    let tokenAddress = args.tokenAddress;
    if (!tokenAddress) {
      console.log("[i] Fetching latest STD20 Proxy address...");

      const latestProxy = getLatestDeployment("STD20", network.name);
      if (!latestProxy) throw new Error(`No deployed STD20 contract found`);

      tokenAddress = latestProxy.proxyAddress;
      console.log("[!] Using latest STD20 at address:", tokenAddress);
    }

    const std20 = await ethers.getContractAt("STD20", tokenAddress);

    // Checking whether account balance is sufficient
    const [signer] = await ethers.getSigners();
    const balance = await std20.balanceOf(signer.address);
    if (balance < Number(args.allocatedRewards))
      throw new Error("Insufficient STD20 balance");

    // Proxy Deployment
    if (args.forceRedeployImpl)
      console.log("[!] Forcing redeploy of implementation contract");

    const stakeDaoFactory = await ethers.getContractFactory("StakeDao");

    console.log("[i] Deploying StakeDao...");
    const stakeDao = await upgrades.deployProxy(stakeDaoFactory, undefined, {
      redeployImplementation: args.forceRedeployImpl ? "always" : "onchange",
      initializer: false,
    });
    await stakeDao.waitForDeployment();

    const proxyAddress = await stakeDao.getAddress();
    console.log("[i] StakeDAO deployed to:", proxyAddress);

    // Pre-initialization
    console.log("[i] Transferring STD20 to StakeDAO...");
    const tokenTransferTx = await std20.transfer(
      proxyAddress,
      args.allocatedRewards
    );
    await tokenTransferTx.wait();
    console.log(`[!] Token transferred! tx hash: ${tokenTransferTx.hash}`);

    // Initializing the contract
    console.log("[i] Initializing StakeDAO...");
    const initializeTx = await stakeDao.initialize(
      tokenAddress,
      args.rewardEmission,
      args.emissionPeriodSeconds
    );
    await initializeTx.wait();

    console.log(`[!] StakeDAO initialized! tx hash: ${initializeTx.hash}`);

    // Recording the deployment
    recordDeployment({
      contract: "StakeDao",
      proxyAddress,
      network: network.name,
    });

    return { proxyAddress };
  });
