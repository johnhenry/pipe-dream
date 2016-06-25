const id = () => Math.random().toString().slice(2);
module.exports = (init) => (input) => JSON.stringify({id:id(), input.stdin});
