import SCWS from '../../../server/services/scws';

describe('about scws service', () => {
  let scws;
  before(async(done) => {
    try {
      scws = new SCWS();
      done();
    } catch (e) {
      done(e);
    }
  });

  it('load xdb', async(done) => {
    try {
      const result = await scws.loadXDBDict();
      console.log(result);
      done();
    } catch (e) {
      done(e);
    }
  });
});
