import fs from 'fs';

const API_KEY = 'f017342b';
const API_SECRET = 'a985b5ffc326f508';
const APPLICATION_ID = 'a110458a-103b-47d4-b628-e4a59d7b9252';
const PRIVATE_KEY = fs.readFileSync('./secret/private.key', 'utf8');
const FROM_NUMBER = '12016728668';
const TO_NUMBER = '16504579476';
const TO_NUMBER_2 = '14156010194';
const HOST = 'http://eureka-env.us-east-1.elasticbeanstalk.com';
