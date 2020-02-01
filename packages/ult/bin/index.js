#!/usr/bin/env node

const readline = require('readline');
const chalk = require('chalk');
const create = require('./create');
const install = require('./install');
const native = require('./native');

async function main() {
  const custom = !!process.argv[3];
  const project = process.argv[custom ? 3 : 2];
  const tpl = process.argv[custom ? 2 : 3];
  const name = project && project.trim();
  const template = tpl ? tpl.substr(2) : 'default';

  if (!name)
    return error('Project name is missing. (e.g. npx ult Demo)');
  if (name.match(/^[_\.]/))
    return error('Project name should not start with . or _');
  if (name.match(/[~'!()*]/))
    return error('Project name should not contain: ~ ( ) \' ! *');
  if (name.length > 100) 
    return error('Project name length cannot exceed 100 characters.');

  try {
    console.log('Creating new project, please wait...');
    await create(name, template);
    if (template !== 'web') {
      console.log('Initializing react native...');
      await native(name);
    }

    const question = 'Would you like to install the dependencies? (Y/n) ';
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(chalk.bold(question), async (answer) => {
      if (answer.toLowerCase() === 'y') {
        console.log('Installing, this may take awhile...');
        try {
          await install(name);
          success(name, template, true);
        } catch (e) {
          success(name, template, false, true);
        } finally {
          rl.close();
        }
      } else {
        success(name, template, false);
        rl.close();
      }
    });
  } catch (e) {
    error('Failed to create project.\n>', e.toString().trim());
  }
}

function error(...messages) {
  console.log(chalk.red(...messages));
}

function success(name, template, deps, depsFailed) {
  if (depsFailed) {
    console.log(chalk.red('Failed to install dependencies.'));
  } else {
    console.log(chalk.green(`Successfully created ${name}!`));
  }
  console.log();
  console.log(chalk.bold('1) Navigate to your project:'));
  console.log(`$ ${chalk.yellow(`cd ${name.toLowerCase()}`)}`);
  console.log();
  if (deps) {
    console.log(chalk.bold('2) Choose a command below:'));
  } else {
    console.log(chalk.bold('2) Install dependencies:'));
    console.log(`$ ${chalk.yellow('npm install')}`);
    console.log();
    console.log(chalk.bold('3) Choose a command below:'));
  }
  if (template === 'web') {
    console.log(`$ ${chalk.yellow('npm run web')}`);
    console.log(`$ ${chalk.yellow('npm run test')}`);
    console.log(`$ ${chalk.yellow('npm run build')}`);
  } else {
    console.log(`$ ${chalk.yellow('npm run web')}`);
    console.log(`$ ${chalk.yellow('npm run android')}`);
    console.log(`$ ${chalk.yellow('npm run ios')}`);
    console.log(`$ ${chalk.yellow('npm run macos')}`);
    console.log(`$ ${chalk.yellow('npm run windows')}`);
  }
  console.log(chalk.blue('\nFor more details, visit https://docs.ult.dev'));
}

main();
