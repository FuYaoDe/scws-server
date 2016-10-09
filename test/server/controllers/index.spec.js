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
});
