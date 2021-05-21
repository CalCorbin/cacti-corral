const { expect } = require('chai');
const Cactus = require('../../Cactus');

describe('Test suite for the cactus', () => {
  it('Should verify cactus is zero weeks old', () => {
    const cactus = new Cactus();

    expect(cactus.weeksOld).to.equal(0);
  });
});
