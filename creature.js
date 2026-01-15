class Creature {
    constructor(dna, x, y) {
        this.dna = dna;
        this.x = x;
        this.y = y;

        // Bounding box size
        this.w = 70;
        this.h = 150;
        // Boolean value when fitness increase with user interaction
        this.rolloverOn = false;
        this.fitness = 1;
        // Container for creatures
        this.boundingBox = new Rectangle(
            this.x - this.w / 2,
            this.y - this.h / 2,
            this.w,
            this.h
        );
    }

    show() {
        let g = this.dna.genes;

        // BODY
        let bodyColor = color(g[0] * 255, g[1] * 255, g[2] * 255); // Multiply the gen value (0 - 1) for 255 
                                                                   // to get the full RGB color range.
        let bodyW = map(g[3], 0, 1, 40, 100); // Translates the gen value to the parametres for the creature's traits
        let bodyH = map(g[4], 0, 1, 50, 130);

        // HEAD
        let headColor = color(g[5] * 255, g[6] * 255, g[7] * 255);
        let headSize = map(g[8], 0, 1, 20, 60);

        // EYES
        let eyeColor = color(g[9] * 255, g[10] * 255, g[11] * 255);
        let eyeSize = map(g[12], 0, 1, 4, 16);
        let eyeSpacing = map(g[13], 0, 1, 5, 35);

        // LEGS
        let legLength = map(g[14], 0, 1, 10, 50);
        let legThickness = map(g[15], 0, 1, 2, 4);
        let numLegs = floor(map(g[16], 0, 1, 2, 10));

        // WINGS
        let wingColor = color(g[17] * 255, g[18] * 255, g[19] * 255, 0.6);
        let wingSize = map(g[20], 0, 1, 20, 80);

        // TAIL
        let tailLength = map(g[21], 0, 1, 20, 40);
        let tailThickness = map(g[22], 0, 1, 3, 10);

        push();
        translate(this.x, this.y);

        // Hover bounding box
        if (this.rolloverOn) fill(0, 50);
        else noFill();
        stroke(0);
        rectMode(CENTER);
        strokeWeight(0.5);
        rect(0, 0, this.w, this.h);

        // DRAWING THE CREATURE

        // Tail
        stroke(80);
        strokeWeight(tailThickness);
        line(0, bodyH * 0.35, 0, bodyH * 0.35 + tailLength);

        // Legs
        stroke(50);
        strokeWeight(legThickness);

        for (let i = 0; i < numLegs; i++) {
            let offset = map(i, 0, numLegs - 1, -bodyW * 0.4, bodyW * 0.4);
            line(offset, bodyH * 0.3, offset, bodyH * 0.3 + legLength);
        }

        stroke(0);

        // Wings
        fill(wingColor);
        ellipse(-bodyW * 0.6, -bodyH * 0.1, wingSize, wingSize * 1.5);
        ellipse(bodyW * 0.6, -bodyH * 0.1, wingSize, wingSize * 1.5);

        // Body
        strokeWeight(1.5)
        fill(bodyColor);
        ellipse(0, 0, bodyW, bodyH);

        // Head
        strokeWeight(1.5)
        fill(headColor);
        ellipse(0, -bodyH * 0.45, headSize, headSize);

        // Eyes
        strokeWeight(1.5)
        fill(eyeColor);
        ellipse(-eyeSpacing, -bodyH * 0.45, eyeSize, eyeSize);
        ellipse(eyeSpacing, -bodyH * 0.45, eyeSize, eyeSize);

        pop();

        // Fitness label
        textAlign(CENTER);
        fill(this.rolloverOn ? 0 : 0.25);
        text(floor(this.fitness), this.x, this.y + 90);
    }

    // Function to determine wheter the user hovers the mouse or not and then change the fitness value.
    rollover(mx, my) {
        if (this.boundingBox.contains(mx, my)) {
            this.rolloverOn = true;
            this.fitness += 0.25;
        } else {
            this.rolloverOn = false;
        }
    }
}
