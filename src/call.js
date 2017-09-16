import Nexmo from 'nexmo';
import fs from 'fs';

const API_KEY = 'f017342b';
const API_SECRET = 'a985b5ffc326f508';
const APPLICATION_ID = 'a110458a-103b-47d4-b628-e4a59d7b9252';
const PRIVATE_KEY = fs.readFileSync('./secret/private.key', 'utf8');
const FROM_NUMBER = 12016728668;
const TO_NUMBER = 14156010194;

const nexmo = new Nexmo({
  apiKey: API_KEY,
  apiSecret: API_SECRET,
  applicationId: APPLICATION_ID,
  privateKey: PRIVATE_KEY
});

nexmo.calls.create({
  from: {
    type: 'phone',
    number: FROM_NUMBER
  },
  to: [{
    type: 'phone',
    number: TO_NUMBER
  }],
  answer_url: ['https://nexmo-community.github.io/ncco-examples/first_call_talk.json']
}, (error, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(response);
  }
});


