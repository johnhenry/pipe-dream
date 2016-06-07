module.exports = (input) => JSON.stringify({input:input.stdin, output:eval(input.stdin)});
