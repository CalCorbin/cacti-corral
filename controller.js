const { prompt, Select } = require('enquirer');
const { coolCactiArt, introMessage } = require('./constants');

async function gameIntro(cactus) {
  if (cactus.weeksOld > 0) {
    return;
  }
  console.log(coolCactiArt);
  console.log(introMessage);
}

async function startRound(cactus) {
  if (cactus.weeksOld > 7) {
    // We want to end the game if cactus is older than 7 weeks.
    return;
  }

  console.log(cactus);
}

async function runGame(cactus) {
  await gameIntro(cactus);

  await startRound(cactus);
}

module.exports = { runGame };
