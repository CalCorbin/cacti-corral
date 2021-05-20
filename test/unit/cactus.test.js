const { expect } = require('chai');

describe('Test suite for the cactus', () => {
  it('Should confirm that the cactus has properties', () => {
    const placeholder = {
      text: 'lorem ipsum',
    };

    expect(placeholder.text).to.equal('lorem ipsum');
  });
});
