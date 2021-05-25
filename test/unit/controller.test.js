process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const Cactus = require('../../Cactus');
const controller = require('../../controller');

describe('Test suite for controller functions', () => {
  let cactus;

  beforeEach(() => { cactus = new Cactus(); });

  it('Should verify cactus can be watered', async () => {
    expect(cactus.amountWatered).to.equal(0);

    await controller.pourWater(cactus);

    expect(cactus.amountWatered).to.equal(1);
  });

  it('Should verify cactus height increased after being watered', async () => {
    await controller.pourWater(cactus);

    expect(cactus.height).to.equal(1.5);
  });

  it('Should verify cactus can spend time in the sun', async () => {
    expect(cactus.timeInSun).to.equal(0);

    await controller.turnOnSunLamp(cactus);

    expect(cactus.timeInSun).to.equal(1);
  });

  it('Should verify cactus height increased after time in the sun lamp', async () => {
    await controller.turnOnSunLamp(cactus);

    expect(cactus.height).to.equal(1.3);
  });

  it('Should verify cactus has been fertilized', async () => {
    expect(cactus.amountFertilized).to.equal(0);

    await controller.addFertilizer(cactus);

    expect(cactus.amountFertilized).to.equal(1);
  });

  it('Should verify cactus height increased after adding fertilizer', async () => {
    await controller.addFertilizer(cactus);

    expect(cactus.height).to.equal(1.7);
  });

  it('Should have a flowering cactus', async () => {
    cactus.amountWatered = 5;
    cactus.amountFertilized = 1;

    await controller.createFloweringCactus(cactus);

    expect(cactus.flowering).to.equal(true);
  });

  it('Should create a cactus exhibiting intelligence', async () => {
    cactus.amountFertilized = 4;
    cactus.amountWatered = 1;
    cactus.timeInSun = 1;

    await controller.createSentientCactus(cactus);

    expect(cactus.sentient).to.equal(true);
  });

  it('Should create a spiky cactus', async () => {
    cactus.amountWatered = 1;
    cactus.timeInSun = 5;

    await controller.createSpikyCactus(cactus);

    expect(cactus.spiky).to.equal(true);
  });

  it('Should create a normal cactus that did not die', async () => {
    cactus.amountFertilized = 1;
    cactus.amountWatered = 2;
    cactus.timeInSun = 3;

    await controller.createNormalCactus(cactus);

    expect(cactus.dead).to.equal(false);
  });

  it('Should have a cactus that died', async () => {
    await controller.createDeadCactus(cactus);

    expect(cactus.dead).to.equal(true);
  });

  it('Should use determineBottleEffect to grow cactus ten inches and not kill it', async () => {
    await controller.determineBottleEffect(1, cactus);

    // Cactus default height is 1, so adding 10 inches equals 11.
    expect(cactus.height).to.equal(11);
    expect(cactus.dead).to.equal(false);
  });

  it('Should use determineBottleEffect to have an owl make a nest in the cactus', async () => {
    await controller.determineBottleEffect(2, cactus);

    expect(cactus.owl).to.equal(true);
  });

  it('Should use determineBottleEffect to make the cactus start fruiting', async () => {
    await controller.determineBottleEffect(3, cactus);

    expect(cactus.fruiting).to.equal(true);
  });

  it('Should use determineBottleEffect to kill the cactus', async () => {
    await controller.determineBottleEffect(6, cactus);

    expect(cactus.dead).to.equal(true);
  });
});
