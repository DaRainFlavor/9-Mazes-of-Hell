import { Character } from './Character';

export class Vampire extends Character {
    constructor(scene, x, y) {
        super(scene, x, y, 'vampire-walk-down');
        this.setScale(2.3);

        // Adjust the hitbox
        this.body.setSize(10, 10);
        this.body.setOffset(26, 33);

        this.speed = 100;
        this.directions = ['left', 'right', 'up', 'down']; // Removed 'idle' from here
        this.currentDirection = 'right';
        this.isIdle = false;
        this.lastDirection = 'down'; // Default direction

        this.onCollisionEnter = this.onCollisionEnter.bind(this);
        this.onWorldBounds = this.onWorldBounds.bind(this);

        // Enable world bounds collision check
        this.body.onWorldBounds = true;

        this.scene.time.addEvent({
            delay: Phaser.Math.Between(2000, 4000),
            callback: () => this.changeDirection(),
            loop: true
        });
    }

    update() {
        if (this.isIdle) {
            this.body.setVelocity(0, 0);
            this.playAnimation(`vampire-idle-${this.lastDirection}`);
            return;
        }

        this.move(this.currentDirection);

        if (this.body.blocked.left || this.body.blocked.right || 
            this.body.blocked.up || this.body.blocked.down) {
            this.onWorldBounds();
        }
    }

    move(direction) {
        if (direction === 'idle') {
            this.body.setVelocity(0, 0);
            this.isIdle = true;

            this.scene.time.delayedCall(Phaser.Math.Between(1000, 2000), () => {
                this.isIdle = false;
                this.changeDirection();
            });
        } else {
            this.isIdle = false;
            this.lastDirection = direction; // Store last movement direction
            switch (direction) {
                case 'left': this.body.setVelocity(-this.speed, 0); break;
                case 'right': this.body.setVelocity(this.speed, 0); break;
                case 'up': this.body.setVelocity(0, -this.speed); break;
                case 'down': this.body.setVelocity(0, this.speed); break;
            }
        }
        this.playAnimation(`vampire-walk-${direction}`);
    }

    changeDirection() {
        // 3% chance to go idle, 97% chance to pick a movement direction
        if (Phaser.Math.Between(1, 100) <= 3) {
            this.currentDirection = 'idle';
        } else {
            this.currentDirection = Phaser.Math.RND.pick(this.directions);
        }
    }

    onCollisionEnter(other) {
        this.changeDirection();
    }

    onWorldBounds() {
        this.changeDirection();
    }
}

export class Vampire_2 extends Vampire {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.createWallDetectors(x, y);
    }

    createWallDetectors(x, y) {
        // Create wall detection rectangles with more visible colors
        this.wallDetectors = {
            left: this.scene.add.rectangle(x - 30, y, 10, 25, 0xff0000, 0.5),
            right: this.scene.add.rectangle(x + 30, y, 10, 25, 0x00ff00, 0.5),
            up: this.scene.add.rectangle(x, y - 30, 25, 10, 0x0000ff, 0.5),
            down: this.scene.add.rectangle(x, y + 30, 25, 10, 0xffff00, 0.5)
        };

        // Set depth for all detectors to be visible above the vampire
        Object.values(this.wallDetectors).forEach(detector => {
            detector.setDepth(20);
            detector.setScrollFactor(0);
            // Enable physics on the detectors
            this.scene.physics.world.enable(detector);
            detector.body.setImmovable(true);
            detector.body.setSize(20, 20); // Set explicit size for physics body
        });
    }

    checkWallDetection() {
        // Initialize detection results
        const detectionResults = {
            left: false,
            right: false,
            up: false,
            down: false
        };

        // Check for walls in all directions
        Object.entries(this.wallDetectors).forEach(([direction, detector]) => {
            // Update detector position based on direction

            const yWithOffset = this.y + 10;
            const distance = 20;
            switch(direction) {
                case 'left': detector.setPosition(this.x - distance, yWithOffset); break;
                case 'right': detector.setPosition(this.x + distance, yWithOffset); break;
                case 'up': detector.setPosition(this.x, yWithOffset - distance); break;
                case 'down': detector.setPosition(this.x, yWithOffset + distance); break;
            }

            // Check for walls
            Object.values(this.scene.layers).forEach(layer => {
                if (layer) {
                    // Check if the layer has collision tiles at the detector's position
                    const tile = layer.getTileAtWorldXY(detector.x, detector.y);
                    if (tile && tile.properties.collide) {
                        console.log(`Wall detected in ${direction} direction!`);
                        detectionResults[direction] = true;
                    }
                }
            });
        });

        return detectionResults;
    }

    update() {
        this.move('down');
        const wallDetections = this.checkWallDetection();
        console.log(wallDetections);
        // You can now use wallDetections.left, wallDetections.right, etc.
    }

    destroy() {
        // Clean up the wall detectors when the vampire is destroyed
        Object.values(this.wallDetectors).forEach(detector => {
            detector.destroy();
        });
        super.destroy();
    }
}
