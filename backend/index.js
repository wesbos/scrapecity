import express from 'npm:express';
import cors from 'npm:cors';
import ms from 'npm:ms';
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

  const { twitter, instagram } = db.data;
  console.log(twitter)
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

app.get('/incremental', async (req, res) => {
  const now = Date.now();
  const threeDays = 1000 * 60 * 60 * 24 * 3;
  const twitter = db.data.twitter.slice(3500).filter((tweet) => tweet.date > now - threeDays);

  const html = /*html*/`<ul>
    ${twitter.map(function(tweet, index) {
      const diffTime = Math.round((now - tweet.date) / 1000 / 60 / 60);
      const diffCount = tweet.count - twitter[index - 1]?.count;
      if(diffCount === 0) return '';
      return `<li
        style="color: ${diffCount > 0 ? 'green' : 'red'}"
      >${diffCount > 0 ? '+' : ''}${diffCount} (${diffTime} h)</li>`
    }).join('')}
  </ul>`;

  res.send(html)

});

app.listen(2093, () => {
  console.log(`Example App running on port http://localhost:2093`);
});


