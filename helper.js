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

function isNormal({
  amountWatered,
  flowering,
  sentient,
  spiky,
}) {
  return amountWatered >= 1
      && !flowering
      && !sentient
      && !spiky;
}

function isSpiky({ timeInSun, amountWatered }) {
  return timeInSun === 5 && amountWatered === 1;
}

function isDead({ amountWatered, dead }) {
  return amountWatered < 1 || dead;
}

module.exports = {
  logGameMessage, isSentient, isNormal, diceRoll, isSpiky, isDead,
};
