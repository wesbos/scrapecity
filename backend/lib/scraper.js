import axios from 'npm:axios';
import { load } from 'npm:cheerio';
import db from './db.js';

export async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

export async function getTwitterFollowers(html) {
  const $ = load(html);
  const span = $('.profile-stat-num');
  const count = $(span[2]).text().replace(',','');
  return parseInt(count);
}

export async function getInstagramFollowers(html) {
  console.log(html);
  return;
  // load up Cheerio
  const $ = load(html);
  const dataInString = $('script[type="application/ld+json"]').html();
  const pageObject = JSON.parse(dataInString);
  return parseInt(
    pageObject.mainEntityofPage.interactionStatistic.userInteractionCount
  );
}

export async function getInstagramCount() {
  // const html = await getHTML('https://instagram.com/wesbos');
  // this is broken right now
  const json = await fetch("https://www.instagram.com/api/v1/users/web_profile_info/?username=wesbos").then(x => x.json());
  return {
    platform: 'instagram',
    count: json.data.user.edge_followed_by.count
  };
}
export async function getTwitterCount() {
  const html = await getHTML('https://nitter.net/wesbos');
  const twitterCount = await getTwitterFollowers(html);
  return {
    platform: 'twitter',
    count: twitterCount
  };
}

export async function getTikTokCount() {
  const html = await getHTML('https://tiktok.com/@wesbos');
  const regex = new RegExp(`(followerCount":)([0-9]*)`, 'i');
  const results = regex.exec(html);
  return {
    platform: 'tiktok',
    count: parseInt(results[2])
  };
}

export async function runCron() {
  console.log('Running Cron');

  const results = await Promise.allSettled([
    getInstagramCount(),
    getTwitterCount(),
    getTikTokCount()
  ]).catch(console.error);

  console.log(results);
  for(const response of results) {
    if(response.status === 'rejected') continue;
    const result = response.value;
    console.log('Trying to save', result.platform)
    db.data[result.platform].push({
      date: Date.now(),
      count: result.count
    })
    await db.write();
  }

  console.log('Done!')
}
