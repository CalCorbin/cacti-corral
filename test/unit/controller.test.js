process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const Cactus = require('../../Cactus');
const {
  pourWater,
  turnOnSunLamp,
  addFertilizer,
  createFloweringCactus,
  createDeadCactus,
  createSentientCactus,
  createNormalCactus,
} = require('../../controller');

describe('Test suite for controller functions', () => {
  let cactus;

  beforeEach(() => { cactus = new Cactus(); });

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

  it('Should have a flowering cactus', async () => {
    cactus.amountWatered = 5;
    cactus.amountFertilized = 1;

    await createFloweringCactus(cactus);

    expect(cactus.flowering).to.equal(true);
  });

  it('Should create a cactus exhibiting intelligence', async () => {
    cactus.amountFertilized = 4;
    cactus.amountWatered = 1;
    cactus.timeInSun = 1;

    await createSentientCactus(cactus);

    expect(cactus.sentient).to.equal(true);
  });

  it('Should create a normal cactus that did not die', async () => {
    cactus.amountFertilized = 1;
    cactus.amountWatered = 2;
    cactus.timeInSun = 3;

    await createNormalCactus(cactus);

    expect(cactus.dead).to.equal(false);
  });

  it('Should have a cactus that died', async () => {
    await createDeadCactus(cactus);

    expect(cactus.dead).to.equal(true);
  });
});
