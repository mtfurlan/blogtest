import { titleCase } from "title-case";

export default {
    layout: "layouts/post.html",
    tags: [
        "notes"
    ],
    eleventyComputed: {
        title: data => data.title || titleCase(data.page.fileSlug),
        eleventyNavigation: {
            key: data => data.title,
            parent: data => data.title == "Notes" ? "Technically Competent" : "Notes",
        }
    },
};
