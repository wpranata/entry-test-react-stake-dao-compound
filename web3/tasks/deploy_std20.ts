import { task, types } from "hardhat/config";
import { recordDeployment } from "../helpers/deployment.helper";

task("deploy:std20", "Deploys STD20 contract")
  .addParam("name", "The name of the token", undefined, types.string)
  .addParam("symbol", "The symbol of the token", undefined, types.string)
  .addParam(
    "initialSupply",
    "The initial supply of the token",
    undefined,
    types.string
  )
  .addFlag(
    "forceRedeployImpl",
    "Whether to redeploy the implementation contract"
  )
  .setAction(async (args, hre) => {
    const { ethers, upgrades, network } = hre;

    // Proxy Deployment & initialization
    if (args.forceRedeployImpl)
      console.log("[!] Forcing redeploy of implementation contract");

    const STD20Factory = await ethers.getContractFactory("STD20");

    console.log("[i] Deploying STD20...");
    const std20 = await upgrades.deployProxy(
      STD20Factory,
      [args.name, args.symbol, args.initialSupply],
      {
        redeployImplementation: args.forceRedeployImpl ? "always" : "onchange",
      }
    );
    await std20.waitForDeployment();

    const proxyAddress = await std20.getAddress();
    console.log("[i] STD20 deployed to:", proxyAddress);

    // Recording the deployment
    recordDeployment({
      contract: "STD20",
      proxyAddress,
      network: network.name,
    });

    return { proxyAddress };
  });
