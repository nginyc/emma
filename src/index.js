import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
import call from './call';
import say from './say';
import db from './db';
import startRecording from './startRecording';
import nexmo from './nexmo';
import fs from 'fs';
import createGoogleDoc from './gdrive';

const app = express();

app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// Log all requests
app.use((req, res, next) => {
  console.log(`
    [request]
    ${req.method} ${req.path}
    Headers: ${JSON.stringify(req.headers, null, 2)}
    Query: ${JSON.stringify(req.query, null, 2)}
    Body: ${JSON.stringify(req.body, null, 2)}
  `);

  next();
});

app.use('*', cors());
app.get('/', (req, res) => {
  res.render('index', { title: 'Eureka' });
});

app.post('/event', (req, res) => {
  const { recording_url } = req.body;

  if (recording_url) {
    // nexmo.files.get(recording_url, (err, data) => {
    //   fs.writeFile("meeting.mp3", data, function(err) {
    //       if(err) {
    //           return console.log(err);
    //       }

    //       console.log("The file was saved!");


    //       transcribe((body) => {
    //         parser = JSON.parse(body);
    //         console.log(parser.results[0].alternatives[0].transcript)
    //         return parser.results[0].alternatives[0].transcript
    //       });
    //   });
    // });

    const text = 'Members present are Bob, Harry, and Peter. \n Bob has trouble building, Harry to help him. \n Harry is going on PTO tomorrow. \n Company reunion postponed.';

    createGoogleDoc('Meeting Transcript on ' + new Date().toLocaleDateString('en-US'), text, () => {
      console.log("Google doc added!");
    });
  }


  res.status(200);
});



app.get('/answer', (req, res) => {
  const ncco = [
    {
      "action": "conversation",
      "name": "nexmo-conference",
      "record": "true"
    }
  ];

  // Call the next number after answering
  if (db.nos.length > 0) {
    console.log('Calling next number from', db.nos);
    call(db.nos[0]);
    db.nos.splice(0, 1);
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(JSON.stringify(ncco));
});

app.get('/recordings', (req, res) => {
});

app.get('/answer_record', (req, res) => {
  const ncco = [
    {
      "action": "record",
      "eventUrl": [config.HOST + "/recordings"],
      "endOnSilence": "3"
    },
    {
      "action": "conversation",
      "name": "nexmo-conference"
    }
  ];

  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(JSON.stringify(ncco));
});

app.post('/call', (req, res) => {
  const { nos } = req.body;
  console.log('Calling next number from', nos);
  call(nos[0]);
  nos.splice(0, 1);
  db.nos = [...nos];

  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(JSON.stringify({ success: true }));
});

app.post('/lex', (req, res) => {
  const { currentIntent } = req.body.event;

  if (currentIntent && db.callId) {
    switch (currentIntent.name) {
      case 'RecordThis':
        startRecording();
        break;
    }
  }

  res.status(200);
  res.send(JSON.stringify({ success: true }));
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
      .render('error', { message: err.message });
});

app.listen(8080, () => {
  console.log('App listening on port 8080!');
});
;
