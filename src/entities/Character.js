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
} 