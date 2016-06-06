#!/usr/bin/env node
const path = require('path');
const pkg = require(path.join(__dirname, '../package.json'));
var argv = require('yargs')
  .version(pkg.version)
  .command('module [source...]', 'module', require('./commands/module'))
  .command('container [source...]', 'container', require('./commands/container'))
  //Help
  .help()
  .showHelpOnFail()
  //Aliases
  .alias('v', 'version')
  .alias('h','help')
  .argv;
