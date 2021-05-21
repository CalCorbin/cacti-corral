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
  it('Should verify cactus is flowering', () => {
    expect(cactus.flowering).to.equal(false);
  });
  it('Should verify cactus has had zero weeks of sunlight', () => {
    expect(cactus.weeksWith.sunlight).to.equal(0);
  });
  it('Should verify cactus has had zero weeks of watering', () => {
    expect(cactus.weeksWith.water).to.equal(0);
  });
  it('Should verify cactus has had zero weeks of fertilizer', () => {
    expect(cactus.weeksWith.fertilizer).to.equal(0);
  });
});
