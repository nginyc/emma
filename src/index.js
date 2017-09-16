import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';

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

app.listen(8080, function () {
  console.log('App listening on port 8080!')
})