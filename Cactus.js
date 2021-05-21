class Cactus {
  constructor() {
    this.weeksOld = 0;
    this.height = 1;
    this.flowering = false;
    this.weeksWith = {
      sunlight: 0,
      water: 0,
      fertilizer: 0,
    };
  }
}

module.exports = Cactus;
