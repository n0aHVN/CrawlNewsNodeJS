import * as cheerio from 'cheerio';
import axios from 'axios';
import { DateTime } from 'luxon';
// hrefSet is used to store unique links with their data-id to avoid duplicates
const hrefSet = new Set<{ dataId: string, href: string }>();
// This will hold the slugs of categories fetched from the backend
let categorySlugs: string[] = [];
export const crawlNewLinks = async () => {
    console.log("Crawling new links from Tuoi Tre...");
    // Fetch the categories from the backend
    const backendCategoriesData = (await axios.get(process.env.BACKEND_URL! + "/categories")).data;
    categorySlugs = backendCategoriesData.map((category: any) => {
        return category.slug;
    });

    // Fetch all the news links from Tuoi Tre based on the category slugs
    for (const categorySlug of categorySlugs) {
        // Construct the URL for the category page
        // Example: https://tuoitre.vn/the-thao.htm
        const tuoitreCategories_link = "https://tuoitre.vn" + '/' + categorySlug + '.htm';
        const { data: tuoiTreHTML, status: responseStatus } = (
            await axios.get(tuoitreCategories_link)
        );
        // Check if the response status is OK
        if (responseStatus !== 200) {
            console.error(`Failed to fetch category page: ${tuoitreCategories_link}, status code: ${responseStatus}`);
            continue; // Skip to the next category if the request fails
        }
        // Load the HTML into cheerio for parsing
        const $ = cheerio.load(tuoiTreHTML);
        const anchors = $('a[data-id]').toArray();
        // Loop through each anchor element to extract the href and data-id attributes
        for (const el of anchors) {
            try {
                const href = $(el).attr('href');
                const dataId = $(el).attr("data-id");
                console.log(`Crawling link: ${href} with data-id: ${dataId}`);
                // Check if href and dataId are valid
                if (href && !hrefSet.has({ dataId: dataId!, href: href! })) {
                    console.log(`Checking if news with data-id ${dataId} already exists in the backend...`);
                    const ifExist = await axios.get(process.env.BACKEND_URL! + "/articles/check/" + dataId);

                    if (ifExist.data.exists) {
                        console.log(`News with data-id ${dataId} already exists in the backend. Skipping...`);
                        continue;
                    }
                    hrefSet.add({ dataId: dataId!, href: href! });
                }
            }
            catch (error: any) {
                console.error(`Error processing link ${$(el).attr('href')}:`, error);
                continue; // Skip to the next link if there's an error
            }
            
        }
    }
    console.log("Crawled links:", hrefSet.size);
};

export const crawlNewsContent = async () => {
    console.log("Crawling news content from Tuoi Tre...");
    for (const entry of Array.from(hrefSet)) {
        try {
            const { href, dataId } = entry;
            //Timeout
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

            const newLink = "https://tuoitre.vn" + href;
            const { data: tuoiTreHTML, request } = (
                await axios.get(newLink)
            );
            const $ = cheerio.load(tuoiTreHTML);
            // News Title
            const title = $('.detail-title').text().trim();

            // News Author
            const author = $('.author-info .name').text().trim();

            // News Category Slug
            let categorySlug = $('div.detail-cate a ').attr('href');
            categorySlug = categorySlug?.replace('/', '');
            categorySlug = categorySlug?.replace('.htm', '');

            // News Category ID
            console.log(process.env.BACKEND_URL! + "/categories/" + categorySlug);
            const categoryId = (await axios.get(process.env.BACKEND_URL! + "/categories/" + categorySlug)).data.id;

            // News Publish Date
            const publishDate = $('div[data-role = publishdate]').text().trim();
            const formattedDate = DateTime.fromFormat(publishDate, "dd/MM/yyyy HH:mm 'GMT'Z", {
                zone: "UTC+7"
            }).toJSDate();

            // New URL
            const originUrl = request.res.responseUrl;
            // Extract slug from href
            let slug = href.replace(/-([^-.]+)\.htm$/, "");
            slug = slug.replace("/", "");
            // News Content 
            let content = $('h2[class=detail-sapo]').text().trim();
            content += "\n";
            $('div.detail-cmain p').toArray().forEach((el) => {
                content += $(el).text().trim();
                content += '\n';
            });

            const data = {
                data_id: dataId,
                title,
                slug,
                author,
                category_id: categoryId,
                published_at: formattedDate,
                origin_url: originUrl,
                content
            }


            console.log(data);
            // Post data to backend
            console.log(`Posting news with slug: ${slug} to backend...`);
            await axios.post(process.env.BACKEND_URL! + "/articles", data);
        }
        catch (error: any) {
            console.error(`Error processing link ${entry.href}:`, error);
            continue; // Skip to the next link if there's an error
        }


    }
    console.log("Crawled news content successfully.");
}