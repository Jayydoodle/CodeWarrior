import * as CodeMirror from '../../../node_modules/codemirror';
import '../../../node_modules/codemirror/lib/codemirror.js';
import '../../../node_modules/codemirror/addon/edit/closebrackets.js';
import '../../../node_modules/codemirror/mode/javascript/javascript.js';
require('../../../node_modules/codemirror/lib/codemirror.css');
require('../../../node_modules/codemirror/theme/lucario.css');

export class CodeEditor
{
   public editor: any;

   constructor(){
         this.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
            tabSize: 3,
            lineNumbers: true,
            indentUnit: 4,
            indentWithTabs: false,
            mode: "text/typescript",
            theme: "lucario",
            autoCloseBrackets: true,
            extraKeys: {
               
               // the following Tab key mapping is from http://codemirror.net/doc/manual.html#keymaps
               Tab: function(cm) {
                  var spaces = new Array(cm.getOption("indentUnit") + 1).join(" ");
                  cm.replaceSelection(spaces);
               }
            }
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
   
}