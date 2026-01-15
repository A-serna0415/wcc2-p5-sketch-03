class DNA {
  constructor() {
    // DNA is a random floating point values between 0 and 1
    // The genetic sequence equation
    // 24 genes
    this.genes = [];
    for (let i = 0; i < 24; i++) {
      this.genes[i] = random(0, 1);
    }
  }

  crossover(partner) {
    let child = new DNA();
    // Picking a random “midpoint” in the genes array
    let midpoint = floor(random(this.genes.length));

    // Before the midpoint genes from this DNA and after the midpoint from the partner DNA
    for (let i = 0; i < this.genes.length; i++) {
      child.genes[i] = (i < midpoint) ? this.genes[i] : partner.genes[i];
    }

    return child;
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      //Check a random number against mutation rate
      if (random(1) < mutationRate) {
        this.genes[i] = random(1);
      }
    }
  }
}
