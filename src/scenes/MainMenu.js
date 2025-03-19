import { Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        // Add the background and scale it to fit the screen
        const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        bg.setDisplaySize(this.scale.width, this.scale.height); // Resize to fill screen

        // Add "Start" button
        const startButton = this.add.text(this.scale.width / 2, 460, 'Start', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('Game');
        });

        // Add "Instructions" button
        const instructionsButton = this.add.text(this.scale.width / 2, 520, 'Instructions', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        instructionsButton.setInteractive();
        instructionsButton.on('pointerdown', () => {
            this.showInstructionsPopup();
        });

     
        
    }

    // Function to show Instructions popup
    showInstructionsPopup() {
        // Create a semi-transparent background for the popup
        const popupBackground = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.7)
            .setOrigin(0, 0)
            .setInteractive();

        // Create instructions text
        const instructionsText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, 'Instructions: Use arrow keys to move', {
            fontFamily: 'Arial', fontSize: 32, color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Create a button to close the popup
        const closeButton = this.add.text(this.scale.width / 2, this.scale.height / 2 + 50, 'Close', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        closeButton.setInteractive();
        closeButton.on('pointerdown', () => {
            popupBackground.destroy();
            instructionsText.destroy();
            closeButton.destroy();
        });
    }

}
