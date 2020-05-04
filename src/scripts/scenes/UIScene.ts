import { CodeEditor } from "../utility/CodeEditor";
import { Button } from "../utility/Button";
import * as Enum from "../utility/Enumeration";
import { TextContainer } from "../utility/TextContainer";

export default class UIScene extends Phaser.Scene {
  
  private btnReset: Button;
  private btnApply: Button;
  private infoText: TextContainer;
  private codeEditor: CodeEditor;

  private parentScene: string;
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
    this.infoText =  new TextContainer("book");
    this.btnReset = new Button("reset", this.codeEditor.clear, this.codeEditor);
    this.btnApply = new Button("apply", this.onBtnApplyClicked, this);

    this.scene.get(this.parentScene).events.on(Enum.EventType.InfoTextUpdated, this.updateInfotext, this);

    if(this.isBattleScene)
    {
      //this.codeEditor.editor.setValue(this.cache.text.get("test"));
    }
    else{
      this.codeEditor.editor.setValue("this.createParty(\"warrior\", \"mage\", \"ranger\");");
    }

  }

  updateInfotext(text){

    this.infoText.updateText(text);
  }

  onBtnApplyClicked(){

    this.events.emit(Enum.EventType.BtnApplyClicked, this.codeEditor.getValue());
    
  }

  resetCodeEditor()
  {
    this.codeEditor.clear();
  }
}
