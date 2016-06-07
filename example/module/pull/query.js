const fetch = require('node-fetch');
module.exports = (query)=>fetch(`${query.search}${query.stdin}`)
  .then(response=>response.text())
  .then(body=>JSON.stringify({body}));
