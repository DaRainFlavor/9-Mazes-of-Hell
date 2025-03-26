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
        this.currentDirection = Phaser.Math.RND.pick(this.directions);
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
        this.playAnimation(`vampire-walk-${this.currentDirection}`);

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
        console.log('Vampire is colliding with:', other);
        this.changeDirection();
    }

    onWorldBounds() {
        console.log('Vampire hit world bounds');
        this.changeDirection();
    }
}
