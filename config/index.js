var full = require('path').join.bind(null, __dirname);
// see how to use in https://www.npmjs.com/package/nconf
var nconf = require('nconf');
nconf.env().argv();
nconf.file('local', full('local-dev.json'));
nconf.file('default', full('default-dev.json'));

nconf.defaults({
  PORT: process.env.PORT || 3000,
  NODE_ENV: 'development'
});

module.exports = nconf;

