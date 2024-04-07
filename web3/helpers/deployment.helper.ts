import fs from "fs";

export type Deployment = {
  contract: string;
  proxyAddress: string;
  network: string;
};

export const DEPLOYMENT_PATH = `${__dirname}/../deployments.json`;

export function deploymentExists() {
  return fs.existsSync(DEPLOYMENT_PATH);
}

export function getDeploymentContents(): Deployment[] {
  if (!deploymentExists()) return [];
  return JSON.parse(fs.readFileSync(DEPLOYMENT_PATH).toString());
}

export function recordDeployment(args: Deployment) {
  const content = getDeploymentContents();
  content.push(args);

  fs.writeFileSync(DEPLOYMENT_PATH, JSON.stringify(content, null, 2));
  console.log("[!] Deployment recoded to deployments.json");
}

export function getLatestDeployment(
  contract: string,
  network: string
): Deployment | undefined {
  const content = getDeploymentContents();
  const latest = content
    .filter((d: Deployment) => d.contract === contract && d.network === network)
    .pop();

  return latest;
}
