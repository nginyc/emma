import config from './config';
import nexmo from './nexmo';

export default (callId, text) => {
  nexmo.calls.talk.start(
    callId,
    {
      text: text,
      voiceName: 'Emma'
    }
  );
};


