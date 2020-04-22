import { Spell, BlackMagic, WhiteMagic } from "./Spell";
import { ElementType, BlackMagicLevel, EffectType, WhiteMagicLevel } from "../../utility/Enumeration";


export class SpellDatabase{

    spells: Map<string, Spell>;

    constructor(testSpells = true){

        this.spells = new Map<string, Spell>();

        if(testSpells)
        {
            this.testSpells();
            return;
        }

    //#region: Black Magic

        let earth1:BlackMagic = new BlackMagic("earth1", ElementType.Earth, BlackMagicLevel.I, "earth_spell_1", 100);
        let earth2:BlackMagic = new BlackMagic("earth2", ElementType.Earth, BlackMagicLevel.II, "earth_spell_2", 100);
        //let earth3:BlackMagic = new BlackMagic("earth3", ElementType.Earth, SpellLevel.III, "earth_spell_3", 100);

        this.add(earth1);
        this.add(earth2);
        //this.add(earth3);

        let dark1:BlackMagic = new BlackMagic("dark1", ElementType.Dark, BlackMagicLevel.I, "dark_spell_1", 100);
        let dark2:BlackMagic = new BlackMagic("dark2", ElementType.Dark, BlackMagicLevel.II, "dark_spell_2", 100);
        let dark3:BlackMagic = new BlackMagic("dark3", ElementType.Dark, BlackMagicLevel.III, "dark_spell_3", 100);

        this.add(dark1);
        this.add(dark2);
        this.add(dark3);

        let fire1:BlackMagic = new BlackMagic("fire1", ElementType.Fire, BlackMagicLevel.I, "fire_spell_1", 100);
        //let fire2:BlackMagic = new BlackMagic("fire2", ElementType.Fire, SpellLevel.II, "fire_spell_2", 100);
        //let fire3:BlackMagic = new BlackMagic("fire3", ElementType.Fire, SpellLevel.III, "fire_spell_3", 100);

        this.add(fire1);
        //this.add(fire2);
        //this.add(fire3);

        let ice1:BlackMagic = new BlackMagic("ice1", ElementType.Ice, BlackMagicLevel.I, "ice_spell_1", 100);
        let ice2:BlackMagic = new BlackMagic("ice2", ElementType.Ice, BlackMagicLevel.II, "ice_spell_2", 100);
        let ice3:BlackMagic = new BlackMagic("ice3", ElementType.Ice, BlackMagicLevel.III, "ice_spell_3", 100);

        this.add(ice1);
        this.add(ice2);
        this.add(ice3);

        let lightning1:BlackMagic = new BlackMagic("lightning1", ElementType.Lightning, BlackMagicLevel.I, "lightning_spell_1", 100);
        let lightning2:BlackMagic = new BlackMagic("lightning2", ElementType.Lightning, BlackMagicLevel.II, "lightning_spell_2a", 100);
        let lightning3:BlackMagic = new BlackMagic("lightning3", ElementType.Lightning, BlackMagicLevel.III, "lightning_spell_2b", 100);

        this.add(lightning1);
        this.add(lightning2);
        this.add(lightning3);
        
        let water1:BlackMagic = new BlackMagic("water1", ElementType.Water, BlackMagicLevel.I, "water_spell_1", 100);
        let water2:BlackMagic = new BlackMagic("water2", ElementType.Water, BlackMagicLevel.II, "water_spell_2", 100);
        //let water3:BlackMagic = new BlackMagic("water3", ElementType.Water, SpellLevel.III, "water_spell_3", 100);

        this.add(water1);
        this.add(water2);
        //this.add(water3);

        let wind1:BlackMagic = new BlackMagic("wind1", ElementType.Wind, BlackMagicLevel.I, "wind_spell_1", 100);
        let wind2:BlackMagic = new BlackMagic("wind2", ElementType.Wind, BlackMagicLevel.II, "wind_spell_2", 100);
        //let wind3:BlackMagic = new BlackMagic("wind3", ElementType.Wind, SpellLevel.III, "wind_spell_3", 100);

        this.add(wind1);
        this.add(wind2);
        //this.add(wind3);

    //#endregion

    //#region: White Magic

        let cure1:WhiteMagic = new WhiteMagic("cure1", EffectType.Restoration, WhiteMagicLevel.I, "cure_spell_1", 100);
        let cure2:WhiteMagic = new WhiteMagic("cure2", EffectType.Restoration, WhiteMagicLevel.II, "cure_spell_2", 100);
        let cure3:WhiteMagic = new WhiteMagic("cure3", EffectType.Restoration, WhiteMagicLevel.III, "cure_spell_3", 100);
    
        this.add(cure1);
        this.add(cure2);
        this.add(cure3);

        let protect1:WhiteMagic = new WhiteMagic("protect1", EffectType.BuffDefense, WhiteMagicLevel.I, "protect_spell_1", 100);
        let protect2:WhiteMagic = new WhiteMagic("protect2", EffectType.BuffDefense, WhiteMagicLevel.II, "protect_spell_2", 100);
        //let protect3:WhiteMagic = new WhiteMagic("protect3", EffectType.BuffDefense, WhiteMagicLevel.III, "protect_spell_3", 100);
    
        this.add(protect1);
        this.add(protect2);
        //this.add(protect3);

        /*let shell1:WhiteMagic = new WhiteMagic("shell1", EffectType.BuffMagicDefense, WhiteMagicLevel.I, "shell_spell_1", 100);
        let shell2:WhiteMagic = new WhiteMagic("shell2", EffectType.BuffMagicDefense, WhiteMagicLevel.II, "shell_spell_2", 100);
        let shell3:WhiteMagic = new WhiteMagic("shell3", EffectType.BuffMagicDefense, WhiteMagicLevel.III, "shell_spell_3", 100);
    
        this.add(shell1);
        this.add(shell2);
        this.add(shell3);*/

        let remedy:WhiteMagic = new WhiteMagic("remedy", EffectType.CureStatusEffects, 0, "remedy_spell", 100);
        let revive:WhiteMagic = new WhiteMagic("raise", EffectType.Revive, 0, "revive_spell", 100);

        this.add(revive);
        this.add(remedy);

    //#endregion
    }

