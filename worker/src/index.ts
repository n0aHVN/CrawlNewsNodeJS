import { app } from "./app";
import { crawlCategories } from "./job/crawl-categories.job";
import dotenv from 'dotenv';
import { crawlNewLinks, crawlNewsContent } from "./job/crawl-news.job";
import cron from "node-cron";
dotenv.config();

const start = async () =>{
    await crawlCategories();
    await crawlNewLinks();
    await crawlNewsContent();
};

start();

// Schedule to run every 1 hour
cron.schedule('0 * * * *', async () => {
    console.log('Running crawling jobs (scheduled)...');
    await start();
});