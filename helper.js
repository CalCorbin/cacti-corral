function logGameMessage(message) {
  // This function keeps console.log clutter out of mocha tests
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.log(message);
  }
}

function diceRoll(numberOfSides) {
  return Math.ceil(Math.random() * numberOfSides);
}

function isSentient({ amountFertilized, timeInSun, amountWatered }) {
  return amountFertilized >= 4 && timeInSun === 1 && amountWatered === 1;
}

module.exports = { logGameMessage, isSentient, diceRoll };