    add(spell: Spell)
    {
        this.spells.set(spell.name, spell);
    }

    findSpellByName(key: string)
    {
        let spell: Spell | undefined = this.spells.get(key.toLowerCase());

        if(spell == undefined)
            throw "Spell "+ "'" +key+ "'" +" Undefined";
        else
            return spell;
    }

    testSpells()
    {
        let earth:BlackMagic = new BlackMagic("earth", ElementType.Earth, BlackMagicLevel.I, "earth_spell_1", 100);
        let dark:BlackMagic = new BlackMagic("dark", ElementType.Dark, BlackMagicLevel.I, "dark_spell_3", 100);
        let fire:BlackMagic = new BlackMagic("fire", ElementType.Fire, BlackMagicLevel.I, "fire_spell_1", 100);
        let ice:BlackMagic = new BlackMagic("ice", ElementType.Ice, BlackMagicLevel.I, "ice_spell_1", 100);
        let lightning:BlackMagic = new BlackMagic("lightning", ElementType.Lightning, BlackMagicLevel.I, "lightning_spell_1", 100);
        let water:BlackMagic = new BlackMagic("water", ElementType.Water, BlackMagicLevel.I, "water_spell_2", 100);
        let wind:BlackMagic = new BlackMagic("wind", ElementType.Wind, BlackMagicLevel.I, "wind_spell_2", 100);

        this.add(earth);
        this.add(dark);
        this.add(fire);
        this.add(ice);
        this.add(lightning);
        this.add(water);
        this.add(wind);

        let cure:WhiteMagic = new WhiteMagic("cure", EffectType.Restoration, WhiteMagicLevel.I, "cure_spell_3", 100);
        let protect:WhiteMagic = new WhiteMagic("protect", EffectType.BuffDefense, WhiteMagicLevel.I, "protect_spell_2", 100);
        let remedy:WhiteMagic = new WhiteMagic("remedy", EffectType.CureStatusEffects, 0, "remedy_spell", 100);
        let revive:WhiteMagic = new WhiteMagic("raise", EffectType.Revive, 0, "revive_spell", 100);

        this.add(cure);
        this.add(protect);
        this.add(revive);
        this.add(remedy);
    }

}