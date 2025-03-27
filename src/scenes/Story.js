import { Scene } from 'phaser';

export class Story extends Scene {
    constructor() {
        super('Story');
    }

    preload() {
        this.load.image('storyBackground', 'assets/story_bg.png');
    }

    create() {
        const bg = this.add.image(0, 0, 'storyBackground').setOrigin(0, 0);
        bg.setDisplaySize(this.scale.width, this.scale.height);

        const storyTexts = [
            "Abandon all hope, ye who enter here...",
            "A lost soul, cast into the depths of Hell, must find his way out.",
            "Nine cursed mazes stand between him and freedom.",
            "Each maze, a trial... each trial, a torment...",
            "To escape, he must outwit the damned, defy the demons, and face his own sins.",
            "His journey begins now."
        ];

        let textIndex = 0;
        let typingFinished = false;

        let storyText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 100, '', {
            fontFamily: 'Arial',
            fontSize: 28,
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: this.scale.width - 100 },
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        let continueText = this.add.text(this.scale.width / 2, this.scale.height - 100, 'Click to Continue', {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setAlpha(0);

        let skipButton = this.add.text(this.scale.width / 2, this.scale.height - 50, 'Skip', {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setInteractive();

        skipButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

        this.input.on('pointerdown', () => {
            if (typingFinished) {
                if (textIndex < storyTexts.length) {
                    typingFinished = false;
                    continueText.setAlpha(0);
                    this.typeText(storyText, storyTexts[textIndex], () => {
                        typingFinished = true;
                        continueText.setAlpha(1);
                    });
                    textIndex++;
                } else {
                    this.scene.start('MainMenu');
                }
            }
        });

        this.typeText(storyText, storyTexts[textIndex], () => {
            typingFinished = true;
            continueText.setAlpha(1);
        });
        textIndex++;
    }

    typeText(textObject, fullText, callback) {
        let i = 0;
        textObject.setText('');
        this.time.addEvent({
            delay: 50,
            repeat: fullText.length - 1,
            callback: () => {
                textObject.text += fullText[i];
                i++;
                if (i === fullText.length && callback) {
                    callback();
                }
            }
        });
    }
}
