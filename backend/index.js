import express from 'express';
import cors from 'cors';

import { getInstagramCount, getTwitterCount } from './lib/scraper';
import db from './lib/db';
import './lib/cron';

const app = express();
app.use(cors());

app.get('/scrape', async (req, res, next) => {
  console.log('Scraping!!');
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount(),
  ]);
  res.json({ iCount, tCount });
});

app.get('/data', async (req, res, next) => {
  // get the scrape data
  const twitter = db.value();
  // respond with json
  res.json(twitter);
});

app.listen(2093, () => {
  console.log(`Example App running on port http://localhost:2093`);
});
