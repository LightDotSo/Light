/* eslint-disable no-console */

import * as ethers from "ethers";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { Provider, utils, Wallet } from "zksync-web3";

// Put the address of the deployed paymaster here
const PAYMASTER_ADDRESS = "0x094499Df5ee555fFc33aF07862e43c90E6FEe501";

// Put the address of the ERC20 token here:
const TOKEN_ADDRESS = "0x5fE58d975604E6aF62328d9E505181B94Fc0718C";

// Wallet private key
const EMPTY_WALLET_PRIVATE_KEY =
  "0x36e814d89dfeba68200d170d746b2d1f5edc1329f9099d224141978c4b58fc56";

// eslint-disable-next-line func-style
function getToken(hre: HardhatRuntimeEnvironment, wallet: Wallet) {
  const artifact = hre.artifacts.readArtifactSync("MyERC20");
  return new ethers.Contract(TOKEN_ADDRESS, artifact.abi, wallet);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (hre: HardhatRuntimeEnvironment) {
  const provider = new Provider(hre.config.zkSyncDeploy.zkSyncNetwork);
  const emptyWallet = new Wallet(EMPTY_WALLET_PRIVATE_KEY, provider);

  // Obviously this step is not required, but it is here purely to demonstrate
  // that indeed the wallet has no ether.
  const ethBalance = await emptyWallet.getBalance();
  if (!ethBalance.eq(0)) {
    throw new Error("The wallet is not empty");
  }

  console.log(
    `Balance of the user before mint: ${await emptyWallet.getBalance(
      TOKEN_ADDRESS,
    )}`,
  );

  const erc20 = getToken(hre, emptyWallet);

  // Encoding the "ApprovalBased" paymaster flow's input
  const paymasterParams = utils.getPaymasterParams(PAYMASTER_ADDRESS, {
    type: "ApprovalBased",
    token: TOKEN_ADDRESS,
    minimalAllowance: ethers.BigNumber.from(1),
    innerInput: new Uint8Array(),
  });

  await (
    await erc20.mint(emptyWallet.address, 100, {
      customData: {
        paymasterParams,
        ergsPerPubdata: utils.DEFAULT_ERGS_PER_PUBDATA_LIMIT,
      },
    })
  ).wait();

  console.log(
    `Balance of the user after mint: ${await emptyWallet.getBalance(
      TOKEN_ADDRESS,
    )}`,
  );
}
