const { Select } = require('enquirer');
const { coolCactiArt, introMessage, availableActions } = require('./constants');

async function gameIntro(cactus) {
  if (cactus.weeksOld > 0) {
    return;
  }
  console.log(coolCactiArt);
  console.log(introMessage);
}

async function pourWater(cactus) {
  console.log('watering cactus');
}

async function turnOnSunLamp(cactus) {
  console.log('turning on the sun lamp');
}

async function addFertilizer(cactus) {
  console.log('fertilizing the cactus');
}

async function startRound(cactus) {
  if (cactus.weeksOld > 7) {
    // We want to end the game if cactus is older than 7 weeks.
    return;
  }

  const actions = {
    water: availableActions[0],
    sunlight: availableActions[1],
    fertilize: availableActions[2],
  };

  let actionsUsed = 0;

  const userPrompt = actions === 0 ? '\nWhat would you like to do to the cactus first?'
    : 'How would you like to use your last action this week?';

  const question = {
    name: 'selectAction',
    message: userPrompt,
    choices: availableActions,
  };

  const round = new Select(question);

  await round.run()
    .then(async (answer) => {
      actionsUsed += 1;

      if (answer === actions.water) {
        pourWater(cactus);
      }

      if (answer === actions.sunlight) {
        turnOnSunLamp(cactus);
      }

      if (answer === actions.fertilize) {
        addFertilizer(cactus);
      }
    });
}

async function runGame(cactus) {
  await gameIntro(cactus);

  await startRound(cactus);
}

module.exports = { runGame };
