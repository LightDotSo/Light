/* eslint-disable no-console */

import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import * as ethers from "ethers";
import type { BytesLike } from "ethers";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { utils, Wallet } from "zksync-web3";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (hre: HardhatRuntimeEnvironment) {
  // The wallet that will deploy
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY as BytesLike);
  // The wallet that will receive ERC20 tokens
  const emptyWallet = Wallet.createRandom();
  console.log(`Empty wallet's address: ${emptyWallet.address}`);
  console.log(`Empty wallet's private key: ${emptyWallet.privateKey}`);

  const deployer = new Deployer(hre, wallet);

  // Depositing funds, so that we can send transaction
  await (
    await deployer.zkWallet.deposit({
      token: utils.ETH_ADDRESS,
      amount: ethers.utils.parseEther("0.001"),
    })
  ).wait();

  // Deploying the ERC20 token
  const erc20Artifact = await deployer.loadArtifact("MyERC20");
  const erc20 = await deployer.deploy(erc20Artifact, [
    "MyToken",
    "MyToken",
    18,
  ]);
  console.log(`ERC20 address: ${erc20.address}`);

  // Deploying the paymaster
  const paymasterArtifact = await deployer.loadArtifact("MyPaymaster");
  const paymaster = await deployer.deploy(paymasterArtifact, [erc20.address]);
  console.log(`Paymaster address: ${paymaster.address}`);

  // Supplying paymaster with some ETH
  await deployer.zkWallet.sendTransaction({
    to: paymaster.address,
    value: ethers.utils.parseEther("0.01"),
  });

  // Supplying the ERC20 tokens to the empty wallet:
  await // We will give the empty wallet 3 units of the token:
  (await erc20.mint(emptyWallet.address, 3)).wait();

  console.log(`Done!`);
}
