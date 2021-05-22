const coolCactiArt = `
    ,*-.
    |  |
,.  |  |
| |_|  | ,.
\`---.  |_| |
    |  .--\`
    |  |
    |  |
`;

const floweringCactus = `
          vVVVv
          (___)
           *-*,
       ,*\\/|\`| \\
       \\'  | |'| *,
        \\ \`| | |/ )
         | |'| , /
         |'| |, /
       __|_|_|_|__
      [___________]
       |         |
       |         |
       |         |
       |_________|
`;

const introMessage = `
  Welcome to the Cacti Corral!!!
  You will have 7 turns, each turn representing a week, to raise your cactus.
  Your goal is to either get your cactus to 10 inches tall OR to get it to flower.
  There is also the possibility your cactus will dry and up die, so try to avoid that.
  `;

const availableActions = [
  'Give the cacti water',
  'Turn on the sun lamp',
  'Feed it a fertilizer pill',
];

module.exports = {
  coolCactiArt, introMessage, availableActions, floweringCactus,
};
