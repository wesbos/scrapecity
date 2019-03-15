import express from 'express';
import { getInstagramCount, getTwitterCount } from './lib/scraper';
import db from './lib/db';
import './lib/cron';

const app = express();

app.get('/scrape', async (req, res, next) => {
  console.log('Scraping!!');
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount(),
  ]);
  res.json({ iCount, tCount });
});

app.listen(2093, () => {
  console.log(`Example App running on port 2093`);
});
