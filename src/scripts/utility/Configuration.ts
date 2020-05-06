import { EnemyConfig } from "../objects/characters/Hero"

export type AlignConfig = {

    scene: Phaser.Scene,
    rows: number,
    cols: number,
    height: number,
    width: number,
    showGrid: boolean
}

export type AudioObject = {

    soundObject: Phaser.Sound.BaseSound,
    config: AudioConfig
}

export type AudioConfig = {

    key: string,
    volume?: number,
    fadeRate?: number
}

export type BattleConfig = 
{
    backgroundAssetKey: string,
    enemyConfigs: EnemyConfig[]
}

export type HudConfig = {

    warriorName: string,
    warriorImageKey: string,
    mageName: string,
    mageImageKey: string,
    rangerName: string,
    rangerImageKey: string
}