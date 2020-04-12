import { Enemy } from "../objects/characters/Hero"
import { GridPosition } from "./Enumeration"

export type AlignConfig = {

    scene: Phaser.Scene,
    rows: number,
    cols: number,
    height: number,
    width: number,
    showNumbers: boolean
}

export type BattleConfig = 
{
    backgroundAssetKey: string,
    enemyName: string,
    enemyAssetKey: string,
    enemyHP: number,
    enemyPosition: GridPosition,
    rangerPosition: GridPosition,
    warriorPosition: GridPosition,
    magePosition: GridPosition
}