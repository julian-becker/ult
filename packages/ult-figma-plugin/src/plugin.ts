import {getTarget, getCode} from './lib/component';

let LAST_CODE = '';

figma.ui.on('message', onMessage);
figma.on('selectionchange', onUpdate);
figma.on('currentpagechange', onNavigate);
figma.showUI(__html__, {width: 350, height: 650});
setInterval(onUpdate, 500);

function onUpdate() {
  const {selection} = figma.currentPage;
  const target = selection.length && getTarget(selection);
  const code = target && getCode(target);
  const payload = code ? code : '';
  if (payload !== LAST_CODE) {
    LAST_CODE = payload;
    figma.ui.postMessage({type: 'editor-value', payload});
  }
}

function onMessage(e: {type: string}) {
  switch (e.type) {
    case 'editor-init':
      console.log('ULT designer loaded!');
      break;
  }
}

function onNavigate() {
  figma.closePlugin();
}
