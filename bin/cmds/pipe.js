exports.command = 'pipe [dir]'
exports.desc = 'Create an empty repo'
exports.builder = {
  dir: {
    default: '.',
    alias :'d'
  }
}
exports.handler = function (argv) {
  console.log(argv)
}
