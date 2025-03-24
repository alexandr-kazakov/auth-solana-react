import { createRequire } from 'module';
import path from 'path';
const __dirname = path.resolve();
const require = createRequire(import.meta.url);

const process = require('process');

const express = require('express');
const history = require('connect-history-api-fallback');

const app = express();
const staticFileMiddleware = express.static(path.join(__dirname, '/dist'));
const port = process.env.PORT || 8080;

app.enable('trust proxy');

app.use((req, res, next) => {
  req.secure ? next() : res.redirect(`https://${req.headers.host}${req.url}`);
});

app.use(history());
app.use(staticFileMiddleware);

app.listen(port, () => {
  console.log(`Express serving on ${port}!`);
});
