import config from './config';
import nexmo from './nexmo';

export default (no) => {
  nexmo.calls.create({
    from: {
      type: 'phone',
      number: config.FROM_NUMBER
    },
    to: [{
      type: 'phone',
      number: no
    }],
    answer_url: [config.HOST + '/answer']
  }, (error, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(response);
    }
  });
};


