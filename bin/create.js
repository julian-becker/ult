const path = require('path');
const fs = require('fs-extra');
const config = require('../config');

module.exports = async (name, template) => {
  try {
    const cwd = `${process.cwd()}/${name.toLowerCase()}`;
    const src = path.dirname(fs.realpathSync(__filename));
    const app = getApp(name);
    const pkg = template === 'default'
      ? getPkg(name)
      : getPkgWeb(name);
    await fs.outputJson(`${cwd}/app.json`, app, {spaces: 2});
    await fs.outputJson(`${cwd}/package.json`, pkg, {spaces: 2});
    await fs.copy(path.resolve(src, `../tpl/${template}`), cwd, {
      overwrite: false,
      errorOnExist: true,
      preserveTimestamps: true,
    });
  } catch (e) {
    if (e.toString().indexOf('already exists') !== -1) {
      throw new Error('Directory already exists.');
    } else {
      throw new Error(e);
    }
  }
};

function getApp(name) {
  return {
    'name': name.toLowerCase(),
    'displayName': name
  };
}

function getPkg(name) {
  return {
    'name': name.toLowerCase(),
    'version': '0.0.0',
    'main': 'index.js',
    'scripts': {
      'web': 'react-scripts start',
      'android': 'react-native run-android',
      'ios': 'react-native run-ios',
      'macos': 'react-native run-macos',
      'windows': 'react-native run-windows',
      'test': 'react-scripts test --env=jsdom',
      'build': 'react-scripts build'
    },
    'browserslist': {
      'production': [
        '>0.2%',
        'not dead',
        'not op_mini all'
      ],
      'development': [
        'last 1 chrome version',
        'last 1 firefox version',
        'last 1 safari version'
      ]
    },
    'dependencies': {
      'react': config.deps['react'],
      'react-dom': config.deps['react'],
      'react-native': config.deps['react-native'],
      'react-native-windows': config.deps['react-native-windows'],
      'react-redux': config.deps['react-redux'],
      'react-ult': config.deps['react-ult']
    },
    'devDependencies': {
      '@react-native-community/cli': config.deps.dev['@react-native-community/cli'],
      '@types/node': config.deps.dev['@types/node'],
      '@types/react-redux': config.deps.dev['@types/react-redux'],
      'react-scripts': config.deps.dev['react-scripts'],
      'rnpm-plugin-windows': config.deps.dev['rnpm-plugin-windows'],
      'typescript': config.deps.dev['typescript']
    }
  };
}

function getPkgWeb(name) {
  return {
    'name': name.toLowerCase(),
    'version': '0.0.0',
    'main': 'index.js',
    'scripts': {
      'web': 'react-scripts start',
      'test': 'react-scripts test --env=jsdom',
      'build': 'react-scripts build'
    },
    'browserslist': {
      'production': [
        '>0.2%',
        'not dead',
        'not op_mini all'
      ],
      'development': [
        'last 1 chrome version',
        'last 1 firefox version',
        'last 1 safari version'
      ]
    },
    'dependencies': {
      'react': config.deps['react'],
      'react-dom': config.deps['react'],
      'react-redux': config.deps['react-redux'],
      'react-ult': config.deps['react-ult']
    },
    'devDependencies': {
      '@types/node': config.deps.dev['@types/node'],
      '@types/react-redux': config.deps.dev['@types/react-redux'],
      'react-scripts': config.deps.dev['react-scripts'],
      'typescript': config.deps.dev['typescript']
    }
  };
}
