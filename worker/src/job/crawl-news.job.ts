import * as cheerio from 'cheerio';
import axios from 'axios';
import { DateTime } from 'luxon';
const hrefSet = new Set<string>();
let categorySlugs = [];
export const crawlNewLinks = async () => {
    const backendCategoriesData = (await axios.get(process.env.BACKEND_URL! + "/categories")).data;

    categorySlugs = backendCategoriesData.map((category: any) => {
        return category.slug;
    });

    for (const categorySlug in categorySlugs) {
        const tuoitreCategories_link = "https://tuoitre.vn" + '/' + categorySlug + '.htm';
        const { data: tuoiTreHTML } = (
            await axios.get(tuoitreCategories_link)
        );
        const $ = cheerio.load(tuoiTreHTML);
        const anchors = $('.box-category-link-title').toArray();
        for (const el of anchors) {
            const href = $(el).attr("href");
            if (href && !hrefSet.has(href)) {
                hrefSet.add(href);
            }
        }
    }
};

export const crawlNewsContent = async ()=>{
    // for (const href in Array.from(hrefSet)){
    //     const newLink = "https://tuoitre.vn" + '/' + href;
    //     const { data: tuoiTreHTML } = (
    //         await axios.get(newLink)
    //     );
    //     const $ = cheerio.load(tuoiTreHTML);

    //     const title = $('.detail-title').text().trim();
    //     const slug = href;
    //     const author = $('.author-info .name').text().trim();
    //     const publishDate = $('div[data-role = publishdate]').text().trim();
    //     let content = $('h2[class=detail-sapo]').text().trim();
    //     content += "\n";
    //     $('div.detail-cmain p').toArray().forEach((el)=>{
    //         content += $(el).text().trim();
    //         content+='\n';
    //     });
    // }
        const newLink = "https://tuoitre.vn/canh-tuong-hiem-co-o-pho-co-hoi-an-ngap-lut-giua-mua-he-20250613164006642.htm";
        const { data: tuoiTreHTML, request } = (
            await axios.get(newLink)
        );
        const $ = cheerio.load(tuoiTreHTML);

        const title = $('.detail-title').text().trim();
        console.log(title);
        
        const author = $('.author-info .name').text().trim();
        console.log(author);
        
        const publishDate = $('div[data-role = publishdate]').text().trim();
        const formattedDate = DateTime.fromFormat(publishDate, "dd/MM/yyyy HH:mm 'GMT'Z", {
            zone: "UTC+7"
        }).toJSDate();
        console.log(formattedDate);
        
        // const originUrl = newLink;
        const originUrl = request.res.responseUrl;
        console.log(originUrl);
        
        

        let content = $('h2[class=detail-sapo]').text().trim();
        content += "\n";
        $('div.detail-cmain p').toArray().forEach((el)=>{
            content += $(el).text().trim();
            content+='\n';
        });
        console.log(content);
        
        
}