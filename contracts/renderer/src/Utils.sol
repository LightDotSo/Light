// SPDX-License-Identifier: MIT
// Code from: https://github.com/w1nt3r-eth/hot-chain-svg/blob/main/contracts/Utils.sol
// Slightly modified for specific preferances & purposes.

pragma solidity ^0.8.13;

library Utils {
  string internal constant NULL = "";

  function setCssVar(string memory _key, string memory _val)
    internal
    pure
    returns (string memory)
  {
    return string.concat("--", _key, ":", _val, ";");
  }

  function getCssVar(string memory _key) internal pure returns (string memory) {
    return string.concat("var(--", _key, ")");
  }

  function getDefURL(string memory _id) internal pure returns (string memory) {
    return string.concat("url(#", _id, ")");
  }

  function white_a(uint256 _a) internal pure returns (string memory) {
    return rgba(255, 255, 255, _a);
  }

  function black_a(uint256 _a) internal pure returns (string memory) {
    return rgba(0, 0, 0, _a);
  }

  function rgba(
    uint256 _r,
    uint256 _g,
    uint256 _b,
    uint256 _a
  ) internal pure returns (string memory) {
    string memory formattedA = _a < 100
      ? string.concat("0.", Utils.uint2str(_a))
      : "1";
    return
      string.concat(
        "rgba(",
        Utils.uint2str(_r),
        ",",
        Utils.uint2str(_g),
        ",",
        Utils.uint2str(_b),
        ",",
        formattedA,
        ")"
      );
  }

  function stringsEqual(string memory _a, string memory _b)
    internal
    pure
    returns (bool)
  {
    return keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
  }

  function utfStringLength(string memory _str)
    internal
    pure
    returns (uint256 length)
  {
    uint256 i = 0;
    bytes memory string_rep = bytes(_str);

    while (i < string_rep.length) {
      if (string_rep[i] >> 7 == 0) i += 1;
      else if (string_rep[i] >> 5 == bytes1(uint8(0x6))) i += 2;
      else if (string_rep[i] >> 4 == bytes1(uint8(0xE))) i += 3;
      else if (string_rep[i] >> 3 == bytes1(uint8(0x1E)))
        i += 4;
        //For safety
      else i += 1;

      length++;
    }
  }

  function uint2str(uint256 _i)
    internal
    pure
    returns (string memory _uintAsString)
  {
    if (_i == 0) {
      return "0";
    }
    uint256 j = _i;
    uint256 len;
    while (j != 0) {
      len++;
      j /= 10;
    }
    bytes memory bstr = new bytes(len);
    uint256 k = len;
    while (_i != 0) {
      k = k - 1;
      uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
      bytes1 b1 = bytes1(temp);
      bstr[k] = b1;
      _i /= 10;
    }
    return string(bstr);
  }
}