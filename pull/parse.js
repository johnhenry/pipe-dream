const cheerio = require('cheerio');
module.exports = ({body})=>{
  try{
    const $ = cheerio.load(body);
    const title = $('title').html()
    return Promise.resolve(JSON.stringify({title})+'\n');
  }catch(error){
    return Promise.reject(error+'\n');
  }

}
