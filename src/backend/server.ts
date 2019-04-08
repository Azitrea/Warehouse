import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as path from 'path';
import { createConnection } from 'typeorm';
import setRoutes from './routes';


const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.set('port', (process.env.PORT || 3001));

app.use(cors(corsOptions));
// app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

createConnection().then(connection => {
  process.stdout.write('Connected to MySQL DB\n');

  setRoutes(app);

  app.get('/', (req, res) => {
    res.send('Hello');
  });

  app.listen(app.get('port'), () => {
    process.stdout.write('HTTP server listening on port ' + app.get('port'));
  });

});

export { app };
