import { BattleParty } from "../objects/characters/Party";
import { GameMode } from "./Enumeration";

export class GameState{

    party: BattleParty;
    gameMode: GameMode;

    constructor(party: BattleParty)
    {
        this.party = party;
    }

    setDifficulty(gameMode: GameMode)
    {
        this.gameMode = gameMode;
    }

    changeScene(scene: Phaser.Scene)
    {
        this.party.changeScene(scene);
    }
}