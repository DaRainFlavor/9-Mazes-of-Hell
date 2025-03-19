import { Scene } from 'phaser';

export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        // Load the background image
        this.load.image('background', 'assets/bg.png');
    }

    create() {
        // Get the game width and height
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Add the background and set it to fit the game dimensions
        this.add.image(width / 2, height / 2, 'background').setOrigin(0.5).setDisplaySize(width, height);

        // Start the next scene
        this.scene.start('Preloader');
    }
}
