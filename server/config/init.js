import debug from 'debug';
const env = process.env.NODE_ENV || 'development';
let config;
try {
  config = require(`./${env}`);
  config.default.environment = env;
}
catch (error) {
  console.log(error);
  debug('dev')(`No specific configuration for env ${env}`);
}

export default config.default;
