pragma solidity ^0.5.0;

contract Utility {
  address owner;

  event errorEvent(string err);

  modifier onlyOwner {
    if (msg.sender != owner) {
      emit errorEvent("Access denied. Do no have owner permissions.");
    } else {
      _;
    }
  }
}

contract PotOfGreed is Utility {
  constructor () public {
    // creator of contract
    owner = msg.sender;
  }

  uint public pot = 0;

  function updatePot(uint value) public {
    pot = pot + value;
  }
}
