FROM risingstack/alpine:3.4-v6.2.0-3.6.1
COPY . .
RUN npm install
RUN alias pipe-dream='./bin/index.js'
