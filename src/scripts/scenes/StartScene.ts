import { AssetDictionary } from '../utility/AssetDictionary';
import { Background } from '../objects/world_space/background';
import { Hero } from '../objects/characters/Hero';
import { BattleParty } from '../objects/characters/Party';
import { EventType, HeroType, GridPosition, Value, SceneType } from '../utility/Enumeration';
import { GameState } from '../utility/GameState';
import { ItemDatabase } from '../objects/items/ItemDatabase';
import { Weapon, Armor } from '../objects/items/Item';
import { SpellDatabase } from '../objects/spells_and_abilities/SpellDatabase';

export default class StartScene extends Phaser.Scene {

  private assetDictionary: AssetDictionary;
  private itemDatabase: ItemDatabase;
  private spellDatabase: SpellDatabase;
  private gameState: GameState;
  private sceneType: SceneType = SceneType.WorldScene;

  private background: Background;
  private backgroundMusic: Phaser.Sound.BaseSound;
  private infoText: string;
  private infoTextSet: boolean = false;

  constructor() {
    super({ key: 'StartScene' });
    this.assetDictionary = new AssetDictionary();
    this.itemDatabase = new ItemDatabase();
    this.spellDatabase = new SpellDatabase();
  }

  create() {

    this.background = new Background(this.findAsset("start_scene").key, this, 0, 0);
    this.backgroundMusic = this.sound.add("start_music", { loop: true });
    this.backgroundMusic.play();

    this.scene.get('UIScene').events.on(EventType.BtnApplyClicked, this.evaluateCode, this);

    this.scene.launch('UIScene', {parentScene: this.scene.key, sceneType: this.sceneType});

    this.infoText = this.cache.text.get(this.findAsset("start_text").key);

    this.add.text(100, 100, "Code Warrior", { color:'#000000', font: '80pt Aniron'} );
  }

  update(){

      if(!this.infoTextSet)
      {
        this.updateInfoText(this.infoText);
      }
  }

  protected updateInfoText(text)
  {
    this.events.emit(EventType.InfoTextUpdated, text);
    this.infoTextSet = true;
  }

  createParty(warriorName: string, mageName: string, rangerName: string)
  {
      let warrior = new Hero(0, 0, this, {
        name: warriorName,
        heroType: HeroType.Melee,
        health: Value.StartingPlayerHealth,
        weapon: this.findItem("wooden_sword") as Weapon,
        armor: this.findItem("warrior_clothes") as Armor,
        imageKey: "",
        battleImageKey: this.findAsset("warrior_battle").key,
        deathImageKey: this.findAsset("warrior_death").key,
        castImageKey: this.findAsset("warrior_cast").key,
        battleAnimationFrames: this.findAsset("warrior_battle").frames,
        battleAnimationFrameRate: 10,
        gridPosition: GridPosition.playerMiddle
      });

      let mage = new Hero(0, 0, this, {
        name: mageName,
        heroType: HeroType.Magic,
        health: Value.StartingPlayerHealth,
        weapon: this.findItem("wooden_staff") as Weapon,
        armor: this.findItem("mage_clothes") as Armor,
        imageKey: "",
        battleImageKey: this.findAsset("mage_battle").key,
        deathImageKey: this.findAsset("mage_death").key,
        castImageKey: this.findAsset("mage_cast").key,
        battleAnimationFrames: this.findAsset("mage_battle").frames,
        battleAnimationFrameRate: 13,
        gridPosition: GridPosition.playerBottom
      });

      let ranger = new Hero(0, 0, this, {
        name: rangerName,
        heroType: HeroType.Ranged,
        health: Value.StartingPlayerHealth,
        weapon: this.findItem("wooden_bow") as Weapon,
        armor: this.findItem("ranger_clothes") as Armor,
        imageKey: "",
        battleImageKey: this.findAsset("ranger_battle").key,
        deathImageKey: this.findAsset("ranger_death").key,
        castImageKey: this.findAsset("ranger_cast").key,
        battleAnimationFrames: this.findAsset("ranger_battle").frames,
        battleAnimationFrameRate: 13,
        gridPosition: GridPosition.playerTop
      });

      let party = new BattleParty(warrior, mage, ranger);

      party.group.forEach(member => {
          this.spellDatabase.spells.forEach(spell =>
          {
              member.learn(spell);
          });
      });
      this.gameState = new GameState(party);

      this.scene.get('UIScene').children.destroy();
      this.scene.get('UIScene').events.shutdown();
      this.background.destroy();
      this.backgroundMusic.destroy();

      this.scene.start('BattleEarthScene', {gameState: this.gameState});
  }

  evaluateCode(code)
  {
      try {
          eval(code); 
      } catch (e) {
          
        alert("There is an error with your code, please try again.");
        return;
      }
  }

  findAsset(key: string)
  {
    return this.assetDictionary.findAssetByKey(key);
  }

  findItem(key: string)
  {
    return this.itemDatabase.findItemByKey(key);
  }

  setInfoText()
  {

  }
}
