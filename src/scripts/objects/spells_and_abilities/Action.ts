import { ActionType, EventType, Depth, Value, EffectType, ElementType, ObjectScale, FrameRate } from "../../utility/Enumeration";
import { Character } from "../characters/Hero";
import { Effect } from "./Effect";
import { BattleParty, EnemyParty } from "../characters/Party";

export class Action{

    name: string;
    actionType: ActionType;
    imageKey: string;
    imageFrames: number;
    frameRate: number = FrameRate.Spell;
    repeat: number = 0;
    mpCost: number = 0;
    value: number = 0;
    public emitter: Phaser.Events.EventEmitter;

    constructor(name: string, actionType: ActionType, imageKey: string, imageFrames: number){
        this.name = name;
        this.actionType = actionType;
        this.imageKey = imageKey;
        this.imageFrames = imageFrames;
        this.emitter = new Phaser.Events.EventEmitter();
    }

    playAnimation(scene: Phaser.Scene, target:Character | BattleParty | EnemyParty)
    {
        let action = target instanceof Character ? new Phaser.Physics.Arcade.Sprite(scene, target.x, target.y, this.imageKey)
                                    : new Phaser.Physics.Arcade.Sprite(scene, scene.game.config.width as number / 2, 
                                                                       scene.game.config.height as number / 2, this.imageKey)
        
        scene.add.existing(action);
        scene.physics.add.existing(action);
        action.setDepth(Depth.Effect);

        if(target instanceof Character)
            action.setScale(ObjectScale.Spell);
        else
            action.setDisplaySize(scene.game.canvas.width, scene.game.canvas.height);

        action.anims.animationManager.create(
        {
            key: this.name+"_anim",
            frames: action.anims.animationManager.generateFrameNumbers(this.imageKey, { start: 0, end: this.imageFrames }),
            frameRate: this.frameRate,
            repeat: this.repeat
        });

        action.play(this.name+"_anim", true).once("animationcomplete-"+this.name+"_anim", () =>
        {
            action.body.velocity.setTo(0,0);
            action.destroy();
            this.emitter.emit(EventType.ApplyEffects, target);
            this.emitter.emit(EventType.CastComplete);
            this.emitter.removeAllListeners(EventType.CastComplete); /* must remove listeners to
            cast complete because there is only one instance of each spell via the spell database,
            which is used by everyone in the game.  Maybe this should be rethought? */
        });
    }
}

export class LimitBurst extends Action{

    effects: Effect[] = [];
    elementType: ElementType;

    constructor(name: string, value: number, actionType: ActionType, effectTypes: EffectType[], elementType: ElementType, imageKey: string, imageFrames: number){
        super(name, actionType, imageKey, imageFrames);
        this.value = value;
        this.elementType = elementType;

        effectTypes.forEach(effectType => {
            this.effects.push(new Effect(this.name, this.value, effectType, elementType));
        })

        this.emitter.on(EventType.ApplyEffects, this.addEffects, this);
    }

    addEffects(party: BattleParty | EnemyParty)
    {
        party.group.forEach(member => {

            this.effects.forEach(effect => {
                effect.addEffect(member);
            });
        });
    }
}

