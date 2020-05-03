import { ActionType, EventType, ElementType, EffectType } from "../../utility/Enumeration";
import { Character } from "../characters/Hero";
import { Effect } from "./Effect";
import { Action } from "./Action";

export class Spell extends Action {

    effectType: EffectType;

    constructor(name: string, actionType: ActionType, effectType: EffectType, value: number, mpCost: number, imageKey: string, imageFrames: number) {
        super(name, actionType, imageKey, imageFrames);
        this.value = value;
        this.mpCost = mpCost;
        this.effectType = effectType;

        this.emitter.on(EventType.ApplyEffects, this.addEffect, this);
    }
    
    addEffect(target: Character) {
        let effect = new Effect(this.name, this.value, this.effectType);
        effect.addEffect(target);
    }
}
export class BlackMagic extends Spell {

    attackPower: number;
    element: ElementType;

    constructor(name: string, element: ElementType, effectType: EffectType, attackPower: number, mpCost: number, imageKey: string, imageFrames: number) {
        super(name, ActionType.Offense, effectType, attackPower, mpCost, imageKey, imageFrames);
        this.attackPower = attackPower;
        this.element = element;
    }

    addEffect(target: Character) {
        
        let effect = new Effect(this.name, this.attackPower, this.effectType, this.element);
        effect.addEffect(target);
    }
}
export class WhiteMagic extends Spell {

    effect: Effect;

    constructor(name: string, effectType: EffectType, value: number, mpCost: number, imageKey: string, imageFrames: number) {
        super(name, ActionType.Defense, effectType, value, mpCost, imageKey, imageFrames);
    }
}
