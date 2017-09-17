import config from './config';
import nexmo from './nexmo';
import say from './say';
import db from './db';

export default () => {
  console.log('Start recording.');
  nexmo.calls.update(db.botCallId, {
    'action': 'transfer',
    "destination": {
      "type": "ncco",
      "url": [config.HOST + '/answer_record']
    }
  }, (error, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(response);
    }
  });
};

