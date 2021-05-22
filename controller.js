const { Select } = require('enquirer');
const text = require('./constants/gameMessages');
const art = require('./constants/gameArt');

function logGameMessage(string) {
  // This function keeps console.log clutter out of mocha tests
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.log(string);
  }
}

async function gameIntro(cactus) {
  if (cactus.weeksOld > 1) {
    return;
  }
  logGameMessage(art.welcomeCactus);
  logGameMessage(text.introMessage);
}

function pourWater(cactus) {
  cactus.amountWatered += 1;
  cactus.height += 0.5;
  logGameMessage('\nThe cactus was watered.');
}

function turnOnSunLamp(cactus) {
  cactus.timeInSun += 1;
  cactus.height += 0.3;
  logGameMessage('\nThe cactus warms up in the sun lamp.');
}

function addFertilizer(cactus) {
  cactus.amountFertilized += 1;
  cactus.height += 0.7;
  logGameMessage('\nThe cactus accepts the fertilizer.');
}

function createFloweringCactus(cactus) {
  if (cactus.amountWatered >= 5 && cactus.amountFertilized === 1) {
    cactus.flowering = true;

    logGameMessage(`Congratulations, you have a flowering cactus that is 
    ${cactus.height} inches tall!`);

    logGameMessage(art.floweringCactus);
  }
}

function createSentientCactus(cactus) {
  if (cactus.amountFertilized >= 4 && cactus.timeInSun === 1 && cactus.amountWatered === 1) {
    cactus.sentient = true;

    logGameMessage(`A combination of nutrients and sun produced something unexpected. It appears that your
    cactus is exhibiting intelligence and enjoys cowboy hats. Congratulations?`);
    logGameMessage(art.sentientCactus);
  }
}

function createSpikyCactus(cactus) {
  if (cactus.timeInSun === 5 && cactus.amountWatered === 1) {
    cactus.spiky = true;

    logGameMessage(`You sure did give your cactus a lot of sun. It is ${cactus.height} inches tall and 
    look at all those sharp spikes!`);
    logGameMessage(art.spikyCactus);
  }
}

function createNormalCactus(cactus) {
  if (cactus.amountWatered > 1
  && !cactus.flowering
  && !cactus.sentient
  && !cactus.spiky) {
    logGameMessage(`Your cactus is ${cactus.height} inches tall.`);
    logGameMessage(art.normalCactus);
  }
}

function createDeadCactus(cactus) {
  if (cactus.amountWatered < 1) {
    cactus.dead = true;

    logGameMessage('\nYour cactus died.');
    logGameMessage(art.cactusAngel);
  }
}

function calculateCactusResults(cactus) {
  // Here we use Math.round to ensure there is only one decimal for cactus height
  cactus.height = Math.round(cactus.height * 10) / 10;

  logGameMessage(art.endGameBorder);

  createFloweringCactus(cactus);

  createSentientCactus(cactus);

  createSpikyCactus(cactus);

  createNormalCactus(cactus);

  createDeadCactus(cactus);

  logGameMessage('\nHere are your final cactus stats:');
  logGameMessage(cactus);
}

async function spendRoundActions(cactus) {
  const actionOne = new Select({
    name: 'selectAction',
    message: '\nWhat would you like to do to the cactus first?',
    choices: text.availableActions,
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
    choices: text.availableActions,
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
}

function endGame(cactus) {
  calculateCactusResults(cactus);
  logGameMessage('\nThanks for playing! Yall come back to the Cacti Corral now, ya hear!\n');
  process.exit();
}

async function startRound(cactus) {
  logGameMessage(`\n======Starting week ${cactus.weeksOld}======\n`);

  await spendRoundActions(cactus);

  logGameMessage('\n!!!You have used up all your actions!!!');
  logGameMessage('The sun sets on the cacti corral for this week.');
  logGameMessage(art.sunset);
  logGameMessage(art.endRoundBorder);

  if (cactus.weeksOld < 3) {
    cactus.weeksOld += 1;
    await startRound(cactus);
  } else {
    endGame(cactus);
  }
}

async function runGame(cactus) {
  await gameIntro(cactus);

  await startRound(cactus);
}

module.exports = {
  runGame,
  pourWater,
  turnOnSunLamp,
  addFertilizer,
  createFloweringCactus,
  createNormalCactus,
  createSentientCactus,
  createSpikyCactus,
  createDeadCactus,
};
