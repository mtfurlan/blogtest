import { titleCase } from "title-case";

export default {
    layout: "layouts/lyrics.html",
    tags: [
        "lyrics"
    ],
    eleventyComputed: {
        title: data => data.title || titleCase(data.page.fileSlug),
        eleventyNavigation: {
            key: data => data.title,
            parent: data => data.index ? "Technically Competent" : "Lyrics",
        },
        templateEngineOverride: data => data.index ? "liquid" : "mdbreaks",
    },
};
