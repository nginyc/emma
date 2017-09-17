import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
import call from './call';

const db = {
  nos: []
};

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
  console.log('EVENT');
  res.status(200);
});

app.get('/answer', (req, res) => {

  const ncco = [
    {
      "action": "conversation",
      "name": "nexmo-conference-standard"
    }
  ];

  // Call the next number after answering
  if (db.nos.length > 0) {
    console.log('Calling next number from', db.nos);
    call(db.nos[0]);
    db.nos.splice(0, 1);

    const USER = '1';

    if (db.nos.length == 0) {
      ncco.push({
        "action": "connect",
        "endpoint": [
            {
              "content-type": "audio/l16;rate=16000",
              "headers": {
                  "aws_key": "AKIAJVAN6MOZPWKE2UIQ",
                  "aws_secret": "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"
              },
              "type": "websocket",
              "uri": `wss://lex-us-east-1.nexmo.com/bot/Eureka/alias/Eureka/user/${USER}/content`
            }
        ],
        "eventUrl": [
            config.HOST + '/event'
        ]
      });
    }
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(JSON.stringify(ncco));
});

app.post('/call', (req, res) => {
  const { nos } = req.body;
  console.log('Calling next number from', nos);
  call(nos[0]);
  nos.splice(0, 1);
  db.nos = nos;

  res.setHeader('Content-Type', 'application/json');
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
