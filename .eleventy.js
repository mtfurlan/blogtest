import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import pluginRss from "@11ty/eleventy-plugin-rss";

export default (eleventyConfig) => {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(pluginRss);


  eleventyConfig.amendLibrary("md", mdLib => mdLib.set({ breaks: true }));

  return {
    dir: {
      input: './',
      output: '_site',
      includes: '_includes',
    }
  };
};
