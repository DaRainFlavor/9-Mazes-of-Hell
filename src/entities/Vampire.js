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
        
        // Create wall detection rectangles with more visible colors
        this.wallDetectors = {
            left: this.scene.add.rectangle(x - 50, y, 10, 50, 0xff0000, 0.5),
            right: this.scene.add.rectangle(x + 50, y, 10, 50, 0x00ff00, 0.5),
            up: this.scene.add.rectangle(x, y - 50, 50, 10, 0x0000ff, 0.5),
            down: this.scene.add.rectangle(x, y + 50, 50, 10, 0xffff00, 0.5)
        };

        // Set depth for all detectors to be visible above the vampire
        Object.values(this.wallDetectors).forEach(detector => {
            detector.setDepth(20);
            detector.setScrollFactor(0);
            // Enable physics on the detectors
            this.scene.physics.world.enable(detector);
            detector.body.setImmovable(true);
            detector.body.setSize(10, 10); // Set explicit size for physics body
        });

        // Initialize collidable layers as null
        this.collidableLayers = null;
    }

    initializeLayers() {
        // Get the existing layers from the Game scene
        this.collidableLayers = [
            this.scene.layers.tree,
            this.scene.layers.water,
            this.scene.layers.water_detalization,
            this.scene.layers.ground,
            this.scene.layers.bridge,
            this.scene.layers.elevated_space,
            this.scene.layers.curved_ground,
            this.scene.layers.foliage2,
            this.scene.layers.border,
            this.scene.layers.object4,
            this.scene.layers.object1,
            this.scene.layers.object3,
            this.scene.layers.bricks,
            this.scene.layers.object2,
            this.scene.layers.foliage
        ].filter(layer => layer);

        console.log('Collidable layers initialized:', this.collidableLayers.length);
        console.log('Available layers:', Object.keys(this.scene.layers));
    }

    update() {
        super.update();
        
        // Update detector positions directly
        this.wallDetectors.left.setPosition(this.x - 50, this.y);
        this.wallDetectors.right.setPosition(this.x + 50, this.y);
        this.wallDetectors.up.setPosition(this.x, this.y - 50);
        this.wallDetectors.down.setPosition(this.x, this.y + 50);

        // Check for overlaps with collidable layers
        if (this.collidableLayers) {
            Object.entries(this.wallDetectors).forEach(([direction, detector]) => {
                this.collidableLayers.forEach(layer => {
                    const overlap = this.scene.physics.overlap(detector, layer);
                    if (overlap) {
                        console.log(`Wall detected in ${direction} direction!`);
                    }
                });
            });
        }
    }

    destroy() {
        // Clean up the wall detectors when the vampire is destroyed
        Object.values(this.wallDetectors).forEach(detector => {
            detector.destroy();
        });
        super.destroy();
    }
}
