#!/usr/bin/env node
const path = require('path');
const pkg = require(path.join(__dirname, '../package.json'));
var argv = require('yargs')
  .version(pkg.version)
  .command('pipe <hi>', 'pipe', require('./cmds/pipe'))
  //Help
  .help()
  .showHelpOnFail()
  //Aliases
  .alias('v', 'version')
  .alias('h','help')
  //variables
  .alias('n','name')
  .argv;
