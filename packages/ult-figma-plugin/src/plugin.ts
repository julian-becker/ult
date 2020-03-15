import {getTarget, getCode} from './lib/component';

figma.ui.on('message', onMessage);
figma.on('selectionchange', onSelect);
figma.on('currentpagechange', onNavigate);
figma.showUI(__html__, {width: 400, height: 500});

function onSelect() {
  const {selection} = figma.currentPage;
  const target = selection.length && getTarget(selection);
  const code = target && getCode(target);
  const payload = code ? code : '';
  figma.ui.postMessage({type: 'editor-value', payload});
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
