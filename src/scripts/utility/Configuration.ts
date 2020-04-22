import { EnemyConfig } from "../objects/characters/Hero"

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
    enemyConfigs: EnemyConfig[]
}

export type HudConfig = {

    warriorName: string,
    mageName: string,
    rangerName: string
}