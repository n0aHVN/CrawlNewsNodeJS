import * as cheerio from 'cheerio';
import axios from 'axios';

export const crawlCategories = async () => {
    const { data: html } = await axios.get("https://tuoitre.vn/");
    const $ = cheerio.load(html);
    const anchors = $('.footer__nav .menu-nav li a').toArray();
    for (const el of anchors) {
        const text = $(el).text().trim();
        if (text === "Trang chủ") continue;

        let href = $(el).attr('href');
        href = href?.replace(/\.htm(l)?$/, '');
        href = href?.replace('/', '');

        const slug = href || '';

        const url = `${process.env.BACKEND_URL}/categories`;

        try {
            const res = await axios.post(url, {
                name: text,
                slug: slug
            });
            console.log(res.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data);
            } else {
                console.log(err);
            }
            
        }
    }

};
