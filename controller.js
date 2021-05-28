const { Select } = require('enquirer');
const text = require('./constants/gameMessages');
const art = require('./constants/gameArt');
const { logGameMessage, isSentient } = require('./helper');

function pourWater(cactus) {
  cactus.setAmountWatered(cactus.amountWatered + 1);
  cactus.setHeight(cactus.height + 0.5);

  logGameMessage('\nThe cactus was watered.');
}

function turnOnSunLamp(cactus) {
  cactus.setTimeInSun(cactus.timeInSun + 1);
  cactus.setHeight(cactus.height + 0.3);

  logGameMessage('\nThe cactus warms up in the sun lamp.');
}

function addFertilizer(cactus) {
  cactus.setAmountFertilized(cactus.amountFertilized + 1);
  cactus.setHeight(cactus.height + 0.7);

  logGameMessage('\nThe cactus accepts the fertilizer.');
}

function createFloweringCactus(cactus) {
  if (cactus.amountWatered >= 5 && cactus.amountFertilized === 1) {
    cactus.setFlowering();

    logGameMessage(`Congratulations, you have a flowering cactus that is 
    ${cactus.height} inches tall!`);

    logGameMessage(art.floweringCactus);
  }
}

function createSentientCactus(cactus) {
  if (isSentient(cactus)) {
    cactus.setSentient();

    logGameMessage(`A combination of nutrients and sun produced something unexpected. It appears that your
    cactus is exhibiting intelligence and enjoys cowboy hats. Congratulations?`);
    logGameMessage(art.sentientCactus);
  }
}

function isSpiky({ timeInSun, amountWatered }) {
  return timeInSun === 5 && amountWatered === 1;
}

function createSpikyCactus(cactus) {
  if (isSpiky(cactus)) {
    cactus.setSpiky();

    logGameMessage(`You sure did give your cactus a lot of sun. It is ${cactus.height} inches tall and 
    look at all those sharp spikes!`);
    logGameMessage(art.spikyCactus);
  }
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

function createNormalCactus(cactus) {
  if (isNormal(cactus)) {
    logGameMessage(`Your cactus is ${cactus.height} inches tall.`);
    logGameMessage(art.normalCactus);
  }
}

function isDead({ amountWatered, dead }) {
  return amountWatered < 1 || dead;
}

function createDeadCactus(cactus) {
  if (isDead(cactus)) {
    cactus.setDead();

    logGameMessage('\nYour cactus died.');
    logGameMessage(art.cactusAngel);
  }
}

function determineBottleEffect(diceRoll, cactus) {
  switch (diceRoll) {
    case 1:
      cactus.setHeight(cactus.height + 10);
      logGameMessage('\nYour cactus grew 10 inches taller in a matter of seconds!');
      break;
    case 2:
      cactus.setOwl();
      logGameMessage(`\nLooks like the mystery bottle did not do anything, but an owl moved
      into your cactus!`);
      logGameMessage(art.owl);
      break;
    case 3:
      cactus.setFruiting();
      logGameMessage('\nYour cactus looks to be bearing fruit!');
      logGameMessage(art.apple);
      break;
    default:
      cactus.setDead();
      logGameMessage("\nYour cactus doesn't look too good..");
      break;
  }
}

async function useMysteriousBottle(cactus) {
  const action = new Select({
    name: 'selectAction',
    message: `A mysterious bottle appears next to your cactus. The label says "CACTI NUTRIENT X: CONSUME AT YOUR OWN RISK".
    Do you want to give some of the nutrients to your cactus? This action cannot be undone.`,
    choices: [
      'Yes',
      'No',
    ],
  });

  await action.run()
    .then(async (answer) => {
      if (answer === 'Yes') {
        const diceRoll = Math.ceil(Math.random() * 6);

        determineBottleEffect(diceRoll, cactus);
      }
    });
}

function calculateCactusResults(cactus) {
  // We use toFixed() to keep the cactus height decimal from getting too long.
  cactus.setHeight(cactus.height.toFixed(1));

  logGameMessage(art.endGameBorder);

  // We check if the cactus is dead because using the mysterious bottle
  // has a high chance of killing the cactus.
  if (!cactus.dead) {
    createFloweringCactus(cactus);

    createSentientCactus(cactus);

    createSpikyCactus(cactus);

    createNormalCactus(cactus);
  } else {
    createDeadCactus(cactus);
  }

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

async function endGame(cactus) {
  await useMysteriousBottle(cactus);
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
    cactus.setWeeksOld(cactus.weeksOld + 1);

    await startRound(cactus);
  } else {
    endGame(cactus);
  }
}

async function runGame(cactus) {
  logGameMessage(art.welcomeCactus);
  logGameMessage(text.introMessage);

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
  determineBottleEffect,
  isSentient,
  isNormal,
  isSpiky,
  isDead,
};
