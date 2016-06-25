#Pipe Dreams
Create pipeable commands
String them together using standard unix methods such as

##Pre-Requesites
You must install node [and npm] before using.

##Installation
Install using npm

```bash
#!/bin/bash
npm install --save pipe-dream
```

##Usage
```bash
#!/bin/bash
pipe-dream [command]
```

##Commands

###node
Pipe Data through node modules

```bash
#!/bin/bash
pipe-dream node [options]
```

####Push modules
Data can be fead from a module into standard output.

```bash
#!/bin/bash
pipe-dream node [path to module]
```

A push module takes an init object and exports an event dispatcher that dispatches a 'message' event.

#####Example
The following example displays sends the current date to standard the output stream every 0.5 to 2.0 seconds

```javascript
//file:///example/node/push/random-time.js
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
```

```bash
#file:///example/node/push/push-modules.sh
alias random-time='pipe-dream node example/node/push/random-time.js'
```

```bash
#!/bin/bash
source example/node/push/push-modules.sh
```

```bash
#!/bin/bash
random-time
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

```bash
#!/bin/bash
pipe-dream node [path to transformation module]
```

A pull module takes an init object and exports function. This function may  either a flat object or a promise to be unwrapped.

If this command is the first in a series of commands, it will read input typed into the command line.

#####Example
The following example accepts user input and evaluates it

```javascript
//file:///example/node/pull/js-eval.js
module.exports = (init) => (input) => JSON.stringify({input:input.stdin, output:eval(input.stdin)});
```

```bash
#file:///example/node/pull/pull-modules.sh
alias js-eval='pipe-dream node example/node/pull/js-eval.js'
```

```bash
#!/bin/bash
source example/node/pull/pull-modules.sh
```

```bash
#!/bin/bash
js-eval
>1
{"input":"1", output:"1"}
>1+1
{"input":"1+1", output:"2"}
```

####Dual modules
Modules can function as both push and pull modules.

#####Example
The following combines a push and a pull module into one.

```javascript
//file:///example/node/pushpull/pushpull.js
module.exports = (init) => {
  return Object.assign(
    require('../pull/js-eval')(init),
    require('../push/random-time')(init));
};
```

```bash
#file:///example/node/pushpull/pushpull-modules.sh
alias push-pull='pipe-dream node example/node/pushpull/pushpull.js'
```

```bash
#!/bin/bash
source example/node/pushpull/pushpull-modules.sh
```

```bash
#!/bin/bash
push-pull
>1
{"input":"1", output:"1"}
>1+1
{"input":"1+1", output:"2"}
```

####Pipe Commands
Commands can be piped into one another

#####Example

The following example first sends the users's input to google,
then extracts the title of the page from the response, and finally prompts the user for more input.


```javascript
//file:///example/node/pull/query.js
const fetch = require('node-fetch');
module.exports = (init) => (query) => fetch(`${query.search}${query.stdin}`)
  .then(response=>response.text())
  .then(body=>JSON.stringify({body}));
```

```javascript
//file:///example/node/pull/extract-title.js
const cheerio = require('cheerio');
module.exports = (init) => (response)=>{
  try{
    const $ = cheerio.load(JSON.parse(response.stdin).body);
    const title = $('title').html();
    return Promise.resolve(JSON.stringify({title}));
  }catch(error){
    return Promise.reject(error);
  }
}
```

```javascript
//file:///example/node/pull/prompt-next.js
module.exports = (init) => (input) => input.stdin + '\nnext?\n';
```

```bash
#file:///example/node/pipe-commands.sh
alias duckduckgo-query='pipe-dream node example/node/pull/query.js --init.search="https://duckduckgo.com/?q="'
alias google-query='pipe-dream node example/node/pull/query.js --init.search="https://www.google.com/search?q="'
alias extract-title='pipe-dream node example/node/pull/extract-title.js -u title'
alias prompt-next='pipe-dream node example/node/pull/prompt-next.js'
alias search='duckduckgo-query | extract-title | prompt-next'
```

```bash
#!/bin/bash
source example/node/pipe-commands.sh
```

```bash
#!/bin/bash
search
```

####Redirection
You can take advantage of standard unix redirection to create a fully modular application,

#####Example

In addition to displaying expected output, the following command will write successful responses and errors to files "success.log" and "error.log" respectively.

```bash
#file:///example/node/redirection.sh
source example/node/pull/pull-modules.sh &&
alias calculator='js-eval \
  1> >(>> success.log) 2> >(>> error.log) \
  | cat'
```

```bash
source example/node/redirection.sh
```

```bash
#!/bin/bash
calculator
```
