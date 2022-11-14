import axios from 'axios';
import { load } from 'cheerio';
import db from './db.js';

export async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

export async function getTwitterFollowers(html) {
  // Regex follower count in
  // const regex = new RegExp(`"followers_count":([0-9]*)`);
  // const result = regex.exec(html);
  // console.log(result)
  // return parseInt(countAsString);
  // // load up cheerio
  const $ = load(html);
  const span = $('.profile-stat-num');
  const count = $(span[2]).text().replace(',','');
  return parseInt(count);
}

export async function getInstagramFollowers(html) {
  // load up Cheerio
  const $ = load(html);
  const dataInString = $('script[type="application/ld+json"]').html();
  const pageObject = JSON.parse(dataInString);
  return parseInt(
    pageObject.mainEntityofPage.interactionStatistic.userInteractionCount
  );
}

export async function getInstagramCount() {
  const html = await getHTML('https://instagram.com/wesbos');
  const instagramCount = await getInstagramFollowers(html);
  return instagramCount;
}
export async function getTwitterCount() {
  const html = await getHTML('https://nitter.net/wesbos');
  const twitterCount = await getTwitterFollowers(html);
  return twitterCount;
}

export async function runCron() {
  const [/* iCount, */tCount] = await Promise.all([
    // getInstagramCount(),
    getTwitterCount(),
  ]);

  console.log(tCount);

  // db.data.twitter
  //   .push({
  //     date: Date.now(),
  //     count: tCount,
  //   });
  // await db.write();
  // db.data.instagram
  //   .push({
  //     date: Date.now(),
  //     count: iCount,
  //   })
  //   .write();
  // console.log('Done!');
}

runCron();
