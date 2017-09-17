import config from './config';
import nexmo from './nexmo';

export default () => {
  const USER = '1';

  nexmo.calls.create({
    from: {
      type: 'phone',
      number: config.FROM_NUMBER
    },
    to: [{
      "content-type": "audio/l16;rate=16000",
      "headers": {
          "aws_key": "AKIAJVAN6MOZPWKE2UIQ",
          "aws_secret": "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"
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
    }
  });
};


