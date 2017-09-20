import fs from 'fs';

export default {
   API_KEY: 'xxxxxxxx',
   API_SECRET: 'xxxxxxxx',
   APPLICATION_ID: 'xxxxxxxx',
   PRIVATE_KEY: fs.readFileSync('./secret/private.key', 'utf8'),
   FROM_NUMBER: 'xxxxxxxx',
   TO_NUMBER: 'xxxxxxxx',
   TO_NUMBER_2: 'xxxxxxxx',
   HOST: 'xxxxxxxx',
};


