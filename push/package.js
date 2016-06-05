const id = () => Math.random().toString().slice(2);
module.exports = (calculation) => JSON.stringify({id:id(), calculation})+'\n';
