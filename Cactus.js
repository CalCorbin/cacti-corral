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

  updateProps(updateData) {
    // Here we want to update the cactus property with the data received
    // from the user input.
    Object.keys(updateData).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        this[key] = updateData[key];
      }
    });
  }

  setWeeksOld(weeksOld) {
    this.weeksOld = weeksOld;
  }

  setAmountWatered(amountWatered) {
    this.amountWatered = amountWatered;
  }

  setHeight(height) {
    this.height = height;
  }

  setTimeInSun(timeInSun) {
    this.timeInSun = timeInSun;
  }

  setAmountFertilized(amountFertilized) {
    this.amountFertilized = amountFertilized;
  }

  setFlowering() {
    this.flowering = true;
  }

  setSentient() {
    this.sentient = true;
  }

  setSpiky() {
    this.spiky = true;
  }

  setDead() {
    this.dead = true;
  }

  setOwl() {
    this.owl = true;
  }

  setFruiting() {
    this.fruiting = true;
  }
}

module.exports = Cactus;
