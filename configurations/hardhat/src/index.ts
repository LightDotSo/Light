/* eslint-disable turbo/no-undeclared-env-vars */
import fs, { readFileSync } from "fs";

import * as dotenv from "dotenv";

import "tsconfig-paths/register";

import { removeConsoleLog } from "hardhat-preprocessor";
import { TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS } from "hardhat/builtin-tasks/task-names";
import type { HardhatUserConfig } from "hardhat/config";
import { subtask } from "hardhat/config";
import * as toml from "toml";

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "hardhat-abi-exporter";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "hardhat-watcher";

subtask(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS).setAction(
  async (_, __, runSuper) => {
    const paths = await runSuper();

    return paths.filter((p: any) => {
      if (p.includes("hardhat")) {
        return false;
      }
      if (p.includes("node_modules")) {
        return false;
      }
      if (p.includes("zksync")) {
        return false;
      }
      if (p.includes("node_modules")) {
        return false;
      }
      return !p.endsWith(".t.sol");
    });
  },
);

let foundry = toml.parse(readFileSync("../../foundry.toml").toString());

const getRemappings = () => {
  return fs
    .readFileSync("../../remappings.txt", "utf8")
    .split("\n")
    .filter(Boolean)
    .map(line => {
      return line.trim().split("=");
    });
};

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: foundry?.profile?.default?.solc_version,
    settings: {
      optimizer: {
        enabled: foundry?.profile?.default?.optimizer || true,
        runs: foundry?.profile?.default?.optimizer_runs || 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  paths: {
    root: "../..",
    artifacts: "packages/contracts/artifacts",
    cache: "packages/contracts/cache",
    sources: "contracts",
    tests: "contracts",
  },
  abiExporter: {
    path: "./abi",
    clear: true,
  },
  gasReporter: {
    enabled: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: "packages/typechain/src",
    target: "ethers-v5",
    alwaysGenerateOverloads: true,
  },
  preprocess: {
    eachLine: hre => {
      return {
        transform: line => {
          if (
            hre.network.name !== "hardhat" &&
            hre.network.name !== "localhost"
          ) {
            removeConsoleLog();
          }
          if (line.match(/^\s*import /i)) {
            getRemappings().forEach(([find, replace]) => {
              if (line.match(find)) {
                line = line.replace(find, replace);
              }
            });
          }
          return line;
        },
      };
    },
  },
  watcher: {
    compile: {
      tasks: ["compile"],
      files: ["./contracts"],
      verbose: true,
    },
  },
};

export default config;
