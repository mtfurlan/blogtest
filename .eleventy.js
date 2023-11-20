import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import pluginRss from "@11ty/eleventy-plugin-rss";

export default (config) => {
  config.addPlugin(EleventyHtmlBasePlugin);
  config.addPlugin(pluginRss);

  return {
    dir: {
      input: './',
      output: '_site',
      includes: '_includes',
    }
  };
};
