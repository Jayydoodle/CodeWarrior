import { Spell, BlackMagic, WhiteMagic } from "./Spell";
import { ElementType, BlackMagicLevel, EffectType, WhiteMagicLevel, Value } from "../../utility/Enumeration";


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

        this.add(new BlackMagic("earth1", ElementType.Earth, BlackMagicLevel.I, Value.MPCostBeginner, "earth_spell_1", 100));
        this.add(new BlackMagic("earth2", ElementType.Earth, BlackMagicLevel.II, Value.MPCostIntermediate, "earth_spell_2", 100));
        //this.add(new BlackMagic("earth3", ElementType.Earth, SpellLevel.III, Value.MPCostAdvanced, "earth_spell_3", 100));

        

        this.add(new BlackMagic("dark1", ElementType.Dark, BlackMagicLevel.I, Value.MPCostBeginner, "dark_spell_1", 100));
        this.add(new BlackMagic("dark2", ElementType.Dark, BlackMagicLevel.II, Value.MPCostIntermediate, "dark_spell_2", 100));
        this.add(new BlackMagic("dark3", ElementType.Dark, BlackMagicLevel.III, Value.MPCostAdvanced, "dark_spell_3", 100));


        this.add(new BlackMagic("fire1", ElementType.Fire, BlackMagicLevel.I, Value.MPCostBeginner, "fire_spell_1", 100));
        //this.add(new BlackMagic("fire2", ElementType.Fire, SpellLevel.II, Value.MPCostIntermediate, "fire_spell_2", 100));
        //this.add(new BlackMagic("fire3", ElementType.Fire, SpellLevel.III, Value.MPCostAdvanced "fire_spell_3", 100));


        this.add(new BlackMagic("ice1", ElementType.Ice, BlackMagicLevel.I, Value.MPCostBeginner, "ice_spell_1", 100));
        this.add(new BlackMagic("ice2", ElementType.Ice, BlackMagicLevel.II, Value.MPCostIntermediate, "ice_spell_2", 100));
        this.add(new BlackMagic("ice3", ElementType.Ice, BlackMagicLevel.III, Value.MPCostAdvanced, "ice_spell_3", 100));

       
        this.add(new BlackMagic("lightning1", ElementType.Lightning, BlackMagicLevel.I, Value.MPCostBeginner, "lightning_spell_1", 100));
        this.add(new BlackMagic("lightning2", ElementType.Lightning, BlackMagicLevel.II, Value.MPCostIntermediate, "lightning_spell_2a", 100));
        this.add(new BlackMagic("lightning3", ElementType.Lightning, BlackMagicLevel.III, Value.MPCostAdvanced, "lightning_spell_2b", 100));

        
        this.add(new BlackMagic("water1", ElementType.Water, BlackMagicLevel.I, Value.MPCostBeginner, "water_spell_1", 100));
        this.add(new BlackMagic("water2", ElementType.Water, BlackMagicLevel.II, Value.MPCostIntermediate, "water_spell_2", 100));
        //this.add(new BlackMagic("water3", ElementType.Water, SpellLevel.III, Value.MPCostAdvanced "water_spell_3", 100));


        this.add(new BlackMagic("wind1", ElementType.Wind, BlackMagicLevel.I, Value.MPCostBeginner, "wind_spell_1", 100));
        this.add(new BlackMagic("wind2", ElementType.Wind, BlackMagicLevel.II, Value.MPCostIntermediate, "wind_spell_2", 100));
        //this.add(new BlackMagic("wind3", ElementType.Wind, SpellLevel.III, Value.MPCostAdvanced "wind_spell_3", 100));


    //#endregion

    //#region: White Magic

        this.add(new WhiteMagic("cure1", EffectType.Restoration, WhiteMagicLevel.I, Value.MPCostBeginner, "cure_spell_1", 100));
        this.add(new WhiteMagic("cure2", EffectType.Restoration, WhiteMagicLevel.II, Value.MPCostIntermediate, "cure_spell_2", 100));
        this.add(new WhiteMagic("cure3", EffectType.Restoration, WhiteMagicLevel.III, Value.MPCostAdvanced, "cure_spell_3", 100));
    

        this.add(new WhiteMagic("protect1", EffectType.BuffDefense, WhiteMagicLevel.I, Value.MPCostBeginner, "protect_spell_1", 100));
        this.add(new WhiteMagic("protect2", EffectType.BuffDefense, WhiteMagicLevel.II, Value.MPCostIntermediate, "protect_spell_2", 100));
        //this.add(new WhiteMagic("protect3", EffectType.BuffDefense, WhiteMagicLevel.III, Value.MPCostAdvanced, "protect_spell_3", 100));
    

        /*let shell1:WhiteMagic = new WhiteMagic("shell1", EffectType.BuffMagicDefense, WhiteMagicLevel.I, Value.MPCostBeginner, "shell_spell_1", 100);
        let shell2:WhiteMagic = new WhiteMagic("shell2", EffectType.BuffMagicDefense, WhiteMagicLevel.II, Value.MPCostIntermediate, "shell_spell_2", 100);
        let shell3:WhiteMagic = new WhiteMagic("shell3", EffectType.BuffMagicDefense, WhiteMagicLevel.III, Value.MPCostAdvanced, "shell_spell_3", 100);
    
        this.add(shell1);
        this.add(shell2);
        this.add(shell3);*/

        this.add(new WhiteMagic("remedy", EffectType.CureStatusEffects, 0, Value.MPCostIntermediate, "remedy_spell", 100));
        this.add(new WhiteMagic("raise", EffectType.Revival, 0, Value.MPCostAdvanced, "revive_spell", 100));


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
        this.add(new BlackMagic("earth", ElementType.Earth, BlackMagicLevel.I, Value.MPCostBeginner, "earth_spell_1", 100));
        this.add(new BlackMagic("dark", ElementType.Dark, BlackMagicLevel.I, Value.MPCostBeginner, "dark_spell_3", 100));
        this.add(new BlackMagic("fire", ElementType.Fire, BlackMagicLevel.I, Value.MPCostBeginner, "fire_spell_1", 100));
        this.add(new BlackMagic("ice", ElementType.Ice, BlackMagicLevel.I, Value.MPCostBeginner, "ice_spell_1", 100));
        this.add(new BlackMagic("lightning", ElementType.Lightning, BlackMagicLevel.I, Value.MPCostBeginner, "lightning_spell_1", 100));
        this.add(new BlackMagic("water", ElementType.Water, BlackMagicLevel.I, Value.MPCostBeginner, "water_spell_2", 100));
        this.add(new BlackMagic("wind", ElementType.Wind, BlackMagicLevel.I, Value.MPCostBeginner, "wind_spell_1", 100));


        this.add(new WhiteMagic("cure", EffectType.Restoration, WhiteMagicLevel.I, Value.MPCostBeginner, "cure_spell_3", 100));
        this.add(new WhiteMagic("protect", EffectType.BuffDefense, WhiteMagicLevel.I, Value.MPCostBeginner, "protect_spell_2", 100));
        this.add(new WhiteMagic("remedy", EffectType.CureStatusEffects, 0, Value.MPCostIntermediate, "remedy_spell", 100));
        this.add(new WhiteMagic("raise", EffectType.Revival, 0, Value.MPCostAdvanced, "revive_spell", 100));

    }

}