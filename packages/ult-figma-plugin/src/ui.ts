import './ui.css';
import './sdk/prism.css';
import './sdk/prism.js';

let EDITOR = true;
let LOADING = true;

const loading = document.getElementById('loading');
const editor = document.getElementById('editor');
const code = document.getElementById('code');
const text = document.getElementById('text');
const info = document.getElementById('info');
const hint = document.getElementById('hint');

window.onmessage = message;

if (editor) {
  editor.onload = () => dispatch({type: 'editor-init'});
} else {
  EDITOR = false;
  LOADING = false;
  dispatch({type: 'editor-init'});
}

function message(e: any) {
  const {type, payload} = e.data.pluginMessage;
  switch (type) {
    case 'editor-value':
      if (EDITOR) {
        if (LOADING) editor.style.opacity = '1.0';
        LOADING = !payload;
        frames['editor'].postMessage(`\n${payload}\n`, '*');
        if (LOADING) {
          info.style.display = '';
          hint.style.display = '';
        } else {
          info.style.display = 'none';
        }
      } else {
        code.style.display = '';
        text.textContent = `\n${payload}\n`;
        if (window['Prism']) {
          window['Prism'].highlightElement(text);
        }
      }
      break;
  }
}

function dispatch(e: any) {
  const {type, payload} = e;
  switch (type) {
    case 'editor-init':
      loading.style.display = 'none';
      hint.style.display = 'flex';
      break;
  }
  parent.postMessage({
    pluginMessage: {type, payload},
  }, '*');
}
