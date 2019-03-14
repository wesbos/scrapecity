import wait from 'waait';
import {
  getHTML,
  getTwitterFollowers,
  getInstagramFollowers,
} from './lib/scraper';

async function go() {
  const iPromise = getHTML('https://instagram.com/wesbos');
  const tPromise = getHTML('https://twitter.com/wesbos');
  const [instagramHTML, twitterHTML] = await Promise.all([iPromise, tPromise]);
  const instagramCount = await getInstagramFollowers(instagramHTML);
  const twCount = await getTwitterFollowers(twitterHTML);
  console.log(
    `You have ${twCount} twitter followers and ${instagramCount} instagram followers`
  );
}

go();
