const cheerio = require('cheerio');
module.exports = (response)=>{
  try{
    const $ = cheerio.load(JSON.parse(response.stdin).body);
    const title = $('title').html();
    return Promise.resolve(JSON.stringify({title}));
  }catch(error){
    return Promise.reject(error);
  }
}
