import Nexmo from 'nexmo';
import config from './config';

const nexmo = new Nexmo({
  apiKey: config.API_KEY,
  apiSecret: config.API_SECRET,
  applicationId: config.APPLICATION_ID,
  privateKey: config.PRIVATE_KEY
});

export default nexmo;
