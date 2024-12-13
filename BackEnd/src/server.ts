import * as dotenv from 'dotenv';

import App from './app';
import routes from './loaders/Routes';

dotenv.config();

const app = new App(routes);

app.listen();
