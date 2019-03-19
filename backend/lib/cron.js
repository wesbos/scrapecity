import cron from 'node-cron';
import { runCron } from './scraper';

cron.schedule('0,30 * * * * *', () => {
  console.log('⏲️ RUNNING THE CRON');
  runCron();
});
