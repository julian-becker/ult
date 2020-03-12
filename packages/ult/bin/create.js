const path = require('path');
const spawn = require('child_process').spawn;

module.exports = (name, template) => {
  return new Promise((resolve, reject) => {
    const base = process.cwd();
    const slug = name.toLowerCase();
    const init = spawn('git', ['init', slug], {cwd: base});
    init.once('exit', i => {
      if (i === 0) {
        const root = path.resolve(base, slug);
        const user = 'https://github.com/kat-tax';
        const repo = `${user}/ult-template-${template}.git`;
        const pull = spawn('git', ['pull', repo], {cwd: root});
        pull.once('exit', p => (p === 0 ? resolve() : reject(p)));
      } else {
        reject(i);
      }
    });
  });
}
