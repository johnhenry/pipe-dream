#!/usr/bin/env node
const path = require('path');
const pkg = require(path.join(__dirname, '../package.json'));
var argv = require('yargs')
  .version(pkg.version)
  .command('module [source...]', 'pipe', require('./cmds/module'))
  //Help
  .help()
  .showHelpOnFail()
  //Aliases
  .alias('v', 'version')
  .alias('h','help')
  .argv;
