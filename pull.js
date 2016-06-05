const path = require('path');
let transform;
try{
  const transformation = path.join(process.cwd(), process.argv[2]);
  transform = require(transformation);
  if(typeof transform !== 'function') throw new Error('no transform function');
}catch(error){
  transform = _=>_;
}
let splitchar = process.argv[3] || undefined;
if(splitchar === '*'){
  splitchar = JSON.parse;
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
      process.stdout.write(line);
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
