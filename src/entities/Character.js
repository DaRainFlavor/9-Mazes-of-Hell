export class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        // Movement properties
        this.speed = 70;
        this.direction = 'down';
        this.isMoving = false;
        
        // Animation properties
        this.currentAnimation = null;

        // Collision properties
        this.isColliding = false;
        this.collisionDirection = null;
    }

    move(direction) {
        this.direction = direction;
        this.isMoving = true;
        
        switch(direction) {
            case 'right':
                this.setVelocityX(this.speed);
                this.setVelocityY(0);
                break;
            case 'left':
                this.setVelocityX(-this.speed);
                this.setVelocityY(0);
                break;
            case 'down':
                this.setVelocityX(0);
                this.setVelocityY(this.speed);
                break;
            case 'up':
                this.setVelocityX(0);
                this.setVelocityY(-this.speed);
                break;
        }
    }

    stop() {
        this.setVelocity(0);
        this.isMoving = false;
    }

    playAnimation(key, ignoreIfPlaying = false) {
        if (ignoreIfPlaying && this.currentAnimation === key) return;
        
        this.anims.play(key, true);
        this.currentAnimation = key;
    }

    update() {
        // To be implemented by child classes
    }

    // Add these new methods for collision detection
    onCollisionEnter(other) {
        this.isColliding = true;
        this.collisionDirection = this.getCollisionDirection(other);
        console.log(`Collision with ${other.texture.key} from ${this.collisionDirection}`);
    }

    onCollisionExit(other) {
        this.isColliding = false;
        this.collisionDirection = null;
        console.log(`Collision ended with ${other.texture.key}`);
    }

    getCollisionDirection(other) {
        // Calculate the direction of collision
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        
        // Determine the primary direction of collision
        if (Math.abs(dx) > Math.abs(dy)) {
            return dx > 0 ? 'right' : 'left';
        } else {
            return dy > 0 ? 'down' : 'up';
        }
    }

    isCollidingWith(other) {
        return this.isColliding && this.collisionDirection !== null;
    }

    getCollisionDirection() {
        if (this.body.touching.left) return 'left';
        if (this.body.touching.right) return 'right';
        if (this.body.touching.up) return 'up';
        if (this.body.touching.down) return 'down';
        return null;
    }

    isColliding() {
        // Check if the character is touching any other physics body
        return this.body.touching.left || 
               this.body.touching.right || 
               this.body.touching.up || 
               this.body.touching.down;
    }
} 