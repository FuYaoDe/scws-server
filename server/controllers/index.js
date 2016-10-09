import Router from 'koa-router';

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

    app.use(publicRoute.middleware());
  }

  setupAppRoute() {
    this.app.use(this.router.middleware());
  }
}
