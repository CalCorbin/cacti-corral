const { Select } = require('enquirer');
const { coolCactiArt, introMessage, availableActions } = require('./constants');

function logGameMessage(string) {
  // This keeps log clutter out of mocha tests
  if (process.env.NODE_ENV !== 'test') {
    console.log(string);
  }
}

async function gameIntro(cactus) {
  if (cactus.weeksOld > 0) {
    return;
  }
  logGameMessage(coolCactiArt);
  logGameMessage(introMessage);
}

function pourWater(cactus) {
  cactus.amountWatered += 1;
  logGameMessage('\nThe cactus was watered.');
}

function turnOnSunLamp(cactus) {
  cactus.timeInSun += 1;
  logGameMessage('\nThe cactus warms up in the sun.');
}

function addFertilizer(cactus) {
  cactus.amountFertilized += 1;
  logGameMessage('\nThe cactus accepts the fertilizer.');
}

async function startRound(cactus) {
  logGameMessage(`\nStarting round ${cactus.weeksOld + 1}`);

  const actionOne = new Select({
    name: 'selectAction',
    message: '\nWhat would you like to do to the cactus first?',
    choices: availableActions,
  });

  await actionOne.run()
    .then(async (answer) => {
      if (answer.includes('water')) {
        pourWater(cactus);
      } else if (answer.includes('sun')) {
        turnOnSunLamp(cactus);
      } else if (answer.includes('fertilize')) {
        addFertilizer(cactus);
      }
    });

  const actionTwo = new Select({
    name: 'selectAction',
    message: '\nHow would you like to use your next action?',
    choices: availableActions,
  });

  await actionTwo.run()
    .then(async (answer) => {
      if (answer.includes('water')) {
        pourWater(cactus);
      } else if (answer.includes('sun')) {
        turnOnSunLamp(cactus);
      } else if (answer.includes('fertilize')) {
        addFertilizer(cactus);
      }
    });

  // Since we start the game at 0 weeks,
  // ending the game at 6 weeks adds up to 7 rounds.
  if (cactus.weeksOld < 6) {
    cactus.weeksOld += 1;
    await startRound(cactus);
  } else {
    logGameMessage('game over');
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
