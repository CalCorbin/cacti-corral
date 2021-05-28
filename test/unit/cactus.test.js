process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const Cactus = require('../../Cactus');

describe('Test suite for the cactus', () => {
  let cactus;

  before(() => { cactus = new Cactus(); });

  it('Should verify cactus is a week old', () => {
    expect(cactus.weeksOld).to.equal(1);
  });

  it('Should verify cactus height is one inch', () => {
    expect(cactus.height).to.equal(1);
  });

  it('Should verify cactus is not flowering', () => {
    expect(cactus.flowering).to.equal(false);
  });

  it('Should verify cactus is not dead', () => {
    expect(cactus.dead).to.equal(false);
  });

  it('Should verify cactus is not spiky', () => {
    expect(cactus.spiky).to.equal(false);
  });

  it('Should verify cactus is not sentient', () => {
    expect(cactus.sentient).to.equal(false);
  });

  it('Should verify cactus has had zero sunlight', () => {
    expect(cactus.timeInSun).to.equal(0);
  });

  it('Should verify cactus has had no water', () => {
    expect(cactus.amountWatered).to.equal(0);
  });

  it('Should verify cactus has not had any fertilizer', () => {
    expect(cactus.amountFertilized).to.equal(0);
  });

  it('Should set amount cactus is watered', () => {
    cactus.setAmountWatered(3);

    expect(cactus.amountWatered).to.equal(3);
  });

  it('Should set cactus height', () => {
    cactus.setHeight(3);

    expect(cactus.height).to.equal(3);
  });

  it('Should set time the cactus spent in sun', () => {
    cactus.setTimeInSun(3);

    expect(cactus.timeInSun).to.equal(3);
  });

  it('Should set the amount the cactus has been fertilized', () => {
    cactus.setAmountFertilized(2);

    expect(cactus.amountFertilized).to.equal(2);
  });
});
