import express from 'express';
import cors from 'cors';
import { uniqueCount } from './lib/utils.js';
import { getInstagramCount, getTwitterCount } from './lib/scraper.js';
import db from './lib/db.js';
import './lib/cron.js';
import aggregate from './lib/aggregate.js';

const app = express();
app.use(cors());

app.get(`/scrape`, async (req, res, next) => {
  console.log(`Scraping!!`);
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount(),
  ]);
  res.json({ iCount, tCount });
});

app.get(`/data`, async (req, res, next) => {
  // get the scrape data
  const { twitter, instagram } = db.value();
  // filter for only unique values
  const unqiueTwitter = uniqueCount(twitter);
  const uniqueInstagram = uniqueCount(instagram);
  // respond with json
  res.json({ twitter: unqiueTwitter, instagram: uniqueInstagram });
});

app.get(`/aggregate`, async (req, res, next) => {
  // get the scrape data
  const { twitter, instagram } = db.value();
  // filter for only unique values
  const unqiueTwitter = uniqueCount(twitter);
  const uniqueInstagram = uniqueCount(instagram);
  // need to aggregate these values.
  // respond with json
  res.json({ twitter: aggregate(twitter), instagram: aggregate(instagram) });
});

app.listen(2093, () => {
  console.log(`Example App running on port http://localhost:2093`);
});
