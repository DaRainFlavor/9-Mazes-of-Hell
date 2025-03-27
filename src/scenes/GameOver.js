import { Scene, Textures } from "phaser";
import WebFontFile from "../scripts/fontLoader";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, "Nosifer"));
    this.load.audio("gameOverMusic", "assets/music/Game Over.mp3");
    this.load.audio("scream", "assets/sfx/Scream1.mp3");
    this.load.image("gameOverBG", "assets/gameOverBG.jpg");
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background image
    const bg = this.add.image(0, 0, "gameOverBG").setOrigin(0, 0);
    bg.setDisplaySize(width, height);

    // Music
    this.sound.pauseOnBlur = false;
    this.music = this.sound.add("gameOverMusic", { loop: true, volume: 0.75 });
    this.music.play();

    // Scream SFX
    this.music = this.sound.add("scream", { loop: false, volume: 1 });
    this.music.play();

    // Return to Main Menu button
    const returnToMenuButton = this.add
      .text(this.scale.width / 2, 460, "Return to Main Menu", {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5, -2);
    returnToMenuButton.setInteractive();
    returnToMenuButton.on("pointerdown", () => {
      this.music.stop(); // Stop music when switching scenes
      this.scene.start("MainMenu");
    });

    this.cameras.main.setBackgroundColor("#000000");
    this.add
      .text(512, 384, "YOU HAVE PERISHED", {
        fontFamily: "Nosifer",
        fontSize: 80,
        color: "#bf0b0b",
        align: "center",
      })
      .setOrigin(0.41, 2);
  }

  shutdown() {
    if (this.music) {
      this.music.stop();
    }
  }
}
