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

  async call({ content, charset, showSymbol, attribute, time }) {
    try {
      charset = charset ? `-c ${charset}` : '';
      showSymbol = showSymbol ? '' : '-I';
      attribute = attribute ? '-A' : '';
      time = time ? '' : '-N';

      const xdbsPath = await this.loadXDBDict();

      const cmd = `/usr/local/scws/bin/scws -i "${content}" -d ${xdbsPath}\
        ${charset} ${showSymbol} ${time} ${attribute}`;
      console.log(cmd);
      const result = await exec(cmd)
      .then((cmdResult) => {
        console.log(cmdResult.stdout);
        return cmdResult.stdout
      })
      .catch((e) => { throw e; });
      return result.split(' ');
    } catch (e) {
      throw e;
    }
  }
}
