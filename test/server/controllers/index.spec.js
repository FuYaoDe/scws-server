describe('test server', () => {

  it('test', async(done) => {
    try {
      const result = await request.get('/');
      result.status.should.be.equal(200);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('scws hide Symbol、hide attribute', async(done) => {
    try {
      const result = await request.post('/scws').send({
        content: '分词测试',
        charset: 'utf8',
        showSymbol: false,
        showAttribute: false,
      });
      result.status.should.be.equal(200);
      result.body.data.wordArray.length.should.be.above(0);
      result.body.data.textLen.should.be.above(0);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('scws hide Symbol、show attribute', async(done) => {
    try {
      const result = await request.post('/scws').send({
        content: '分词测试',
        charset: 'utf8',
        showSymbol: false,
        showAttribute: true,
      });
      result.status.should.be.equal(200);
      result.body.data.wordArray.length.should.be.above(0);
      result.body.data.textLen.should.be.above(0);
      done();
    } catch (e) {
      done(e);
    }
  });
});
