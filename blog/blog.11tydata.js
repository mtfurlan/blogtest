import { titleCase } from "title-case";

export default {
    layout: "layouts/post.html",
    tags: [
        "blog"
    ],
    eleventyComputed: {
        title: data => titleCase(data.title || data.page.fileSlug),
        eleventyNavigation: {
            key: data => data.title,
            parent: data => data.title == "Blog" ? "Technically Competent" : "Blog",
        }
    },
};
