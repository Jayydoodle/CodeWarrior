import 'phaser';
import GameConfig = Phaser.Types.Core.GameConfig;
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import UIScene from './scenes/UIScene';
import BattleEarthScene from './scenes/BattleEarthScene';
import StartScene from './scenes/StartScene';
import BattleFireScene from './scenes/BattleFireScene';
require('../css/game.css');

const DEFAULT_WIDTH = window.innerWidth * window.devicePixelRatio;
const DEFAULT_HEIGHT = window.innerHeight * window.devicePixelRatio;

const config: GameConfig = {
    backgroundColor: '#000000',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoCenter: Phaser.Scale.CENTER_VERTICALLY,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, StartScene, MainScene, UIScene, BattleEarthScene, BattleFireScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});

//
