const path = require('path');
exports.command = 'node [source]'
exports.desc = 'Create an empty repo'
exports.builder = {
  init : {
    alias:'i',
    desc:'initial object passed to module',
    default:{}
  },
  delimiter : {
    alias:'d',
    desc:'default delimiter',
    default:'\n'
  },
  nldj : {
    alias:'j',
    desc:'use new-line delimited JSON',
    default:false
  },
  wrap : {
    alias:'w',
    desc:'wrap output in json'
  },
  unwrap : {
    alias:'u',
    desc:'extract json object key'
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
};
exports.handler = function (argv) {
  switch(argv.type){
    default:
    case 'commonjs':
      const create_pull = require('./module/create-pull');
      argv.source.forEach( source => {
        try{
          source = require(path.join(process.cwd(), source))(argv.init);
        }catch(e){
          try{
            source = require(source)(argv.init);
          }catch(e1){
            process.stderr.write(`Error:${e}, ${e1}`);
            process.stderr.write('\n');
            process.exit(1);
            return;
          }
        }

        //push
        if(typeof source.addEventListener === 'function'){
          const unwrapWrap = (line) => {
            if(argv.unwrap){
              line = JSON.stringify(JSON.parse(line)[argv.unwrap]);
            }
            if(argv.wrap){
              line = JSON.stringify({[argv.wrap]:line});
            }
            return line;
          }
          source.addEventListener(
            'message',
            line => process.stdout.write(unwrapWrap(line)));
        }
        //pull
        if(typeof source === 'function'){
          try{
            create_pull(argv, process, source);
          }catch(e){
            process.stderr.write(`Error: ${e}`);
            process.stderr.write('\n');
            process.exit(1);
          }
        }
      })
    break;
  }
}
