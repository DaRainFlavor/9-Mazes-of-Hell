import { Character } from './Character';

export class Vampire extends Character {
    constructor(scene, x, y) {
        super(scene, x, y, 'vampire-walk-down');
        this.setScale(2.3);
        
        // Adjust the hitbox
        this.body.setSize(10, 10);
        this.body.setOffset(26, 33);
        
        // Override speed for vampire
        this.speed = 100;
    }

    update(keys) {
        this.stop();
        let moving = false;
        
        if (keys.left.isDown) {
            this.move('left');
            this.playAnimation('vampire-walk-left');
            this.direction = 'left';
            moving = true;
        } else if (keys.right.isDown) {
            this.move('right');
            this.playAnimation('vampire-walk-right');
            this.direction = 'right';
            moving = true;
        }
        
        if (keys.up.isDown) {
            this.move('up');
            this.playAnimation('vampire-walk-up');
            this.direction = 'up';
            moving = true;
        } else if (keys.down.isDown) {
            this.move('down');
            this.playAnimation('vampire-walk-down');
            this.direction = 'down';
            moving = true;
        }
        
        // If no keys are pressed, play the idle animation
        if (!moving) {
            if (this.direction) {
                this.playAnimation(`vampire-idle-${this.direction}`);
            } else {
                this.playAnimation('vampire-idle-down');
            }
        }
    }

    onCollisionEnter(other) {
        console.log('Vampire is colliding with:', other);
    }
} 