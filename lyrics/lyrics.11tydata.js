import { titleCase } from "title-case";

export default {
    layout: "layouts/lyrics.html",
    tags: [
        "lyrics"
    ],
    eleventyComputed: {
        title: data => titleCase(data.title || data.page.fileSlug),
        eleventyNavigation: {
            key: data => data.title,
            parent: data => data.title == "Lyrics" ? "Technically Competent" : "Lyrics",
        }
    },
};
