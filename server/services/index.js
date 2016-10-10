import config from '../config/init';
import SCWSService from './scws';

export default class Services {
  constructor() {
    this.scws = new SCWSService();
  }
}
