import debug from 'debug';
import { exec } from 'child-process-promise';
import fs from 'fs';

export default class scws {

  async loadXDBDict() {
    try {
      const xdbPath = `${__dirname}/../../XDB`;
      const files = fs.readdirSync(xdbPath);
      return files.map((file) => `${xdbPath}/${file}`).join(':');
    } catch (e) {
      throw e;
    }
  }

  getInfo(input) {
    return {
      textLen: input.match(new RegExp('TextLen:\\s*([0-9]*)\\s*'))[1],
      prepareTime: input.match(new RegExp('Prepare:\\s*([0-9.]*)\\s*'))[1],
      segmentTime: input.match(new RegExp('Segment:\\s*([0-9.]*)\\s*'))[1],
    };
  }

  async call({ content, charset, showSymbol, showAttribute }) {
    try {
      charset = charset ? `-c ${charset}` : '-c utf8';
      showSymbol = showSymbol ? '' : '-I';
      showAttribute = showAttribute ? '-A' : '';

      const xdbsPath = await this.loadXDBDict();

      const cmd = `/usr/local/scws/bin/scws -i "${content}" -d ${xdbsPath}\
        ${charset} ${showSymbol} ${showAttribute}`;
      debug('dev')(cmd);
      const result = await exec(cmd)
      .then((cmdResult) => cmdResult)
      .catch((e) => { throw e; });
      const wordArray = result.stdout.split(' ');
      wordArray.pop();

      return {
        stdout: result.stdout,
        wordArray,
        ...this.getInfo(result.stderr),
      };
    } catch (e) {
      throw e;
    }
  }
}
