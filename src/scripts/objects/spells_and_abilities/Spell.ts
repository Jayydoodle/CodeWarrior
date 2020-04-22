import { ActionType, EventType, Depth, ElementType, EffectType, Value } from "../../utility/Enumeration";
import { Character } from "../characters/Hero";
import { Effect } from "./Effect";

export class Action{

    name: string;
    actionType: ActionType;
    imageKey: string;
    imageFrames: number;
    frameRate: number = Value.SpellFrameRate;
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

    update()
    {

    }

    playAnimation(scene: Phaser.Scene, target:Character)
    {
        let action: Phaser.Physics.Arcade.Sprite = new Phaser.Physics.Arcade.Sprite(scene, target.x, target.y, this.imageKey);

        scene.add.existing(action);
        scene.physics.add.existing(action);
        action.setDepth(Depth.Effect);
        action.setScale(2);
        //action.setDisplaySize(scene.game.canvas.width / 2, scene.game.canvas.height / 2);
        //scene.physics.moveToObject(action, target, 2000);

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
            this.emitter.emit(EventType.CastComplete);
            this.emitter.emit(EventType.ApplyEffects, target)
            this.emitter.removeAllListeners(EventType.CastComplete);
        });
    }
}

export class Spell extends Action{

    constructor(name: string, actionType: ActionType, value: number, mpCost: number, imageKey: string, imageFrames: number){
        super(name, actionType, imageKey, imageFrames)
        this.value = value;
        this.mpCost = mpCost;
    }
}

export class BlackMagic extends Spell{

    attackPower: number
    element: ElementType;

    constructor(name: string, element: ElementType, attackPower: number, mpCost: number, imageKey: string, imageFrames: number){
        
        super(name, ActionType.Offense, attackPower, mpCost, imageKey, imageFrames);

        this.attackPower = attackPower;
        this.element = element;
    }
}

export class WhiteMagic extends Spell{

    effect: Effect;

    constructor(name: string, effectType: EffectType, value: number, mpCost: number, imageKey: string, imageFrames: number)
    {
        super(name, ActionType.Recovery, value, mpCost, imageKey, imageFrames)

        this.effect = new Effect(effectType, value);
        this.emitter.on(EventType.ApplyEffects, this.addEffect, this);
    }

    addEffect(target: Character)
    {
        this.effect.addEffect(target);
    }
}