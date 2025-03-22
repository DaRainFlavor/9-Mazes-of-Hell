import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
        this.isAttacking = false; // Track if attacking
        this.attackCount = 1; // Track which attack is next
        this.attackTimer = null; // Timer for resetting attack combo
        this.facingRight = true; // Track the direction the player is facing
        this.facingDown = false; // Track if the player is facing down
        this.facingUp = false; // Track if the player is facing up
    }

    preload() {
        this.load.audio('gameMusic', 'assets/music/Adrian Vaflor - 9 Mazes of Hell (Game Loop) 2025-03-21 01_28.m4a');
        // Map
        this.load.tilemapTiledJSON('map', './assets/map1.json');
        this.load.image('Ground_rocks', './assets/Tiled_files/Ground_rocks.png');
        this.load.image('Objects', './assets/Tiled_files/Objects.png');
        this.load.image('Objects_animated3', './assets/Tiled_files/Objects_animated3.png');
        this.load.image('water_coasts', './assets/Tiled_files/water_coasts.png');
        this.load.image('Water_detilazation', './assets/Tiled_files/Water_detilazation.png');
        this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');

        // Right
        this.load.spritesheet('warrior-walk-right', './assets/Sprites/Raphael/WarriorRightWalk.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior-idle-right', './assets/Sprites/Raphael/WarriorRightIdle.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior-attack1-right', './assets/Sprites/Raphael/WarriorRightAttack01.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior-attack2-right', './assets/Sprites/Raphael/WarriorRightAttack02.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior-attack3-right', './assets/Sprites/Raphael/WarriorRightAttack03.png', { frameWidth: 48, frameHeight: 48 });

        // Left
        this.load.spritesheet('warrior-walk-left', './assets/Sprites/Raphael/WarriorLeftWalk.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior-idle-left', './assets/Sprites/Raphael/WarriorLeftIdle.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior-attack1-left', './assets/Sprites/Raphael/WarriorLeftAttack01.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior-attack2-left', './assets/Sprites/Raphael/WarriorLeftAttack02.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior-attack3-left', './assets/Sprites/Raphael/WarriorLeftAttack03.png', { frameWidth: 48, frameHeight: 48 });

        // Down
        this.load.spritesheet('warrior-walk-down', './assets/Sprites/Raphael/WarriorDownWalk.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior-idle-down', './assets/Sprites/Raphael/WarriorDownIdle.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior-attack1-down', './assets/Sprites/Raphael/WarriorDownAttack01.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior-attack2-down', './assets/Sprites/Raphael/WarriorDownAttack02.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior-attack3-down', './assets/Sprites/Raphael/WarriorDownAttack03.png', { frameWidth: 48, frameHeight: 48 });

        // UP
        this.load.spritesheet('warrior-walk-up', './assets/Sprites/Raphael/WarriorUpWalk.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior-idle-up', './assets/Sprites/Raphael/WarriorUpIdle.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior-attack1-up', './assets/Sprites/Raphael/WarriorUpAttack01.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior-attack2-up', './assets/Sprites/Raphael/WarriorUpAttack02.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('warrior-attack3-up', './assets/Sprites/Raphael/WarriorUpAttack03.png', { frameWidth: 48, frameHeight: 48 });
    }

    create() {
        this.sound.pauseOnBlur = false;
        this.music = this.sound.add('gameMusic', { loop: true, volume: 0.5 });
        this.music.play();

        // Create player sprite
        this.player = this.physics.add.sprite(270, 210, 'warrior-idle-right');
        this.player.setScale(2);

        // Adjust the hitbox
        this.player.body.setSize(10, 12); // Adjust width and height
        this.player.body.setOffset(20, 27); // Adjust x and y offset

        // Define animations
        this.createAnimations();

        // Play idle animation by default
        this.player.anims.play('idle-right');

        // Create keyboard inputs
        this.cursors = this.input.keyboard.createCursorKeys();
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Listen for animation complete event
        this.player.on('animationcomplete', (animation) => {
            if (animation.key.startsWith('attack-')) {
                this.isAttacking = false; // Allow new actions

                // Reset attack combo if no new attack happens within 500ms
                this.attackTimer = setTimeout(() => {
                    this.attackCount = 1;
                }, 500);
            }
        });

        this.player.setDepth(10);
        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        this.player.setCollideWorldBounds(true);

        this.textures.each(texture => {
            texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        });
        // this.physics.world.createDebugGraphic();
    }

    createAnimations() {
        let map = this.make.tilemap({
            key: 'map'
        });
    
        let groundRocksTileset = map.addTilesetImage('Ground_rocks', 'Ground_rocks');
        let objectsTileset = map.addTilesetImage('Objects', 'Objects');
        let objectsAnimated3Tileset = map.addTilesetImage('Objects_animated3', 'Objects_animated3');
        let waterCoastsTileset = map.addTilesetImage('water_coasts', 'water_coasts');
        let waterDetilazationTileset = map.addTilesetImage('Water_detilazation', 'Water_detilazation');

        let waterLayer = map.createLayer('water', [groundRocksTileset, objectsTileset, objectsAnimated3Tileset, waterCoastsTileset, waterDetilazationTileset], 0, 0);
        let waterDetalizationLayer = map.createLayer('water_detalization', [groundRocksTileset, objectsTileset, objectsAnimated3Tileset, waterCoastsTileset, waterDetilazationTileset], 0, 0);
        let groundLayer = map.createLayer('ground', [groundRocksTileset, objectsTileset, objectsAnimated3Tileset, waterCoastsTileset, waterDetilazationTileset], 0, 0);
        let bridgeLayer = map.createLayer('bridge', [groundRocksTileset, objectsTileset, objectsAnimated3Tileset, waterCoastsTileset, waterDetilazationTileset], 0, 0);
        let elevatedSpaceLayer = map.createLayer('elevated_space', [groundRocksTileset, objectsTileset, objectsAnimated3Tileset, waterCoastsTileset, waterDetilazationTileset], 0, 0);
        let curvedGroundLayer = map.createLayer('curved_ground', [groundRocksTileset, objectsTileset, objectsAnimated3Tileset, waterCoastsTileset, waterDetilazationTileset], 0, 0);
        let foliage2Layer = map.createLayer('foliage2', [groundRocksTileset, objectsTileset, objectsAnimated3Tileset, waterCoastsTileset, waterDetilazationTileset], 0, 0);
        let borderLayer = map.createLayer('border', [groundRocksTileset, objectsTileset, objectsAnimated3Tileset, waterCoastsTileset, waterDetilazationTileset], 0, 0);
        let object4Layer = map.createLayer('object4', [groundRocksTileset, objectsTileset, objectsAnimated3Tileset, waterCoastsTileset, waterDetilazationTileset], 0, 0);
        let object1Layer = map.createLayer('object1', [groundRocksTileset, objectsTileset, objectsAnimated3Tileset, waterCoastsTileset, waterDetilazationTileset], 0, 0);
        let object3Layer = map.createLayer('object3', [groundRocksTileset, objectsTileset, objectsAnimated3Tileset, waterCoastsTileset, waterDetilazationTileset], 0, 0);
        let bricksLayer = map.createLayer('bricks', [groundRocksTileset, objectsTileset, objectsAnimated3Tileset, waterCoastsTileset, waterDetilazationTileset], 0, 0);
        let object2Layer = map.createLayer('object2', [groundRocksTileset, objectsTileset, objectsAnimated3Tileset, waterCoastsTileset, waterDetilazationTileset], 0, 0);
        let foliageLayer = map.createLayer('foliage', [groundRocksTileset, objectsTileset, objectsAnimated3Tileset, waterCoastsTileset, waterDetilazationTileset], 0, 0);

        borderLayer.setCollisionByProperty({ collide: true });
        this.physics.add.collider(this.player, borderLayer);

        foliageLayer.setScale(2);
        object2Layer.setScale(2);
        bricksLayer.setScale(2);
        object3Layer.setScale(2);
        object1Layer.setScale(2);
        object4Layer.setScale(2);
        borderLayer.setScale(2);
        foliage2Layer.setScale(2);
        curvedGroundLayer.setScale(2);
        elevatedSpaceLayer.setScale(2);
        bridgeLayer.setScale(2);
        groundLayer.setScale(2);
        waterDetalizationLayer.setScale(2);
        waterLayer.setScale(2);
        
        this.animatedTiles.init(map);

        // Right animations
        this.anims.create({ key: 'walk-right', frames: this.anims.generateFrameNumbers('warrior-walk-right', { start: 0, end: 7 }), frameRate: 15, repeat: -1 });
        this.anims.create({ key: 'idle-right', frames: this.anims.generateFrameNumbers('warrior-idle-right', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });

        // Left animations
        this.anims.create({ key: 'walk-left', frames: this.anims.generateFrameNumbers('warrior-walk-left', { start: 0, end: 7 }), frameRate: 15, repeat: -1 });
        this.anims.create({ key: 'idle-left', frames: this.anims.generateFrameNumbers('warrior-idle-left', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });

        // Down animations
        this.anims.create({ key: 'walk-down', frames: this.anims.generateFrameNumbers('warrior-walk-down', { start: 0, end: 7 }), frameRate: 15, repeat: -1 });
        this.anims.create({ key: 'idle-down', frames: this.anims.generateFrameNumbers('warrior-idle-down', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });

        // UP animations
        this.anims.create({ key: 'walk-up', frames: this.anims.generateFrameNumbers('warrior-walk-up', { start: 0, end: 7 }), frameRate: 15, repeat: -1 });
        this.anims.create({ key: 'idle-up', frames: this.anims.generateFrameNumbers('warrior-idle-up', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });
 
        // Right attack animations
        this.anims.create({ 
            key: 'attack-right1', 
            frames: this.anims.generateFrameNumbers('warrior-attack1-right', { start: 0, end: 5 }), 
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({ 
            key: 'attack-right2', 
            frames: this.anims.generateFrameNumbers('warrior-attack2-right', { start: 0, end: 5 }), 
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({ 
            key: 'attack-right3', 
            frames: this.anims.generateFrameNumbers('warrior-attack3-right', { start: 0, end: 4 }), 
            frameRate: 10,
            repeat: 0
        });

        // Left attack animations
        this.anims.create({ 
            key: 'attack-left1', 
            frames: this.anims.generateFrameNumbers('warrior-attack1-left', { start: 0, end: 5 }), 
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({ 
            key: 'attack-left2', 
            frames: this.anims.generateFrameNumbers('warrior-attack2-left', { start: 0, end: 5 }), 
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({ 
            key: 'attack-left3', 
            frames: this.anims.generateFrameNumbers('warrior-attack3-left', { start: 0, end: 4 }), 
            frameRate: 10,
            repeat: 0
        });

        // Down attack animations
        this.anims.create({ 
            key: 'attack-down1', 
            frames: this.anims.generateFrameNumbers('warrior-attack1-down', { start: 0, end: 5 }), 
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({ 
            key: 'attack-down2', 
            frames: this.anims.generateFrameNumbers('warrior-attack2-down', { start: 0, end: 5 }), 
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({ 
            key: 'attack-down3', 
            frames: this.anims.generateFrameNumbers('warrior-attack3-down', { start: 0, end: 4 }), 
            frameRate: 10,
            repeat: 0
        });

        // Up attack animations
        this.anims.create({ 
            key: 'attack-up1', 
            frames: this.anims.generateFrameNumbers('warrior-attack1-up', { start: 0, end: 5 }), 
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({ 
            key: 'attack-up2', 
            frames: this.anims.generateFrameNumbers('warrior-attack2-up', { start: 0, end: 5 }), 
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({ 
            key: 'attack-up3', 
            frames: this.anims.generateFrameNumbers('warrior-attack3-up', { start: 0, end: 4 }), 
            frameRate: 10,
            repeat: 0
        });
    }

    update() {
        if (this.isAttacking) return; // Prevent movement while attacking

        // Reset velocity
        this.player.setVelocity(0);

        // Movement Logic
        if (this.cursors.right.isDown) {
            this.player.setVelocityX(70);
            this.player.anims.play('walk-right', true);
            this.facingRight = true;
            this.facingDown = false;
            this.facingUp = false;
        } else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-70);
            this.player.anims.play('walk-left', true);
            this.facingRight = false;
            this.facingDown = false;
            this.facingUp = false;
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(70);
            this.player.anims.play('walk-down', true);
            this.facingDown = true;
            this.facingUp = false;
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-70);
            this.player.anims.play('walk-up', true);
            this.facingUp = true;
            this.facingDown = false;
        } else {
            // Idle animations
            if (this.facingDown) {
                this.player.anims.play('idle-down', true);
            } else if (this.facingUp) {
                this.player.anims.play('idle-up', true);
            } else {
                this.player.anims.play(this.facingRight ? 'idle-right' : 'idle-left', true);
            }
        }

        // Attack combo logic
        if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
            clearTimeout(this.attackTimer); // Stop attack reset timer
            this.isAttacking = true;

            if (this.facingUp) {
                // Prioritize facing up over other directions
                if (this.attackCount === 1) {
                    this.player.anims.play('attack-up1', true);
                    this.attackCount = 2;
                }
                else if (this.attackCount === 2) {
                    this.player.anims.play('attack-up2', true);
                    this.attackCount = 3;
                } else {
                    this.player.anims.play('attack-up3', true);
                    this.attackCount = 1; // Reset attack cycle
                }
            } else if (this.facingDown) {
                if (this.attackCount === 1) {
                    this.player.anims.play('attack-down1', true);
                    this.attackCount = 2;
                }
                else if (this.attackCount === 2) {
                    this.player.anims.play('attack-down2', true);
                    this.attackCount = 3;
                } else {
                    this.player.anims.play('attack-down3', true);
                    this.attackCount = 1; // Reset attack cycle
                }
            } else if (this.facingRight) {
                if (this.attackCount === 1) {
                    this.player.anims.play('attack-right1', true);
                    this.attackCount = 2;
                }
                else if (this.attackCount === 2) {
                    this.player.anims.play('attack-right2', true);
                    this.attackCount = 3;
                } else {
                    this.player.anims.play('attack-right3', true);
                    this.attackCount = 1; // Reset attack cycle
                }
            } else {
                // Default to left attack if no other direction is active
                if (this.attackCount === 1) {
                    this.player.anims.play('attack-left1', true);
                    this.attackCount = 2;
                }
                else if (this.attackCount === 2) {
                    this.player.anims.play('attack-left2', true);
                    this.attackCount = 3;
                } else {
                    this.player.anims.play('attack-left3', true);
                    this.attackCount = 1; // Reset attack cycle
                }
            }
        }
    }
}
