import Nexmo from 'nexmo';
import * as config from './config';

const nexmo = new Nexmo({
  apiKey: config.API_KEY,
  apiSecret: config.API_SECRET,
  applicationId: config.APPLICATION_ID,
  privateKey: config.PRIVATE_KEY
});

const callAll = (phoneNumbers) => {
  phoneNumbers.forEach((x) => {
    nexmo.calls.create({
      from: {
        type: 'phone',
        number: config.FROM_NUMBER
      },
      to: [{
        type: 'phone',
        number: x
      }],
      answer_url: [config.HOST + '/ncco/conference.json']
    }, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log(response);
      }
    });
  });
}

callAll([config.TO_NUMBER, config.TO_NUMBER_2]);

