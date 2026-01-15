/* 
Sketch04: Creatures_Generator
Andrés Serna
1 December 2025

Instructions:
- Hover the cursor over the creature to increase its fitness value, which means, 
  its chances to survive the next generation.
- Press "Evolve Next Generation" button to evolve the creatures.
- Refresh the sketch to go back to the generation 0.

Acknowledgements:
Base on the code examples found in The Nature of Code by Daniel Shiffman, 
chapter 9 about Genetic Algorithms: https://natureofcode.com/genetic-algorithms/#coding-the-genetic-algorithm 
and Interactive Selection: https://natureofcode.com/genetic-algorithms/#interactive-selection
*/

// Store the population, in this case, creatures
let population;

function setup() {
  createCanvas(650, 250);

  // Start with a small population
  let populationSize = 6;

  // A pretty high mutation rate here, our population is rather small we need to enforce variety
  let mutationRate = 0.08;

  // Create the population of creatures
  population = new Population(mutationRate, populationSize);

  // A p5.js button with a CSS class
  button = createButton("Evolve New Generation");
  button.class('myButton');
  button.mousePressed(nextGeneration);
  button.position(width/3, 10);
}

function draw() {
  background(225);
  // Draw the creatures
  population.show();
  // Check for increasing fitness
  population.rollover(mouseX, mouseY);
  textAlign(CENTER);
  text("Generation " + population.generations + " / " + "Refresh to restart!", width/2, height - 10);
}

// If the button is pressed, evolve to next generation
function nextGeneration() {
  population.selection();
  population.reproduction();
}