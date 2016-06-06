let messageFunc;
const on = (event, func) => messageFunc = func;
const interrupt = () => {
  if(messageFunc) messageFunc(new Date() + '\n');
  setTimeout(interrupt, Math.random() * 2000 + 500);
};
interrupt();
module.exports = {on};
