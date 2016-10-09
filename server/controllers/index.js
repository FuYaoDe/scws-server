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
        ctx.body = { result: 'OK' };
      } catch (e) {
        ctx.body = { error: e };
      }
    });

    app.use(publicRoute.middleware());
  }

  setupAppRoute() {
    this.app.use(this.router.middleware());
  }
}
