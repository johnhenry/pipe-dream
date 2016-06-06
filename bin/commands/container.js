const path = require('path');
exports.command = 'pipe [source]';
exports.desc = 'Create an empty repo';
exports.builder = {
  pull : {
    alias:'p',
    desc:'Pull',
    default:false
  },
  delimiter : {
    alias:'d',
    desc:'Delimiter',
    default:'\n'
  },
  wrap : {
    alias:'w',
    desc:'wrap output in json'
  },
  unwrap : {
    alias:'u',
    desc:'unwrap json output'
  },
  'eval-delimiter':{
    alias:'e',
    desc:'use evaluated delimiter',
    default:false
  },
  'type':{
    alias:'t',
    desc:'type of module',
    default:'docker'
  }
};
exports.handler = function (argv) {
  switch(argv.type){
    case 'docker'://TODO : Implement docker
    case 'rkt':   //TODO : Implement rkt
    default:
      throw new Error(`container type '${argv.type}' not implemented`);
    break;
  }
};
