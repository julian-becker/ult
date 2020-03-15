import CodeBlockWriter from 'code-block-writer';

// Init
const {ui, currentPage} = figma;
figma.showUI(__html__, {width: 400, height: 500});
figma.on('selectionchange', onSelect);
figma.on('currentpagechange', onNavigate);
ui.on('message', onMessage);

// State
const state = {
  editorLoaded: false,
};

// Page changed
function onNavigate() {
  figma.closePlugin();
}

// Message received from UI
function onMessage(e) {
  switch (e.type) {
    case 'editor-init':
      state.editorLoaded = true;
      break;
  }
}

// Selection changed
function onSelect() {
  const {selection} = currentPage;
  const component = selection.length && getTarget(selection);
  const code = component && getCode(component);
  const payload = code ? code : '';
  console.log(selection, component);
  ui.postMessage({type: 'editor-value', payload});
}

// Helper functions
function getName(value: string) {
  return value.replace(/\s/g, '');
}

function getSlug(value: string) {
  return value.split(' ').map((word, index) => {
    if (index == 0) return word.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('');
}

function getTag(type: string) {
  switch (type) {
    case 'COMPONENT':
    case 'GROUP':
      return 'View';
    case 'TEXT':
      return 'Text';
    case 'IMAGE':
      return 'Image';
    default:
      return 'Unknown';
  }
}

function getTarget(selection) {
  let root = selection[0];
  if (root.type === 'COMPONENT') return selection[0];

  while (root.parent && root.parent.type !== 'PAGE') {
    root = root.parent;
    if (root.type === 'COMPONENT') return root;
  }

  return null;
}

function getCode(component) {
  const {code, deps, styles} = getContent([...component.children]);
  const root = {tag: 'View', slug: 'root', style: getStyle(component)};
  const name = getName(component.name);
  const dependencies = ['Style', 'View', ...deps].join(', ');
  const writer = new CodeBlockWriter({
    newLine: "\r\n",         // default: "\n"
    indentNumberOfSpaces: 2, // default: 4
    useTabs: false,          // default: false
    useSingleQuote: true     // default: false
  });

  const writeContents = (lines) => {
    lines.forEach((line) => {
      writer.write(`<${line.tag} style={styles.${line.slug}}>`).indent(() => {
        if (line.tag === 'Text') {
          writer.writeLine(line.value);
        } else if (line.tag === 'View') {
          writeContents(line.children);
        }
      });
      writer.writeLine(`</${line.tag}>`);
    });
  };

  writer.writeLine(`import React from 'react;`);
  writer.writeLine(`import {${dependencies}} from 'react-ult;`);
  writer.blankLine();
  writer.write(`export function ${name}()`).block(() => {
    writer.write(`return (`).indent(() => {
      writer.write(`<View style={styles.root}>`).indent(() => {
        writeContents(code);
      });
      writer.writeLine('</View>');
    });
    writer.writeLine(');');
  });
  writer.blankLine();
  writer.write(`const styles = `).block(() => {
    writer.write(`${root.slug}: Style.${root.tag}({`).indent(() => {
      Object.keys(root.style).forEach(property => {
        const value = root.style[property];
        writer.writeLine(`${property}: ${value},`);
      });
    });
    writer.writeLine('}),');
    Object.keys(styles).forEach(slug => {
      const child = styles[slug];
      console.log(child);
      writer.write(`${slug}: Style.${child.tag}({`).indent(() => {
        Object.keys(child.style).forEach(property => {
          const value = child.style[property];
          writer.writeLine(`${property}: ${value},`);
        });
      });
      writer.writeLine('}),');
    });
  });

  const contents = writer.toString();
  component.setPluginData('code', contents);
  return contents;
}

function getStyle(component) {
  const isText = component.type === 'TEXT';
  const isGroup = component.type === 'GROUP';
  const isComponent = component.type === 'COMPONENT';

  let styles = {};

  if (isComponent || isGroup) {
    styles = {
      ...styles,
      flex: 0,
      backgroundColor: 'rgb(29, 29, 29)', // TODO 
    };
    /*
      const flexbox = {
        backgroundColor: color = undefined; // Value is animatable
        opacity: number = 1.0; // Value is animatable
        overflow: 'hidden' | 'visible';

        borderWidth: number;
        borderTopWidth: number;
        borderRightWidth: number;
        borderBottomWidth: number;
        borderLeftWidth: number;
        borderColor: color;
        borderStyle: 'solid' | 'dotted' | 'dashed' | 'none';
        borderRadius: number;  // Sets all four border radius attributes; value is animatable
        borderTopRightRadius: number = 0;
        borderBottomRightRadius: number = 0;
        borderBottomLeftRadius: number = 0;
        borderTopLeftRadius: number = 0;

        // NOTE: If applied to a Text element, these properties translate to text shadows,
        // not a box shadow.
        shadowOffset: { height: number; width: number } = { 0, 0 };
        shadowRadius: number = 0;
        shadowColor: color = 'black';
        elevation: number; // Android only

        wordBreak: 'break-all' | 'break-word'; // Web only
        appRegion: 'drag' | 'no-drag'; // Web only
        cursor: 'pointer' | 'default'; // Web only
      }
    */
  }

  if (isText) {
    const {r, g, b} = component.fills[0].color;
    const rgb = `rgb(${r}, ${g}, ${b})`;
    const fontSize = component.fontSize;
    const fontFamily = component.fontName.family;
    const isItalic = component.fontName.style.indexOf('Italic') !== -1;
    const isBold = component.fontName.style.indexOf('Bold') !== -1;
    const isThin = component.fontName.style.indexOf('Thin') !== -1;
    const isUnderline = component.textDecoration === 'UNDERLINE';
    const isCrossed = component.textDecoration === 'STRIKETHROUGH';
    const isAlignLeft = component.textAlignHorizontal === 'LEFT';
    const isAlignRight = component.textAlignHorizontal === 'RIGHT';
    const isAlignTop = component.textAlignVertical === 'TOP';
    const isAlignBottom = component.textAlignVertical === 'BOTTOM';
  
    styles = {
      ...styles,
      // TODO: color: rgb !== 'rgb(0, 0, 0)' ? rgb : undefined,
      letterSpacing: undefined, // TODO
      lineHeight: undefined, // TODO
      fontSize,
      // fontFamily,
      fontStyle: isItalic ? 'italic' : undefined,
      fontWeight: isBold ? '700' : isThin ? '300' : undefined,
      textAlign: isAlignLeft ? 'left' : isAlignRight ? 'right' : undefined,
      // textAlignVertical: isAlignTop ? 'top' : isAlignBottom ? 'bottom' : undefined,
      textDecorationLine: isUnderline ? 'underline' : isCrossed ? 'line-through' : undefined,
    };
  }

  return styles;
}

function getContent(children, depth = 0, deps = [], styles = {}) {
  let code = [];

  children.reverse().forEach(child => {
    const isText = child.type === 'TEXT';
    const isGroup = child.type === 'GROUP';
    const slug = getSlug(child.name);
    const tag = getTag(child.type);

    styles[slug] = {tag, style: getStyle(child)};
  
    if (isText && deps.indexOf('Text') === -1) {
      deps.push('Text');
    }

    // `<Text style=${style}>${value}</Text>`
    if (isText) {
      code.push({
        slug,
        tag: 'Text',
        value: child.characters || '',
      });
    }

    // `<View style=${style}>${children}</View>`
    if (isGroup) {
      const content = getContent([...child.children], depth + 1, deps, styles);
      styles = {...styles, ...content.styles};
      code.push({
        slug,
        tag: 'View',
        children: content.code,
      });
    }
  });

  return {code, deps, styles};
}
