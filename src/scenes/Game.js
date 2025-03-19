import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload() {
        this.load.tilemapTiledJSON('map', './assets/map1.json');
        this.load.image('Ground_rocks', './assets/Tiled_files/Ground_rocks.png');
        this.load.image('Objects', './assets/Tiled_files/Objects.png');
        this.load.image('Objects_animated3', './assets/Tiled_files/Objects_animated3.png');
        this.load.image('water_coasts', './assets/Tiled_files/water_coasts.png');
        this.load.image('Water_detilazation', './assets/Tiled_files/Water_detilazation.png');
        this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    }

    create() {
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
    }
} 
