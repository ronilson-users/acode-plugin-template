import plugin from '../plugin.json';
import { diff_match_patch } from 'diff-match-patch';

const toast = acode.require("toast");
const editor = editorManager.editor;

class AcodePlugin {
constructor() {
this.previousCode = null;
this.diff = new diff_match_patch();
this.page = null; // Referência para o $page
}

async init() {
// Obter o código atual e definir como código anterior
this.previousCode = await this.getCode();

// Adicionar ouvinte para mudanças no conteúdo do arquivo
editor.session.on('change', this.handleCodeChange.bind(this));

// Criar o atalho para exibir as diferenças de código
acode.defineShortcut('showDiff', 'Ctrl-Alt-D', () => {
this.showDiff();
});
}
l
async destroy() {
// Remover ouvinte de mudanças no conteúdo do arquivo
editor.session.off('change', this.handleCodeChange.bind(this));
}

async handleCodeChange() {
const currentCode = await this.getCode();
// Comparar o código anterior com o código atual e registrar as diferenças
const patches = this.diff.patch_make(this.previousCode, currentCode);
// Faça algo com as diferenças, como enviar para um serviço de rastreamento de mudanças ou exibir ao usuário
console.log('Diferenças de código:', patches);
// Atualizar o código anterior com o novo código
this.previousCode = currentCode;
}

async getCode() {
// Código para obter o código atual do editor
return editor.session.getValue();
}

// Método para exibir as diferenças de código em um $page
showDiff() {
if (!this.page) {
// Importe a função page do Acode
const page = acode.require('page');
// Crie um novo $page com um título
this.page = page('Differences', {});
}

// Lógica para calcular e exibir as diferenças de código
// Substitua este exemplo com sua lógica real
const diffs = this.calculateDifferences();

// Adicione as diferenças de código ao corpo do $page
diffs.forEach(diff => {
const diffElement = document.createElement("div");
diffElement.textContent = JSON.stringify(diff);
this.page.appendBody(diffElement);
});

// Exiba o $page
this.page.show();
}

// Método para calcular as diferenças de código
calculateDifferences() {
// Lógica para calcular as diferenças de código
// Retorne um array de diferenças
return diffs;
}
}

if (window.acode) {
const acodePlugin = new AcodePlugin();
acode.setPluginInit(plugin.id, async () => {
await acodePlugin.init();
});
acode.setPluginUnmount(plugin.id, () => {
acodePlugin.destroy();
});
}