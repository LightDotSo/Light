/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { ILightOrbFactory } from "@lightdotso/orb/ILightOrbFactory.sol";
import { LightOperatable } from "@lightdotso/abstract/LightOperatable.sol";
import { LightOrb } from "@lightdotso/orb/LightOrb.sol";
import { LightOrbFactoryStorageV1, UpgradeableBeacon } from "@lightdotso/orb/LightOrbFactoryStorage.sol";
import { BeaconProxy } from "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import { LightUpgradeable } from "@lightdotso/upgradeable/LightUpgradeable.sol";

/// @title Factory contract for generating Light Orbs.
/// @title Inherits the `LightOrbFactoryStorage` storage contract to store the state variables in respected slots.
/// @author Shun Kakinoki
contract LightOrbFactory is
  LightUpgradeable,
  LightOrbFactoryStorageV1,
  LightOperatable,
  ILightOrbFactory
{
  ///////////////////
  /// UPGRADEABLE ///
  ///////////////////

  function initialize(
    address _implementationAddress,
    address _controller,
    address _operator
  ) external override reinitializer(2) {
    __Ownable_init();
    __UUPSUpgradeable_init();
    upgradeableBeacon = new UpgradeableBeacon(_implementationAddress);

    _setController(_controller);
    _setOperator(_operator);
  }

  function implementation() external view returns (address) {
    return upgradeableBeacon.implementation();
  }

  function _createLightOrb(string calldata _name, string calldata _symbol)
    external
    returns (address)
  {
    BeaconProxy orb = new BeaconProxy(
      address(upgradeableBeacon),
      abi.encodeWithSelector(LightOrb.initialize.selector, _name, _symbol)
    );
    return address(orb);
  }

  function _upgradeBeaconProxy(address new_implementationAddress)
    external
    onlyOwner
  {
    upgradeableBeacon.upgradeTo(new_implementationAddress);
  }
}
