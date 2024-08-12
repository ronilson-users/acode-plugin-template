//soletrar

import plugin from '../plugin.json';
import { diff_match_patch } from 'diff-match-patch';

const toast = acode.require("toast");
const editor = editorManager.editor;


class AcodePlugin {

  async init($page) {
    console.log("Meu Plugin foi inicializado!");
    
    this.dmp = new diff_match_patch();

    // Get the current code and set it as the previous code
    this.previousCode = await this.getCode();

    // Add a listener for changes in the file content
    editor.session.on('change', this.handleCodeChange);
  }
  
async getCode() {
    // Code to get the current code from the editor
    return await editor.session.getValue();
  }

  handleCodeChange(e) {
    // Handle changes in the file content
    const content = editor.getValue();
    const newCode = content
      .split("\n")
      .map((line, index) => {
        return  line
      })
      .join("");
    const diffs = this.dmp.diff(this.previousCode, newCode);
    // Do something with the diffs...
    this.previousCode = newCode;
    console.log('content', content);
    
    console.log('diffs', diffs);
  }
  
  

  async destroy() {
    console.log("Meu Plugin foi destruído!");
    
    // Remover ouvinte de mudanças no conteúdo do arquivo
    editor.session.off('change', this.handleCodeChange.bind(this));
  }
}

if (window.acode) {
  const acodePlugin = new AcodePlugin();
  acode.setPluginInit(plugin.id, async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
    if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
    }
    acodePlugin.baseUrl = baseUrl;
    await acodePlugin.init($page, cacheFile, cacheFileUrl);
  });
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}