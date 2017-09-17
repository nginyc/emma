import config from './config';
import nexmo from './nexmo';

export default (nos) => {
  nexmo.calls.create({
    from: {
      type: 'phone',
      number: config.FROM_NUMBER
    },
    to: [nos.map(x => ({
      type: 'phone',
      number: x
    }))],
    answer_url: [config.HOST + '/answer']
  }, (error, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(response);
    }
  });
};


