import { app } from "./app";
import { crawlCategories } from "./job/crawl-categories.job";
import dotenv from 'dotenv';
import { crawlNewLinks, crawlNewsContent } from "./job/crawl-news.job";
dotenv.config();

const start = async () =>{
    await crawlCategories();
    await crawlNewLinks();
    await crawlNewsContent();
};

start();