import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import pluginRss from "@11ty/eleventy-plugin-rss";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { inspect } from "util";


export default (eleventyConfig) => {
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addFilter("debug", (content) => `<pre>${inspect(content)}</pre>`);
    eleventyConfig.addFilter("formatDate", (date) => date.toISOString().replace(/T.*/, "") );

    eleventyConfig.amendLibrary("md", mdLib => mdLib.set({ breaks: true }));

    eleventyConfig.addPassthroughCopy('assets');

    return {
        dir: {
            input: './',
            output: '_site',
            includes: '_includes',
        }
    };
};
