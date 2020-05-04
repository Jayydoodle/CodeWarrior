import { EffectType, EventType, ElementType, Value, EffectIconIndex } from "../../utility/Enumeration";
import { Character } from "../characters/Hero";

export class Effect{

    effectType: EffectType;
    effectIconIndex: EffectIconIndex = 0;
    element: ElementType;
    duration: number;
    value: number;
    name: string;
    message: string;

    constructor(name: string, value: number, effectType: EffectType, element?: ElementType)
    {
        this.name = name;
        this.effectType = effectType;
        this.value = value;
        element != null ? this.element = element : null;
    }

    addEffect(target: Character)
    {
        switch(this.effectType)
        {
            case EffectType.Ailment:
                this.applyAilment(target);
                break;
            case EffectType.CureStatusEffects:
                this.cureStatusEffects(target);
                break;
            case EffectType.Damage:
                this.damage(target);
                break;
            case EffectType.DamageOverTime:
                this.applyDamageOverTime(target);
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

    handleEffect(target: Character)
    {
        switch(this.effectType)
        {
            case EffectType.Ailment:
                this.ailment(target);
                break;
            case EffectType.DamageOverTime:
                this.damageOverTime(target);
                break;
        }
    }

    applyAilment(target: Character)
    {
        this.duration = Value.EffectDuration;
        
        if(this.name == "confuse")
        {
            this.message = " is confused!" + " Turns Remaining: " + this.duration;
            target.isConfused = true;
            target.isAsleep = !target.isConfused;

            this.effectIconIndex = EffectIconIndex.Confuse;
        }
        else if(this.name == "sleep")
        {
            this.message = " is asleep" + " Turns Remaining: " + this.duration;
            target.isAsleep = true;
            target.isConfused = !target.isAsleep

            this.effectIconIndex = EffectIconIndex.Sleep;
        }

        target.addStatusEffect(EffectType.Ailment, this);
        target.emitEffectApplied(target.name + this.message);
    }

    removeAilment(target: Character)
    {
        if(this.name == "confuse")
        {
            target.isConfused = false;
        }
        else if(this.name == "sleep")
        {
            target.isAsleep = false;
        }
    }

    applyDamageOverTime(target: Character)
    {
        if(this.name == "poison")
        {
            this.message = " is poisoned!";

            this.effectIconIndex = EffectIconIndex.Posion;

        // move these in the brackets temporarily to prevent discharge effect
        this.duration = Value.EffectDuration;
        target.addStatusEffect(EffectType.DamageOverTime, this);
        target.emitEffectApplied(target.name + this.message);
        }

    }

    ailment(target: Character)
    {
        this.duration--;
    }

    cureStatusEffects(target: Character)
    {
        target.removeStatusEffects();

        let message = target.name + "'s status effects were cured!";
        target.emitEffectApplied(message);
    }

    damageOverTime(target: Character)
    {
        this.duration--;
        let message = target.name + this.message + " Turns Remaining: " + this.duration;
        target.emitEffectApplied(message);

        this.damage(target);
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