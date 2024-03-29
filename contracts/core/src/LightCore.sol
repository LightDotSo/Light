/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { ILightCore } from "@lightdotso/core/ILightCore.sol";
import { ILightOperatorStore } from "@lightdotso/operator/ILightOperatorStore.sol";
import { LightSpaceMetadata } from "@lightdotso/space/LightSpaceMetadata.sol";
import { LightOperatable } from "@lightdotso/abstract/LightOperatable.sol";
import { LightCoreStorageV1 } from "@lightdotso/core/LightCoreStorage.sol";
import { LightUpgradeable } from "@lightdotso/upgradeable/LightUpgradeable.sol";

/// @title Core contract for the Light protocol.
/// @title Keeps track of the current state of the protocol.
/// @title Inherits the `LightCoreStorage` storage contract to store the state variables in respected slots.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the Light protocol.
/// @notice Implemented based of JBController at https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBController.sol (MIT License)
contract LightCore is
  LightUpgradeable,
  LightOperatable,
  LightCoreStorageV1,
  ILightCore
{
  ///////////////////
  /// UPGRADEABLE ///
  ///////////////////

  function initialize(address _controller, address _operator)
    external
    reinitializer(2)
  {
    __Ownable_init();
    __UUPSUpgradeable_init();

    _setController(_controller);
    _setOperator(_operator);
  }

  /////////////////////////////
  /// EXTERNAL TRANSACTIONS ///
  /////////////////////////////

  /**
    @notice Creates a space. This will mint an ERC-721 into the specified owner's account.
    @dev Each operation within this transaction can be done in sequence separately.
    @dev Anyone can deploy a space on an owner's behalf.
    @param _owner The address to set as the owner of the space. The space ERC-721 will be owned by this address.
    @param _spaceMetadata Metadata to associate with the space within a particular domain. This can be updated any time by the owner of the space.
    @param _memo A memo to pass along to the emitted event.
    @return spaceId The ID of the space.
  */
  function launchSpaceFor(
    address _owner,
    LightSpaceMetadata calldata _spaceMetadata,
    string calldata _memo
  ) external virtual override returns (uint256 spaceId) {
    // Mint the space into the wallet of the owner.
    spaceId = lightSpace().createFor(_owner, _spaceMetadata);

    emit LaunchSpace(spaceId, _memo, msg.sender);
  }
}
