#Pipe Dreams
Seamlessly use node modules alongside standard unix utilities.

##Pre-Requesites
You must install node [and npm] before using.

##Installation
Install using npm

```bash
npm install --save pipe-dream
```

##Usage
```bash
pipe-dream <command>
```

##Commands

###module
Pipe Data through node modules

```bash
pipe-dream module [options]
```

####Push modules
Data can be imported and sent to standard output.

```bash
pipe-dream module [path to pushy module]
```

'Push modules' export an object with a message event.
The message be sent to standard output.

#####Example
The following example displays sends the current date to standard the output stream every 0.5 to 2.0 seconds

```javascript
//push/random-time.js
let messageFunc;
const on = (event, func) => messageFunc = func;
const interrupt = () => {
  if(messageFunc) messageFunc(new Date() + '\n');
  setTimeout(interrupt, Math.random() * 2000 + 500);
};
interrupt();
module.exports = {on};
```

```bash
pipe-dream module push/random-time.js
  Sun Jun 05 2016 12:51:37 GMT-0700 (PDT)
  Sun Jun 05 2016 12:51:39 GMT-0700 (PDT)
  Sun Jun 05 2016 12:51:40 GMT-0700 (PDT)
  Sun Jun 05 2016 12:51:43 GMT-0700 (PDT)
  Sun Jun 05 2016 12:51:44 GMT-0700 (PDT)
  Sun Jun 05 2016 12:51:46 GMT-0700 (PDT)
  Sun Jun 05 2016 12:51:49 GMT-0700 (PDT)
```

####Pull modules
Data can be transformed and sent to standard output.
Include the "pull" flag to denote the transformation module.
Use "p" as an alias for "pull".

```bash
pipe-dream module --pull [path to transformation module]
```

Pull modules export a function which may return a promise for asynchronicity.

If this command is the first in a series of commands, it will read input typed into the command line.

#####Example
The following example accepts user input and evaluates it

```javascript
//pull/js-eval.js
module.exports = (input) => JSON.stringify({input, output:eval(input)});
```

```bash
pipe-dream module -p pull/js-eval.js
1
{"input":"1", output:"1"}
1+1
{"input":"1+1", output:"2"}
```

####Pipe Commands
commands can be piped into one another

#####Example

The folowing example first sends the users's input to google,
then extracts the title of the page from the response, and finally prompts the user for more input.


```javascript
//pull/google-query.js
const fetch = require('node-fetch');
module.exports = (query)=>fetch(`https://www.google.com/search?q=${query}`)
  .then(response=>response.text())
  .then(body=>JSON.stringify({body}));
```

```javascript
//pull/parse-title.js
const cheerio = require('cheerio');
module.exports = (response)=>{
  try{
    const $ = cheerio.load(JSON.parse(response).body);
    const title = $('title').html();
    return Promise.resolve(JSON.stringify({title}));
  }catch(error){
    return Promise.reject(error);
  }
}
```

```javascript
//pull/prompt-next.js
module.exports = (input) => input + '\nnext?\n';
```

```bash
pipe-dream module -p pull/google-query.js \
  | pipe-dream module -p pull/extract-title.js -u title \   
  | pipe-dream module -p pull/prompt-next.js
```

####Redirection
You can take advantage of standard unix redirection to create a fully modular application,

#####Example

In addition to displaying expected output, the following command will write successful responses and errors to files "success.log" and "error.log" respectively.

```bash
pipe-dream module -p pull/js-eval.js -u output 1> >(>> success.log) 2> >(>> error.log) \
  | cat
```
