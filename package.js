const id = () => Math.random().toString().slice(2);
module.exports = (input) => JSON.stringify({id:id(), input})+'\n';
