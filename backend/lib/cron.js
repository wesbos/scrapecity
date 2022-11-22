import cron from 'npm:node-cron';
import { runCron } from './scraper.js';

cron.schedule(`0,15,30,45,59 * * * *`, () => {
  console.log(`⏲️ RUNNING THE CRON`);
  runCron();
});
