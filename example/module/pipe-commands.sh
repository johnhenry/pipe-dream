alias duckduckgo-query='pipe-dream module -p example/module/pull/query.js --init.search="https://duckduckgo.com/?q="'
alias extract-title='pipe-dream module -p example/module/pull/extract-title.js -u title'
alias prompt-next='pipe-dream module -p example/module/pull/prompt-next.js'
alias search='duckduckgo-query | extract-title | prompt-next'
