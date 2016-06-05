const fetch = require('node-fetch');
module.exports = (query)=>fetch(`https://www.google.com/search?q=${query}`)
  .then(response=>response.text())
  .then(body=>JSON.stringify({body})+'\n');
