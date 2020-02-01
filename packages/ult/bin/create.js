const path = require('path');
const fs = require('fs-extra');

module.exports = async(name, template) => {
  try {
    const cwd = `${process.cwd()}/${name.toLowerCase()}`;
    const src = path.dirname(fs.realpathSync(__filename));
    const app = {name: name.toLowerCase(), displayName: name};
    await fs.outputJson(`${cwd}/app.json`, app, {spaces: 2});
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
