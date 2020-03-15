import './ui.css';

const info = document.getElementById('info');
const hint = document.getElementById('hint');
const editor = document.getElementById('editor');
const loading = document.getElementById('loading');

let LOADING = true;
window.onmessage = onMessage;
editor.onload = () => onDispatch({type: 'editor-init'});

function onMessage(e: any) {
  const {type, payload} = e.data.pluginMessage;
  switch (type) {
    case 'editor-value':
      if (LOADING) editor.style.opacity = '1.0';
      LOADING = !payload;
      frames['editor'].postMessage(`\n${payload}\n`, '*');
      if (LOADING) {
        info.style.display = '';
        hint.style.display = '';
      } else {
        info.style.display = 'none';
      }
      break;
  }
}

function onDispatch(e: any) {
  const {type, payload} = e;
  parent.postMessage({pluginMessage: {type, payload}}, '*');
  switch (type) {
    case 'editor-init':
      loading.style.display = 'none';
      hint.style.display = 'flex';
      break;
  }
}
