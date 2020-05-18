import { CodeEditor } from "../utility/CodeEditor";
import { Button } from "../utility/Button";
import * as Enum from "../utility/Enumeration";
import { TextContainer } from "../utility/TextContainer";
import { Modal } from "../utility/Modal";

export default class UIScene extends Phaser.Scene {
  
  private btnReset: Button;
  private btnApply: Button;
  private modal: Modal;
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
    this.codeEditor = new CodeEditor(this.cache.text.get("autocomplete_list"));
    this.infoText =  new TextContainer("book");
    this.btnReset = new Button("reset", this.codeEditor.clear, this.codeEditor);
    this.btnApply = new Button("apply", this.onBtnApplyClicked, this);

    this.scene.get(this.parentScene).events.on(Enum.EventType.InfoTextUpdated, this.updateInfotext, this);
    this.scene.get(this.parentScene).events.on(Enum.EventType.CodeEditorUpdated, this.updateCodeEditor, this);
    this.scene.get(this.parentScene).events.on(Enum.EventType.AutoCompleteUpdate, this.updateAutoComplete, this);

    if(this.isBattleScene)
    {
      this.updateCodeEditor(this.cache.text.get("battle_template"));
    }
    else{
      
      this.modal = new Modal("modal", "modalBackground");
      this.modal.addbutton("btnEasy", this.onBtnEasyClicked, this);
      this.modal.addbutton("btnHard", this.onBtnHardClicked, this);

      this.scene.get(this.parentScene).events.on(Enum.EventType.ModalToggle, this.modal.toggleVisibility, this.modal);

      this.updateCodeEditor("this.tutorial();");
    }

  }

  updateInfotext(text){

    this.infoText.updateText(text);
  }

  updateCodeEditor(text)
  {
    this.codeEditor.editor.setValue(text);
  }

  updateAutoComplete(wordList){

    this.codeEditor.addToAutoCompleteList(wordList);
  }

  onBtnApplyClicked(){

    this.events.emit(Enum.EventType.BtnApplyClicked, this.codeEditor.getValue());
    
  }

  onBtnEasyClicked(){
    this.events.emit(Enum.EventType.BtnModeClicked, Enum.GameMode.Easy);
  }

  onBtnHardClicked(){
    this.events.emit(Enum.EventType.BtnModeClicked, Enum.GameMode.Hard);
  }

  resetCodeEditor()
  {
    this.codeEditor.clear();
  }
}
