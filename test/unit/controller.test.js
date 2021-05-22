const { expect } = require('chai');
const Cactus = require('../../Cactus');
const { pourWater, turnOnSunLamp, addFertilizer } = require('../../controller');

describe('Test suite for controller functions', () => {
  let cactus;

  before(() => { cactus = new Cactus(); });

  it('Should verify cactus can be watered', async () => {
    expect(cactus.amountWatered).to.equal(0);

    await pourWater(cactus);

    expect(cactus.amountWatered).to.equal(1);
  });

  it('Should verify cactus can spend time in the sun', async () => {
    expect(cactus.timeInSun).to.equal(0);

    await turnOnSunLamp(cactus);

    expect(cactus.timeInSun).to.equal(1);
  });

  it('Should verify cactus has been fertilized', async () => {
    expect(cactus.amountFertilized).to.equal(0);

    await addFertilizer(cactus);

    expect(cactus.amountFertilized).to.equal(1);
  });
});
