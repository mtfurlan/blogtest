import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import pluginRss from "@11ty/eleventy-plugin-rss";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { inspect } from "util";
import  markdownIt from "markdown-it";


export default (eleventyConfig) => {
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addFilter("debug", (content) => `<pre>${inspect(content)}</pre>`);
    eleventyConfig.addFilter("formatDate", (date) => `<time datetime="${date.toISOString()}">${date.toISOString().replace(/T.*/, "")}</time>` );


    eleventyConfig.amendLibrary("md", (mdLib) => {
        mdLib.set({
            linkify: true,
        });
        mdLib.linkify.set({
            fuzzyEmail: false,
            fuzzyLink: false,
            fuzzyIP: false,
        });
    });


    // for lyrics, we want to render newlines more often
    // so we have to use a different instance of the renderer
    let mdBreaks = markdownIt({
        breaks: true,
    })
    eleventyConfig.addTemplateFormats("mdbreaks");
    eleventyConfig.addExtension("mdbreaks", {
        compile: async (inputContent) => async () => mdBreaks.render(inputContent),
    });

    eleventyConfig.addPassthroughCopy('assets');

    return {
        dir: {
            input: './',
            output: '_site',
            includes: '_includes',
        }
    };
};
