let messageFunc;
const on = (event, func) => messageFunc = func;
const interrupt = () => {
  if(messageFunc) messageFunc(`${new Date()}
`);
  setTimeout(interrupt, Math.random() * 2000 + 1000);
};
interrupt();
module.exports = {on};
