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
    cactus.updateProps({
      amountWatered: cactus.amountWatered + 3,
    });

    expect(cactus.amountWatered).to.equal(3);
  });

  it('Should set cactus height', () => {
    cactus.updateProps({ height: cactus.height + 3 });

    expect(cactus.height).to.equal(4);
  });

  it('Should set time the cactus spent in sun', () => {
    cactus.updateProps({ timeInSun: cactus.timeInSun + 3 });

    expect(cactus.timeInSun).to.equal(3);
  });

  it('Should set the amount the cactus has been fertilized', () => {
    cactus.updateProps({ amountFertilized: cactus.amountFertilized + 2 });

    expect(cactus.amountFertilized).to.equal(2);
  });

  it('Should set cactus to flowering', () => {
    cactus.updateProps({ flowering: true });

    expect(cactus.flowering).to.equal(true);
  });

  it('Should set cactus to sentient', () => {
    cactus.updateProps({ sentient: true });

    expect(cactus.sentient).to.equal(true);
  });

  it('Should set cactus to spiky', () => {
    cactus.updateProps({ spiky: true });

    expect(cactus.spiky).to.equal(true);
  });

  it('Should set cactus to dead', () => {
    cactus.updateProps({ dead: true });

    expect(cactus.dead).to.equal(true);
  });

  it('Should set cactus to having an owl', () => {
    cactus.updateProps({ owl: true });

    expect(cactus.owl).to.equal(true);
  });

  it('Should set cactus to fruiting', () => {
    cactus.updateProps({ fruiting: true });

    expect(cactus.fruiting).to.equal(true);
  });

  it('Should set cactus age in weeks', () => {
    cactus.updateProps({ weeksOld: cactus.weeksOld + 3 });

    expect(cactus.weeksOld).to.equal(4);
  });
});
