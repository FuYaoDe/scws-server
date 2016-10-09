import debug from 'debug';

import bootstrap from './bootstrap';
import config from './config/init';
import Controllers from './controllers';

import koa from 'koa';
import cors from 'koa-cors';
import koaBodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import responseTime from 'koa-response-time';
import logger from 'koa-logger';


const app = new koa();

app.use(convert(cors()));
app.use(koaBodyParser());

app.use(convert(responseTime()));
app.use(logger());


global.appConfig = config;
const { environment } = appConfig;
if (environment === 'production') {
  // set debug environment to `koa` only
  // must be set programmaticaly for windows
  debug.enable('koa,error');
}

if (environment === 'development') {
  // set debug environment, must be programmaticaly for windows
  debug.enable('dev,koa,error');
  // log when process is blocked
  require('blocked')((ms) => debug('koa')(`blocked for ${ms}ms`));
}

const controllers = new Controllers(app);

app.use(async function (ctx, next) {
  try {
    await next();
  } catch (error) {
    debug('error')(error);
    throw error;
  }
});


controllers.setupPublicRoute();
controllers.setupAppRoute();


const liftApp = async () => {
  try {
    console.log(config);
    app.listen(config.port);
    await bootstrap();

    if (process.send) process.send('online');
    debug('koa')(`Application started on port ${config.port}`);
  } catch (e) {
    console.log(e.stack);
  }
  return app;
};

if (environment !== 'test') liftApp();

module.exports = liftApp;
