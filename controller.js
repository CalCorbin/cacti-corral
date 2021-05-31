const { Select } = require('enquirer');
const text = require('./constants/gameMessages');
const art = require('./constants/gameArt');
const {
  logGameMessage, isSentient, diceRoll, isNormal, isSpiky, isDead,
} = require('./helper');

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

function createSpikyCactus(cactus) {
  if (isSpiky(cactus)) {
    cactus.setSpiky();

    logGameMessage(`You sure did give your cactus a lot of sun. It is ${cactus.height} inches tall and 
    look at all those sharp spikes!`);
    logGameMessage(art.spikyCactus);
  }
}

function createNormalCactus(cactus) {
  if (isNormal(cactus)) {
    logGameMessage(`Your cactus is ${cactus.height} inches tall.`);
    logGameMessage(art.normalCactus);
  }
}

function createDeadCactus(cactus) {
  if (isDead(cactus)) {
    cactus.setDead();

    logGameMessage('\nYour cactus died.');
    logGameMessage(art.cactusAngel);
  }
}

function determineBottleEffect(diceRollResult, cactus) {
  switch (diceRollResult) {
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
        determineBottleEffect(diceRoll(6), cactus);
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
  calculateCactusResults(cactus);
  logGameMessage('\nThanks for playing! Yall come back to the Cacti Corral now, ya hear!\n');
  process.exit();
}

async function determineHurricaneResult(hurricaneEffect, cactus) {
  const findCactus = new Select({
    name: 'selectAction',
    message: '\nOh no your cactus blew away! Do you want to try to find it?',
    choices: ['Yes', 'No'],
  });

  switch (hurricaneEffect) {
    case 1:
      logGameMessage('It looks like the hurricane knocked off the top of your cactus');
      if (cactus.height === 1) {
        cactus.setDead();
        logGameMessage('When the hurricane took off the top of your cactus, that was all there was. It is dead.');
        endGame(cactus);
      } else {
        cactus.setHeight(cactus.height - 1);
      }
      break;
    case 2:
      await findCactus.run().then((answer) => {
        if (answer === 'Yes') {
          const fiftyFifty = diceRoll(2);

          if (fiftyFifty === 1) {
            cactus.setDead();
            logGameMessage('\nYou have no idea where your poor cactus is. :(');
            endGame(cactus);
          } else {
            logGameMessage('\nYEEHAW! You found your cactus and it somehow is perfectly fine!');
          }
        }
      });
      break;
    default:
      logGameMessage('\nHOORAY! Your cactus weathered the storm.');
      break;
  }
}

async function getHurricane(diceRollResult, cactus) {
  // There is a 1 in 3 chance of generating a hurricane each turn.
  switch (diceRollResult) {
    case 1:
      logGameMessage('A hurricane has struck your cactus!');
      await determineHurricaneResult(diceRoll(3), cactus);
      break;
    default:
      // Nothing happens
      break;
  }
}

async function startRound(cactus) {
  logGameMessage(`\n======Starting week ${cactus.weeksOld}======\n`);

  await getHurricane(diceRoll(3), cactus);

  await spendRoundActions(cactus);

  logGameMessage('\n!!!You have used up all your actions!!!');
  logGameMessage('The sun sets on the cacti corral for this week.');
  logGameMessage(art.sunset);
  logGameMessage(art.endRoundBorder);

  if (cactus.weeksOld < 3) {
    cactus.setWeeksOld(cactus.weeksOld + 1);

    await startRound(cactus);
  } else {
    await useMysteriousBottle(cactus);
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
  getHurricane,
};
