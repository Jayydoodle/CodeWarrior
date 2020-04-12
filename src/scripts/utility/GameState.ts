import { Party } from "./Party";

export class GameState{

    party: Party;

    constructor(party: Party)
    {
        this.party = party;
    }

    changeScene(scene: Phaser.Scene)
    {
        this.party.changeScene(scene);
    }
}