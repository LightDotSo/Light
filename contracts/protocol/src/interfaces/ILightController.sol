// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

interface ILightController {
  function initialize() external;

  function setContractProxy(bytes32 _id, address _contractAddress) external;

  function unsetContractProxy(bytes32 _id) external;

  function getContractProxy(bytes32 _id) external view returns (address);

  event SetContractProxy(bytes32 indexed id, address contractAddress);
}
