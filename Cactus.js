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
        const property = { [key]: updateData[key] };
        Object.assign(this, property);
      }
    });
  }
}

module.exports = Cactus;
