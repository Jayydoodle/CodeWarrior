import { AssignmentChallenge, Challenge } from "./Challenge"
import { EventEmitter } from "events";
import { EventType } from "./Enumeration";

export class ChallengeManager{

    public challenge: Challenge;
    public emitter: Phaser.Events.EventEmitter;

    constructor()
    {
        this.emitter = new Phaser.Events.EventEmitter();
    }

    public generateChallege()
    {
        let newChallenge = new AssignmentChallenge(1);
        
        this.challenge = newChallenge;
        this.emitter.emit(EventType.infoTextUpdated, this.challenge.infoText);
    }

    public evaluateAnswer(code)
    {
        return this.challenge.method(code);
    }
}