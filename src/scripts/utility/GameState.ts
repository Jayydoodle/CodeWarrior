import { BattleParty } from "./Party";

export class GameState{

    party: BattleParty;

    constructor(party: BattleParty)
    {
        this.party = party;
    }

    changeScene(scene: Phaser.Scene)
    {
        this.party.changeScene(scene);
    }
}