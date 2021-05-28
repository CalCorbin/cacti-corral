class Cactus {
  constructor() {
    this.weeksOld = 1;
    this.height = 1;
    this.flowering = false;
    this.amountWatered = 0;
    this.timeInSun = 0;
    this.amountFertilized = 0;
    this.dead = false;
    this.sentient = false;
    this.spiky = false;
    this.owl = false;
    this.fruiting = false;
  }

  setAmountWatered(amount) {
    this.amountWatered = amount;
  }

  setHeight(height) {
    this.height = height;
  }

  setTimeInSun(timeInSun) {
    this.timeInSun = timeInSun;
  }
}

module.exports = Cactus;
