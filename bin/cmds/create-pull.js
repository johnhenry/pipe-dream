const path = require('path');
module.exports = (argv, process)=>{
  let transform;
  if(argv.pull === true){
    transform = _=>_;
  }else{
    try{
      transform = require(path.join(process.cwd(), argv.pull));
    }catch(error){}
    try{
      if(!transform){
        transform = require(argv.pull);
      }
    }catch(error){}
  }
  if(!transform) return false;
  let splitchar;
  if(argv['eval-delimiter']){
    splitchar = eval(argv.delimiter);
  }else if(argv.delimiter){
    splitchar  = argv.delimiter;
  }
  const split = require('split')(splitchar);
  const er = (error)=>{
    process.stderr.write(String(error));
    process.stderr.write('\n');
  }
  const handle = (line) => {
    try{
      Promise.resolve(transform(line))
      .then((line) => {
        const unwrapWrap = (line) => {
          if(argv.unwrap){
            line = JSON.stringify(JSON.parse(line)[argv.unwrap]);
          }
          if(argv.wrap){
            line = JSON.stringify({[argv.wrap]:line});
          }
          return line;
        }
        process.stdout.write(unwrapWrap(line));
        process.stdout.write('\n');
      }, er);
    }catch(error){
      er(error);
    }
  }
  split.on(
    'data',
    handle
    );
  process.stdin.pipe(split);
  return true;
}
