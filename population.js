// Create the population
class Population {
    constructor(mutationRate, size) {
        this.mutationRate = mutationRate; // Mutation rate
        this.creatures = []; // Array to hold the current population
        this.matingPool = [];
        this.generations = 0; // Number of generations
        for (let i = 0; i < size; i++) {
            this.creatures[i] = new Creature(new DNA(), 40 + i * 110, 120);
        }
    }

    // Display all creatures
    show() {
        for (let i = 0; i < this.creatures.length; i++) {
            this.creatures[i].show();
        }
    }

    // Are we rolling over any of the creatures?
    rollover(mx, my) {
        for (let i = 0; i < this.creatures.length; i++) {
            this.creatures[i].rollover(mx, my);
        }
    }

    weightedSelection() {
        // Start with the first element
        let index = 0;
        // Pick a starting point
        let start = random(1);
        // At the finish line?
        while (start > 0) {
            // Move a distance according to fitness
            start = start - this.creatures[index].fitness;
            // Next element
            index++;
        }
        // Undo moving to the next element since the finish has been reached
        index--;
        return this.creatures[index];
    }

    selection() {
        // Sum all of the fitness values
        let totalFitness = 0;
        for (let i = 0; i < this.creatures.length; i++) {
            totalFitness += this.creatures[i].fitness;
        }
        // Divide by the total to normalize the fitness values
        for (let i = 0; i < this.creatures.length; i++) {
            this.creatures[i].fitness /= totalFitness;
        }
    }

    // Making the next generation
    reproduction() {
        let nextCreatures = [];
        // Create the next population with children from the mating pool
        for (let i = 0; i < this.creatures.length; i++) {
            // Sping the wheel of fortune to pick two parents
            let parentA = this.weightedSelection();
            let parentB = this.weightedSelection();
            let child = parentA.dna.crossover(parentB.dna);
            // Mutate their genes
            child.mutate(this.mutationRate);
            nextCreatures[i] = new Creature(child, 40 + i * 110, 120);
        }
        // Replace the old population
        this.creatures = nextCreatures;
        this.generations++;
    }
}
