import { Scene } from "phaser";
import WebFontFile from "../scripts/fontLoader";

export class Success extends Scene {
  constructor() {
    super("Success");
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, ["Metal Mania", "Nosifer"]));
    this.load.audio(
      "menuMusic",
      "assets/music/Adrian Vaflor - 9 Mazes of Hell (Intro and Main Menu Loop) 2025-03-21 01_29.m4a"
    );
  }

  create() {
    this.cameras.main.setBackgroundColor("#000000");
    this.sound.pauseOnBlur = false;
    // Play the music
    this.music = this.sound.add("menuMusic", { loop: true, volume: 0.5 });
    this.music.play();

    // Success Text
    this.add
      .text(512, 384, "Your fate is", {
        fontFamily: "Metal Mania",
        fontSize: 64,
        color: "#ffffff",
        align: "center",
      })
      .setOrigin(0.35, 4);

    this.add
      .text(512, 384, "POSTPONED", {
        fontFamily: "Metal Mania",
        fontSize: 120,
        color: "#ffffff",
        align: "center",
      })
      .setOrigin(0.4, 1.75);

    const fadeText = this.add
      .text(512, 384, "...for now", {
        fontFamily: "Nosifer",
        fontSize: 32,
        color: "#bf0b0b",
        align: "center",
      })
      .setOrigin(-0.4, 2)
      .setAlpha(0);

    this.tweens.add({
      targets: fadeText,
      alpha: 1,
      duration: 2000,
      ease: "Power2",
    });

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
  }

  shutdown() {
    if (this.music) {
      this.music.stop();
    }
  }
}
