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
            let woodenSword = new Weapon("Wooden Sword", WeaponType.Melee, ElementType.None, 100, "wooden_sword");
            //#endregion

            //#region: Magic 
            let woodenStaff = new Weapon("Wooden Staff", WeaponType.Magic, ElementType.None, 100, "wooden_staff");
            //#endregion

            //#region: Ranged 
            let woodenBow = new Weapon("Wooden Bow", WeaponType.Ranged, ElementType.None, 100, "wooden_bow");
            //#endregion

        //#endregion

        //#region: Armor

            //#region: Heavy
            let warriorClothes = new Armor("Warrior Clothes", ArmorType.Heavy, 0, ElementType.None, ElementType.None, "warrior_clothes");
            //#endregion

            //#region: Robe

            //#endregion

            //#region: Light

            //#endregion

        //#endregion

        this.add(woodenSword);
        this.add(woodenStaff);
        this.add(woodenBow);
        this.add(warriorClothes);
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