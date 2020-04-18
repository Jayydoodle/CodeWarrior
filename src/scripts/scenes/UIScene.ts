import { CodeEditor } from "../utility/CodeEditor";
import { Button } from "../utility/Button";
import * as Enum from "../utility/Enumeration";
import { TextContainer } from "../utility/TextContainer";

export default class UIScene extends Phaser.Scene {
  
  private textDisplay: Phaser.GameObjects.Text;
  private btnReset: Button;
  private btnApply: Button;
  private infoText: TextContainer;
  private codeEditor: CodeEditor;

  private parentScene: string;
  private isPlayerTurn: boolean;
  private isBattleScene: boolean;

  constructor() {
    super({ key: 'UIScene' });
    this.isBattleScene = false;
  }

  init(data)
  {
    this.scene.bringToTop();
    this.parentScene = data.parentScene;
    this.isBattleScene = data.sceneType == Enum.SceneType.BattleScene;
  }

  create() {
    this.codeEditor = new CodeEditor();
    this.textDisplay = this.add.text(20,20,"Jason",{ color:'#ffffff', font: '50pt Arial'});
    this.infoText =  new TextContainer("book");
    this.btnReset = new Button("reset", this.codeEditor.clear, this.codeEditor);
    this.btnApply = new Button("apply", this.onBtnApplyClicked, this);

    this.scene.get(this.parentScene).events.on(Enum.EventType.infoTextUpdated, this.updateInfotext, this);

    if(this.isBattleScene)
    {
      this.scene.get(this.parentScene).events.on(Enum.EventType.turnEnded, this.togglePlayerTurn, this);
      this.scene.get(this.parentScene).events.on(Enum.EventType.correctAnswer, this.resetCodeEditor, this);
      this.isPlayerTurn = true;
      this.codeEditor.editor.setValue("this.attack(\"Earth\");");
    }
    else
      this.codeEditor.editor.setValue("this.createParty();");

    this.events.emit(Enum.EventType.uiLoaded);
  }

  update() {
    this.textDisplay.text = this.codeEditor.getValue();
  }

  updateInfotext(text){

    this.infoText.updateText(text);
  }

  onBtnApplyClicked(){

    if(!this.isBattleScene)
    {
      this.events.emit(Enum.EventType.btnApplyClicked, this.codeEditor.getValue());
    }
    else if(this.isPlayerTurn)
    {
      //this.isPlayerTurn = false;
      this.events.emit(Enum.EventType.btnApplyClicked, this.codeEditor.getValue());
    }
  }

  resetCodeEditor()
  {
    this.codeEditor.clear();
  }

  togglePlayerTurn(){
    this.isPlayerTurn = true;
  }
}
