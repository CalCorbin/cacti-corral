const introMessage = `
  Welcome to the Cacti Corral!!!
  You will have 3 turns, each turn representing a week, to raise your cactus.
  Each turn, you have 2 actions to spend. Use them wisely.
  Your goal is to raise a happy and healthy cactus, think Tamagotchi from the 90s.
  There is also the possibility your cactus will dry up and die, so try to avoid that.
  `;

const availableActions = [
  'Give the cacti water',
  'Turn on the sun lamp',
  'Feed it a fertilizer pill',
  'Do nothing',
];

module.exports = {
  introMessage, availableActions,
};
