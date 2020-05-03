import { Item, Weapon, Armor } from "./Item";
import { WeaponType, ElementType, ArmorType } from "../../utility/Enumeration";

export class ItemDatabase{

    items: Map<string, Item>;

    constructor(){
        
        this.items = new Map<string, Item>();

        //#region: Items

        //#endregion

        //#region: Weapons

            //#region: Melee 
            this.add(new Weapon("Wooden Sword", WeaponType.Melee, ElementType.None, 100, "wooden_sword", "sword_hit", 15));
            //#endregion

            //#region: Magic 
            this.add(new Weapon("Wooden Staff", WeaponType.Magic, ElementType.None, 100, "wooden_staff", "staff_hit", 15));
            //#endregion

            //#region: Ranged 
            this.add(new Weapon("Wooden Bow", WeaponType.Ranged, ElementType.None, 100, "wooden_bow", "bow_hit", 35));
            //#endregion

        //#endregion

        //#region: Armor

            //#region: Heavy
            this.add(new Armor("Warrior Clothes", ArmorType.Heavy, 20, ElementType.None, ElementType.None, "warrior_clothes"));
            //#endregion

            //#region: Robe
            this.add(new Armor("Mage Clothes", ArmorType.Robe, 20, ElementType.None, ElementType.None, "mage_clothes"));
            //#endregion

            //#region: Light
            this.add(new Armor("Ranger Clothes", ArmorType.Robe, 20, ElementType.None, ElementType.None, "ranger_clothes"));
            //#endregion

        //#endregion

      
    }
    add(item: Item)
    {
        this.items.set(item.imageKey, item);
    }

    findItemByKey(key: string)
    {
        let item: Item | undefined = this.items.get(key.toLowerCase());

        if(item == undefined)
            throw "Item "+ "'" +key+ "'" +" Undefined";
        else
            return item;
    }
}