const fetch = require('node-fetch');
module.exports = (init) => (query)=>fetch(`${init.search}${query.stdin}`)
  .then(response=>response.text())
  .then(body=>JSON.stringify({body}));
