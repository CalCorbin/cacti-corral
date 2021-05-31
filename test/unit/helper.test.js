process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const { diceRoll, isSentient } = require('../../helper');

describe('Test suite for controller functions', () => {
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
});
