import { Boot } from "./scenes/Boot";
import { Game } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";
import { Story } from "./scenes/Story"; // Import Story Scene
import { Success } from "./scenes/Success";

const config = {
  type: Phaser.AUTO,
  width: 1216,
  height: 800,
  parent: "game-container",
  backgroundColor: "#028af8",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [
    Boot,
    Preloader,
    Story, // Add Story Scene here (right after Preloader)
    MainMenu,
    Game,
    Success,
    GameOver,
  ],
};

export default new Phaser.Game(config);
