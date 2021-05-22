const { expect } = require('chai');
const Cactus = require('../../Cactus');

describe('Test suite for the cactus', () => {
  let cactus;

  before(() => { cactus = new Cactus(); });

  it('Should verify cactus is zero weeks old', () => {
    expect(cactus.weeksOld).to.equal(0);
  });
  it('Should verify cactus height is one inch', () => {
    expect(cactus.height).to.equal(1);
  });
  it('Should verify cactus is not flowering', () => {
    expect(cactus.flowering).to.equal(false);
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
});
