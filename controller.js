const { Select } = require('enquirer');
const gameText = require('./constants');

function logGameMessage(string) {
  // This keeps log clutter out of mocha tests
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.log(string);
  }
}

async function gameIntro(cactus) {
  if (cactus.weeksOld > 0) {
    return;
  }
  logGameMessage(gameText.coolCactiArt);
  logGameMessage(gameText.introMessage);
}

function pourWater(cactus) {
  cactus.amountWatered += 1;
  cactus.height += 0.5;
  logGameMessage('\nThe cactus was watered.');
}

function turnOnSunLamp(cactus) {
  cactus.timeInSun += 1;
  cactus.height += 0.3;
  logGameMessage('\nThe cactus warms up in the sun.');
}

function addFertilizer(cactus) {
  cactus.amountFertilized += 1;
  cactus.height += 0.7;
  logGameMessage('\nThe cactus accepts the fertilizer.');
}

function calculateCactusResults(cactus) {
  if (cactus.amountWatered >= 8 && cactus.amountFertilized >= 6) {
    cactus.flowering = true;
    logGameMessage(`Congratulations, you have a flowering cactus that is 
    ${cactus.height} inches tall!`);
    logGameMessage(gameText.floweringCactus);
  }

  if (cactus.amountWatered < 3) {
    cactus.dead = true;
    logGameMessage('\nYour cactus died.');
    logGameMessage(gameText.cactusAngel);
  }
}

async function startRound(cactus) {
  const currentRound = cactus.weeksOld + 1;
  logGameMessage(`\n======Starting round ${currentRound}======\n`);

  const actionOne = new Select({
    name: 'selectAction',
    message: '\nWhat would you like to do to the cactus first?',
    choices: gameText.availableActions,
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
    choices: gameText.availableActions,
  });

  await actionTwo.run()
    .then(async (answer) => {
      if (answer.includes('water')) {
        pourWater(cactus);
      } else if (answer.includes('sun')) {
        turnOnSunLamp(cactus);
      } else if (answer.includes('fertilize')) {
        addFertilizer(cactus);
      } else {
        // do nothing.
      }
    });

  // Since we start the game at 0 weeks,
  // ending the game at 6 weeks adds up to 7 rounds.
  if (cactus.weeksOld < 6) {
    cactus.weeksOld += 1;
    await startRound(cactus);
  } else {
    calculateCactusResults(cactus);
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
