import { Character } from './Character';

export class Warrior extends Character {
    constructor(scene, x, y) {
        super(scene, x, y, 'warrior-idle-right');
        this.setScale(2);
        this.speed = 100;
        
        // Adjust the hitbox
        this.body.setSize(10, 12);
        this.body.setOffset(20, 27);
        
        // Attack properties
        this.isAttacking = false;
        this.attackCount = 1;
        this.attackTimer = null;
        
        // Direction tracking
        this.facingRight = true;
        this.facingDown = false;
        this.facingUp = false;
    }

    attack() {
        if (this.isAttacking) return;
        
        clearTimeout(this.attackTimer);
        this.isAttacking = true;
        
        let attackKey = '';
        if (this.facingUp) {
            attackKey = 'attack-up';
        } else if (this.facingDown) {
            attackKey = 'attack-down';
        } else if (this.facingRight) {
            attackKey = 'attack-right';
        } else {
            attackKey = 'attack-left';
        }
        
        this.playAnimation(`${attackKey}${this.attackCount}`);
        
        // Increment attack count
        this.attackCount = (this.attackCount % 3) + 1;
        
        // Reset attack combo after animation
        this.once('animationcomplete', () => {
            this.isAttacking = false;
            this.attackTimer = setTimeout(() => {
                this.attackCount = 1;
            }, 500);
        });
    }

    update(cursors) {
        console.log(this.x + ' ' + this.y);
        if (this.isAttacking) return;
        
        this.stop();
        
        if (cursors.right.isDown) {
            this.move('right');
            this.playAnimation('walk-right');
            this.facingRight = true;
            this.facingDown = false;
            this.facingUp = false;
        } else if (cursors.left.isDown) {
            this.move('left');
            this.playAnimation('walk-left');
            this.facingRight = false;
            this.facingDown = false;
            this.facingUp = false;
        } else if (cursors.down.isDown) {
            this.move('down');
            this.playAnimation('walk-down');
            this.facingDown = true;
            this.facingUp = false;
        } else if (cursors.up.isDown) {
            this.move('up');
            this.playAnimation('walk-up');
            this.facingUp = true;
            this.facingDown = false;
        } else {
            // Idle animations
            if (this.facingDown) {
                this.playAnimation('idle-down');
            } else if (this.facingUp) {
                this.playAnimation('idle-up');
            } else {
                this.playAnimation(this.facingRight ? 'idle-right' : 'idle-left');
            }
        }
    }
} 