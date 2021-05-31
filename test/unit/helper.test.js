const { expect } = require('chai');
const {
  diceRoll, isSentient, isNormal, isSpiky, isDead,
} = require('../../helper');

describe('Test suite for helper functions', () => {
  let testCactus;

  beforeEach(() => { testCactus = {}; });

  it('Should verify dice roll returns a number', async () => {
    expect(diceRoll(6)).to.be.a('number');
  });

  it('Should verify cactus is sentient', async () => {
    testCactus.amountFertilized = 4;
    testCactus.timeInSun = 1;
    testCactus.amountWatered = 1;

    const sentient = await isSentient(testCactus);

    expect(sentient).to.equal(true);
  });

  it('Should verify cactus is not sentient', async () => {
    const sentient = await isSentient(testCactus);

    expect(sentient).to.equal(false);
  });

  it('Should verify cactus is normal', async () => {
    testCactus.amountWatered = 2;

    const normal = await isNormal(testCactus);

    expect(normal).to.equal(true);
  });

  it('Should verify cactus is not normal', async () => {
    const normal = await isNormal(testCactus);

    expect(normal).to.equal(false);
  });

  it('Should verify cactus is spiky', async () => {
    testCactus.timeInSun = 5;
    testCactus.amountWatered = 1;

    const spiky = await isSpiky(testCactus);

    expect(spiky).to.equal(true);
  });

  it('Should verify cactus is not spiky', async () => {
    const spiky = await isSpiky(testCactus);

    expect(spiky).to.equal(false);
  });

  it('Should verify cactus is dead', async () => {
    testCactus.amountWatered = 0;

    const dead = await isDead(testCactus);

    expect(dead).to.equal(true);
  });

  it('Should verify cactus is not dead', async () => {
    testCactus.amountWatered = 2;
    testCactus.dead = false;

    const dead = await isDead(testCactus);

    expect(dead).to.equal(false);
  });
});
