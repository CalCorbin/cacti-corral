const { Select } = require('enquirer');
const { coolCactiArt, introMessage, availableActions } = require('./constants');

async function gameIntro(cactus) {
  if (cactus.weeksOld > 0) {
    return;
  }
  console.log(coolCactiArt);
  console.log(introMessage);
}

function pourWater(cactus) {
  cactus.amountWatered += 1;
}

async function turnOnSunLamp(cactus) {
  cactus.timeInSun += 1;
}

async function addFertilizer(cactus) {
  cactus.amountFertilized += 1;
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

  if (actionsUsed < 2) {
    startRound(cactus);
  } else {
    console.log('game over');
    process.exit();
  }
}

async function runGame(cactus) {
  await gameIntro(cactus);

  await startRound(cactus);
}

module.exports = {
  runGame, pourWater, turnOnSunLamp, addFertilizer,
};
