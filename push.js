const path = require('path');
const interruption = path.join(process.cwd(), process.argv[2]);
let interrupt = require(interruption);
interrupt.on(
  'message',
  (line) => {process.stdout.write(line)});
