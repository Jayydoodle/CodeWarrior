import { Character } from "../objects/characters/Hero";
import { Spell } from "../objects/spells_and_abilities/Spell";

export class DamageCalculator{

    constructor()
    {

    }

    private static CalculateAttackDamage(attacker: Character, target: Character) : number
    {

        let damage = attacker.getBaseAttack() - target.getBaseDefense();
        target.takeDamage(damage);

        return damage;
    }

    private static CalculateSpellDamage(attacker: Character, target: Character, spell: Spell) : number
    {

        let damage = spell.value;
        target.takeDamage(damage);

        return damage;
    }

    static CalculateDamage(attacker: Character, target: Character, spell?: Spell): number
    {

        let damage: number;

        if(spell)
            damage = this.CalculateSpellDamage(attacker, target, spell);
        else
            damage = this.CalculateAttackDamage(attacker, target);

        return damage;
    }
}