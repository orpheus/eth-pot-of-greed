const PotOfGreed = artifacts.require("./PotOfGreed.sol");

contract("PotOfGreed", accounts => {
  it("should update the pot", async () => {
    const pog = await PotOfGreed.deployed();

    await pog.updatePot(3, { from: accounts[0] });

    const pot = await pog.pot.call();

    assert.equal(pot, 3, "The pot was updated");
  });
});
