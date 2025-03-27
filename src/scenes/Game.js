import { Scene } from 'phaser';
import { Warrior } from '../entities/Warrior';
import { Vampire } from '../entities/Vampire';

export class Game extends Scene {
    constructor() {
        super('Game');
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

        // Vampire Walk
        this.load.spritesheet('vampire-walk-down', './assets/Sprites/Demon/Vampires3Walk.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('vampire-walk-up', './assets/Sprites/Demon/Vampires3Walk.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('vampire-walk-left', './assets/Sprites/Demon/Vampires3Walk.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('vampire-walk-right', './assets/Sprites/Demon/Vampires3Walk.png', { frameWidth: 64, frameHeight: 64 });
        
        // Vampire Idle
        this.load.spritesheet('vampire-idle-down', './assets/Sprites/Demon/Vampires3Idle.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('vampire-idle-up', './assets/Sprites/Demon/Vampires3Idle.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('vampire-idle-left', './assets/Sprites/Demon/Vampires3Idle.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('vampire-idle-right', './assets/Sprites/Demon/Vampires3Idle.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        this.sound.pauseOnBlur = false;
        this.music = this.sound.add('gameMusic', { loop: true, volume: 0.5 });
        this.music.play();

        // Create player and vampire using the new classes
        this.player = new Warrior(this, 270, 210);
        this.vampire = new Vampire(this, 950, 410);
        this.vampire2 = new Vampire(this, 600, 600);
        this.vampire3 = new Vampire(this, 230, 575);
        this.vampire4 = new Vampire(this, 700, 20);

        this.physics.add.overlap(this.player, [this.vampire, this.vampire2, this.vampire3, this.vampire4], this.handlePlayerVampireCollision, null, this);

        // Create keyboard inputs
        this.cursors = this.input.keyboard.createCursorKeys();
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // Define keyboard inputs for vampire
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.player.setDepth(10);
        this.vampire.setDepth(10);
        this.vampire2.setDepth(10);
        this.vampire3.setDepth(10);
        this.vampire4.setDepth(10);
        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        this.player.setCollideWorldBounds(true);
        this.vampire.setCollideWorldBounds(true);
        this.vampire2.setCollideWorldBounds(true);
        this.vampire3.setCollideWorldBounds(true);
        this.vampire4.setCollideWorldBounds(true);
        this.textures.each(texture => {
            texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        });

        // Define success area (lower right corner)
        this.successArea = new Phaser.Geom.Rectangle(
            this.game.config.width - 120,  // x position (200px from right)
            this.game.config.height-100, // y position (200px from bottom)
            50,                          // width 
            120                           // height
        );

        // For debug visualization - draw the success area rectangle
        // const graphics = this.add.graphics();
        // graphics.lineStyle(2, 0x00ff00, 1); // Green border
        // graphics.strokeRectShape(this.successArea);
        // graphics.setDepth(100); // Make sure it's on top

        // Create map and animations
        this.createMap();
        this.createAnimations();
    }

    handlePlayerVampireCollision(player, vampire) {
        console.log('Game Over: Collided with a vampire!');
        this.music.stop(); // Stop game music
        this.scene.start('GameOver'); // Transition to GameOver scene
    }

    createMap() {
        let map = this.make.tilemap({
            key: 'map'
        });
    
        let groundRocksTileset = map.addTilesetImage('Ground_rocks', 'Ground_rocks');
        let objectsTileset = map.addTilesetImage('Objects', 'Objects');
        let objectsAnimated3Tileset = map.addTilesetImage('Objects_animated3', 'Objects_animated3');
        let waterCoastsTileset = map.addTilesetImage('water_coasts', 'water_coasts');
        let waterDetilazationTileset = map.addTilesetImage('Water_detilazation', 'Water_detilazation');

        let treeLayer = map.createLayer('tree', [groundRocksTileset, objectsTileset, objectsAnimated3Tileset, waterCoastsTileset, waterDetilazationTileset], 0, 0);
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

        treeLayer.setDepth(20);

        let layers = [
            treeLayer, waterLayer, waterDetalizationLayer, groundLayer, bridgeLayer, elevatedSpaceLayer,
            curvedGroundLayer, foliage2Layer, borderLayer, object4Layer, object1Layer,
            object3Layer, bricksLayer, object2Layer, foliageLayer
        ];
        
        // Set collision for all layers
        layers.forEach(layer => {
            if (layer) {
                layer.setCollisionByProperty({ collide: true });
                this.physics.add.collider(this.player, layer);
                this.physics.add.collider(this.vampire, layer, this.vampire.onCollisionEnter);
                this.physics.add.collider(this.vampire2, layer, this.vampire2.onCollisionEnter);
                this.physics.add.collider(this.vampire3, layer, this.vampire3.onCollisionEnter);
                this.physics.add.collider(this.vampire4, layer, this.vampire4.onCollisionEnter);
            }
        });

        // Scale all layers
        layers.forEach(layer => {
            if (layer) {
                layer.setScale(2);
            }
        });
        
        this.animatedTiles.init(map);
    }

    createAnimations() {
        // Right animations
        this.anims.create({ key: 'walk-right', frames: this.anims.generateFrameNumbers('warrior-walk-right', { start: 0, end: 7 }), frameRate: 25, repeat: -1 });
        this.anims.create({ key: 'idle-right', frames: this.anims.generateFrameNumbers('warrior-idle-right', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });

        // Left animations
        this.anims.create({ key: 'walk-left', frames: this.anims.generateFrameNumbers('warrior-walk-left', { start: 0, end: 7 }), frameRate: 25, repeat: -1 });
        this.anims.create({ key: 'idle-left', frames: this.anims.generateFrameNumbers('warrior-idle-left', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });

        // Down animations
        this.anims.create({ key: 'walk-down', frames: this.anims.generateFrameNumbers('warrior-walk-down', { start: 0, end: 7 }), frameRate: 25, repeat: -1 });
        this.anims.create({ key: 'idle-down', frames: this.anims.generateFrameNumbers('warrior-idle-down', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });

        // UP animations
        this.anims.create({ key: 'walk-up', frames: this.anims.generateFrameNumbers('warrior-walk-up', { start: 0, end: 7 }), frameRate: 25, repeat: -1 });
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

        
        // Vampire animations
        // Vampire walk
        this.anims.create({ 
            key: 'vampire-walk-down', 
            frames: this.anims.generateFrameNumbers('vampire-walk-down', { start: 0, end: 5 }), 
            frameRate: 15, 
            repeat: -1 
        });

        this.anims.create({ 
            key: 'vampire-walk-up', 
            frames: this.anims.generateFrameNumbers('vampire-walk-up', { start: 6, end: 11 }), 
            frameRate: 15, 
            repeat: -1 
        });

        this.anims.create({ 
            key: 'vampire-walk-left', 
            frames: this.anims.generateFrameNumbers('vampire-walk-left', { start: 12, end: 17 }), 
            frameRate: 15, 
            repeat: -1 
        });

        this.anims.create({ 
            key: 'vampire-walk-right', 
            frames: this.anims.generateFrameNumbers('vampire-walk-right', { start: 18, end: 23 }), 
            frameRate: 15, 
            repeat: -1 
        });

        // Vampire Idle
        // Vampire Idle Animations
        this.anims.create({ key: 'vampire-idle-down', frames: this.anims.generateFrameNumbers('vampire-idle-down', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });
        this.anims.create({ key: 'vampire-idle-up', frames: this.anims.generateFrameNumbers('vampire-idle-up', { start: 4, end: 7 }), frameRate: 6, repeat: -1 });
        this.anims.create({ key: 'vampire-idle-left', frames: this.anims.generateFrameNumbers('vampire-idle-left', { start: 8, end: 11 }), frameRate: 6, repeat: -1 });
        this.anims.create({ key: 'vampire-idle-right', frames: this.anims.generateFrameNumbers('vampire-idle-right', { start: 12, end: 15 }), frameRate: 6, repeat: -1 });

    }

    update() {
        // Update player
        this.player.update(this.cursors);
        
        // Handle attack
        if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
            this.player.attack();
        }
        
        // Update vampire
        this.vampire.update();
        this.vampire2.update();
        this.vampire3.update();
        this.vampire4.update();

        // Check if player is in success area
        if (Phaser.Geom.Rectangle.Contains(this.successArea, this.player.x, this.player.y)) {
            console.log('Level completed!');
            this.music.stop(); // Stop game music
            this.scene.start('Success'); // Transition to Success scene
        }
    }
}
