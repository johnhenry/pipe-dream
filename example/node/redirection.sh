source example/node/pull/pull-modules.sh &&
alias calculator='js-eval \
  1> >(>> success.log) 2> >(>> error.log) \
  | cat'
