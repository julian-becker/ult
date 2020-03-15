const editor = document.getElementById('editor');
const info = document.getElementById('info');
const loading = document.getElementById('loading');
const hint = document.getElementById('hint');

let blank = true;
editor.onload = () => dispatch({type: 'editor-init'});
window.onmessage = message;

function message(e) {
  const {type, payload} = e.data.pluginMessage;
  switch (type) {
    case 'editor-value':
      if (blank) editor.style.opacity = '1.0';
      blank = !payload;
      frames['editor'].postMessage(payload, '*');
      if (blank) {
        info.style.display = '';
        hint.style.display = '';
      } else {
        info.style.display = 'none';
      }
      break;
  }
}

function dispatch(e) {
  const {type, payload} = e;
  switch (type) {
    case 'editor-init':
      loading.style.display = 'none';
      setTimeout(() => {
        if (blank) {
          hint.style.display = 'flex';
        }
      }, 1000);
      break;
  }
  parent.postMessage({pluginMessage: {type, payload}}, '*');
}
