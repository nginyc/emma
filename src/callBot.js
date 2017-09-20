import config from './config';
import nexmo from './nexmo';
import db from './db';

export default () => {
  const USER = 'User';

  nexmo.calls.create({
    from: {
      type: 'phone',
      number: config.FROM_NUMBER
    },
    to: [{
      "content-type": "audio/l16;rate=16000",
      "headers": {
          "aws_key": "xxxxxxxxx",
          "aws_secret": "xxxxxxxxx"
      },
      "type": "websocket",
      "uri": `wss://lex-us-east-1.nexmo.com/bot/Eureka/alias/Eureka/user/${USER}/content`
    }],
    event_url: [config.HOST + '/event'],
    answer_url: [config.HOST + '/answer']
  }, (error, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(response);
      if (response.uuid) {
        db.botCallId = response.uuid;
        console.log('Bot call ID set', response.uuid);
      }
    }
  });
};


