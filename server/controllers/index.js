import Router from 'koa-router';
import { exec } from 'child-process-promise';


export default class Routes {

  constructor(app) {
    const router = new Router();
    this.router = router;
    this.app = app;
  }

  setupPublicRoute() {
    const app = this.app;
    const publicRoute = new Router();

    publicRoute.get('/', async (ctx) => {
      try {
        ctx.body = {
          meaasge: 'test',
          data: {
            result: 'ok',
          },
        };
      } catch (e) {
        throw e;
      }
    });

    publicRoute.post('/scws', async (ctx) => {
      try {
        const { body } = ctx.request;
        console.log(body);
        const result = await services.scws.call(body);
        ctx.body = {
          meaasge: 'call scws',
          data: {
            result,
          },
        };
      } catch (e) {
        throw e;
      }
    });

    app.use(publicRoute.middleware());
  }

  setupAppRoute() {
    this.app.use(this.router.middleware());
  }
}
