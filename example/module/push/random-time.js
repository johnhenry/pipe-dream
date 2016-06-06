module.exports = () => {
  let messageFunc;
  const addEventListener = (event, func) => messageFunc = func;
  const interrupt = () => {
    if(messageFunc) messageFunc(new Date() + '\n');
    setTimeout(interrupt, Math.random() * 2000 + 500);
  };
  interrupt();
  return {addEventListener};
}
