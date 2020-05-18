import CodeMirror from '../../../node_modules/codemirror';
import '../../../node_modules/codemirror/lib/codemirror.js';
import '../../../node_modules/codemirror/addon/edit/closebrackets.js';
import '../../../node_modules/codemirror/mode/javascript/javascript.js';
import '../../../node_modules/codemirror/addon/hint/show-hint.js';
import '../../../node_modules/codemirror/addon/hint/javascript-hint.js';
require('../../../node_modules/codemirror/lib/codemirror.css');
require('../../../node_modules/codemirror/addon/hint/show-hint.css');
require('../../../node_modules/codemirror/theme/lucario.css');

export class CodeEditor
{
   public editor: any;
   public autoCompleteList: string[];
   public cm: CodeMirror;

   constructor(wordList: string){

      this.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
            tabSize: 4,
            lineNumbers: true,
            indentUnit: 4,
            indentWithTabs: true,
            mode: "text/typescript",
            theme: "lucario",
            autoCloseBrackets: true,
            extraKeys: {
               
            },
      });

      this.autoCompleteList = this.getAutocompleteList(wordList);

      this.registerDictionary(this.autoCompleteList);

      this.editor.on("inputRead",function(cm){
         CodeMirror.showHint(cm, CodeMirror.hint.dictionaryHint, {completeSingle: false });
      });

   }

   public getValue()
   {
      return this.editor.getValue();
   }

   public clear()
   {
      this.editor.setValue("");
      this.editor.clearHistory();
   }

   public addToAutoCompleteList(wordList: string[])
   {
      wordList.forEach(word => {
            
         this.autoCompleteList.push(word);
      });
   }
   
   private getAutocompleteList(wordList: string)
   {
      let words = wordList.split('\n');
      
      for(var i = 0; i < words.length; i++)
      {
         words[i] = words[i].trimEnd();
      }
      
      return words;
   }

   private registerDictionary(dictionary)
   {
      CodeMirror.registerHelper('hint', 'dictionaryHint', function(editor) {
         var cur = editor.getCursor();
         var curLine = editor.getLine(cur.line);
         var start = cur.ch;
         var end = start;
         while (end < curLine.length && /[\w$]/.test(curLine.charAt(end))) ++end;
         while (start && /[\w$.]/.test(curLine.charAt(start - 1))) --start;
         var curWord = start !== end && curLine.slice(start, end);
         var regex = new RegExp('^' + curWord, 'i');
         return {
             list: (!curWord ? [] : dictionary.filter(function(item) {
                 return item.match(regex);
             })).sort(),
             from: CodeMirror.Pos(cur.line, start),
             to: CodeMirror.Pos(cur.line, end)
         }
     });
   }
}