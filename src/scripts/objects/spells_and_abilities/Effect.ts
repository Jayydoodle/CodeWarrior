import { EffectType, EventType } from "../../utility/Enumeration";
import { Character } from "../characters/Hero";

export class Effect{

    effectType: EffectType;
    element: Element;
    duration: number;
    value: number;

    constructor(value: number, effectType: EffectType, element?: Number)
    {
        this.effectType = effectType;
        this.value = value;
    }

    addEffect(target: Character)
    {
        switch(this.effectType)
        {
            case EffectType.Damage:
                this.damage(target);
                break;
            case EffectType.Restoration:
                this.heal(target);
                break;
            case EffectType.Revival:
                this.revive(target);
            default:
                break;
        }
    }

    damage(target: Character)
    {
        target.takeDamage(this.value);
        let message = target.name + " took " + this.value + " damage ";
        target.emitEffectApplied(message);
    }

    heal(target: Character)
    {
        target.recoverHealth(this.value);
        let message = target.name + " recovered " + this.value + " HP ";
        target.emitEffectApplied(message);
    }

    revive(target: Character)
    {
        if(!target.isAlive)
        {
            target.revive();
            let message = target.name + " was brought back to life!";
            target.emitEffectApplied(message);
            target.emitRevived();
        }
    }
}