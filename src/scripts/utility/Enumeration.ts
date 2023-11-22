//#region Game

//#region Game
export enum ActionType {
    Offense,
    Defense,
    Special
}

export enum ArmorType{

    Heavy,
    Light,
    Robe
}

export enum AttackDelay
{
    none = 0,
    veryFast = 400,
    fast = 800,
    slow = 1200,
    verySlow = 1600
}

export enum AttackType
{
    Ability,
    Cast,
    LimitBurst,
    None,
    Regular
}

export enum HeroType{
    
    Magic = "mage",
    Melee = "warrior",
    Ranged = "ranger"
}

export enum BlackMagicLevel{

    I = 100,
    II = 200,
    III = 300
}

export enum CharacterType
{
    enemy,
    player
}

export enum ElementType
{
    Dark,
    Earth,
    Fire,
    Ice,
    Light,
    Lightning,
    None,
    Water,
    Wind
}

export enum EffectType
{
    Ailment,
    AutoRevive,
    BuffDamage,
    BuffDefense,
    BuffMagicDamage,
    BuffMagicDefense,
    CureStatusEffects,
    Damage,
    DamageOverTime,
    DebuffDamage,
    DebuffDefense,
    MagicRecoveryOverTime,
    MagicRestoration,
    None,
    RecoveryOverTime,
    Restoration,
    Revival
}

export enum EffectIconIndex
{
    Posion = 2,
    Confuse = 6,
    Sleep = 8,
    Curse = 10,
}

export enum ItemType{

    Weapon,
    Armor
}

export enum Value{

    CastEffectOffset = 20,
    CastFrames = 5,
    DeathFrames = 6,
    EffectDuration = 4,
    MaxEnemyMP = 999999,
    MaxTP = 100,
    MPCostBeginner = 10,
    MPCostIntermediate = 25,
    MPCostAdvanced = 50,
    SpellFrames = 100,
    StartingPlayerHealth = 3000,
    StartingPlayerMP = 500,
    TPGainRate = .2
}

export enum WeaponType{

    Melee,
    Ranged,
    Magic
}

export enum WhiteMagicLevel{

    I = 100,
    II = 200,
    III = 300
}


//#endregion

//#region Utility

//#endregion
//#region Utility
export enum AssetType {
    
    BitmapFont,
    Image,
    Sound,
    Sprite,
    Text
}

export enum Depth
{
    background = 0,
    overlay = 1,
    CharacterSprite = 2,
    Attacker = 3,
    Effect = 4,
    Cast = 5,
    GUI = 6
}

export enum EventType
{
    AnimationComplete = "animationComplete",
    AutoCompleteUpdate = "autoCompleteUpdate",
    ApplyEffects = "applyEffects",
    AttackComplete = "attackComplete",
    BattleEnded = 'battleEnded',
    BtnApplyClicked = "btnApplyClicked",
    BtnModeClicked = "btnModeClicked",
    CastComplete = "castComplete",
    CharacterDefeated = "characterDefeated",
    CodeEditorUpdated = "codeEditorUpdated",
    EffectApplied = "effectApplied",
    EffectsUpdated = "effectsUpdated",
    InfoTextUpdated = "infoTextUpdated",
    ModalToggle = "modalToggle",
    PartyDefeated = "partyDefeated",
    Revived = "revived",
    UILoaded = "uiLoaded"
}

export enum FrameRate
{
    Ability = 30,
    Cast = 12,
    Death = 10,
    Mage = 13,
    Ranger = 13,
    Spell = 30,
    Warrior = 10,

}

export enum GameMode
{
    Easy,
    Hard
}

export enum GridPosition
{
    playerTop = 47,
    playerMiddle = 58,
    playerBottom = 69,
    enemyTop = 42,
    enemyMiddle = 51,
    enemyBottom = 60
}

export enum Message
{
    ForNotAllowedError = "Keyword 'for' is not allowed",
    MultipleActionError = "You may only perform one action per turn",
    WhileNotAllowedError = "Keyword 'while' is not allowed",
    SyntaxError = "There is an error with your code, please try again.",
}

export enum ObjectScale
{
    Ability = 2.5,
    Battle = 3.5,
    CastAnimation = 1.5,
    Icon = 0.8,
    Spell = 2,
}

export enum Scene
{
    UIScene = 'UIScene'
}

export enum SceneType
{
    BattleScene,
    WorldScene
}

//#endregion