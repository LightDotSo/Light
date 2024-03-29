/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { LightSpaceMetadata } from "@lightdotso/space/LightSpaceMetadata.sol";

interface ILightCredentials {
  function initialize(address _controller, address _operator) external;
}
