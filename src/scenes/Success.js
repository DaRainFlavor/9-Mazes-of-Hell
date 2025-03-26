import { Scene } from 'phaser';

export class Success extends Scene
{
    constructor ()
    {
        super('Success');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor('#008000');

    /*    this.add.image(512, 384, 'background').setAlpha(0.5);*/

        this.add.text(512, 384, 'Level Completed Screen', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
