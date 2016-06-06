const path = require('path');
exports.command = 'pipe [source]'
exports.desc = 'Create an empty repo'
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
    default:'commonjs'
  }
}

exports.handler = function (argv) {
  switch(argv.type){
    default:
    case 'commonjs':
      const create_pull = require('./create-pull');
      argv.source.forEach( src => {
        let source;
        try{
          source = require(path.join(process.cwd(), src));
        }catch(error){}
        try{
          if(!source){
            source = require(src);
          }
        }catch(error){}
        if(source){
          const unwrapWrap = (line) => {
            if(argv.unwrap){
              line = JSON.stringify(JSON.parse(line)[argv.unwrap]);
            }
            if(argv.wrap){
              line = JSON.stringify({[argv.wrap]:line});
            }
            return line;
          }
          source.on(
            'message',
            line => process.stdout.write(unwrapWrap(line)));
        }

      })
      if(argv.pull){
        create_pull(argv, process);
      }
    break;
  }
}
