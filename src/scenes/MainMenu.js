import { Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        // Load the music file
        this.load.audio('menuMusic', 'assets/music/Adrian Vaflor - 9 Mazes of Hell (Intro and Main Menu Loop) 2025-03-21 01_29.m4a');
    }

    create() {
        this.sound.pauseOnBlur = false
        // Play the music
        this.music = this.sound.add('menuMusic', { loop: true, volume: 0.5 });
        this.music.play();

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
            this.music.stop(); // Stop music when switching scenes
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

    // Stop the music when this scene is stopped or changed
    shutdown() {
        if (this.music) {
            this.music.stop();
        }
    }

    // Function to show Instructions popup
    showInstructionsPopup() {
        // Create a semi-transparent overlay
        const popupBackground = this.add.rectangle(
            this.scale.width / 2, this.scale.height / 2, 
            this.scale.width * 0.6, this.scale.height * 0.5, 
            0x000000, 0.94
        ).setOrigin(0.5);
    
        // Add a border effect (optional)
        popupBackground.setStrokeStyle(4, 0xffffff);
    
        // Create instructions text
        const instructionsText = this.add.text(
            this.scale.width / 2, this.scale.height / 2 - 60, 
            'How to Play:\n- Use arrow keys to move.\n- Avoid the demons.\n- Reach the exit to proceed.\n- If a demon catches you, game over.', 
            {
                fontFamily: 'Arial', 
                fontSize: 28, 
                color: '#ffffff', 
                align: 'center',
                wordWrap: { width: this.scale.width * 0.5 } 
            }
        ).setOrigin(0.5);
    
        // Create a close button
        const closeButton = this.add.text(
            this.scale.width / 2, this.scale.height / 2 + 100, 
            'Close', 
            {
                fontFamily: 'Arial Black', 
                fontSize: 38, 
                color: '#ffffff', 
                stroke: '#000000', 
                strokeThickness: 8,
                align: 'center'
            }
        ).setOrigin(0.5);
    
        closeButton.setInteractive();
        closeButton.on('pointerdown', () => {
            popupBackground.destroy();
            instructionsText.destroy();
            closeButton.destroy();
        });
    }
    
}
