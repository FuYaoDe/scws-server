describe('test server', () => {

  it('test', async(done) => {
    try {
      const result = await request.get('/');
      // result.status.should.be.equal(200);
      console.log(result.body);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('scws hide Symbol、hide attribute、hide time and warnings', async(done) => {
    try {
      const result = await request.post('/scws').send({
        content: `同时也对 假日期间厕所革命滞后、环境脏乱、管理混乱、服务恶劣的旅游经营单位和从业人员以及不文明游客 进行了曝光`,
        charset: 'utf8',
        showSymbol: false,
        attribute: false,
        time: false,
      });
      // result.status.should.be.equal(200);
      console.log(result.body);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('scws hide Symbol、hide attribute、show time and warnings', async(done) => {
    try {
      const result = await request.post('/scws').send({
        content: `同时也对 假日期间厕所革命滞后、环境脏乱、管理混乱、服务恶劣的旅游经营单位和从业人员以及不文明游客 进行了曝光`,
        charset: 'utf8',
        showSymbol: false,
        attribute: false,
        time: true,
      });
      // result.status.should.be.equal(200);
      console.log(result.body);
      done();
    } catch (e) {
      done(e);
    }
  });
});
