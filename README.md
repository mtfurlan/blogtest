---
layout: layouts/base
title: README
override:tags: [scaffolding]
eleventyNavigation:
  key: README
  parent: Technically Competent
---
# my personal website

## design notes
### markdown languages
eleventy supports a bunch, I don't use most

I'm using liquid for html html, markdownIt default, and markdownIt but with
breaks enabled
I'm also using nunjucks for structural stuf like redirects and the rss feed

Right now my writing style is confused about line breaks

[this is not a unique phenonoma](https://foone.tumblr.com/post/775018153833103360/its-annoying-when-i-copy-stories-off-my-old)
but it is annoying

Because on one hand, I wrap text at 80 colums in files, and continuing in that
case makes sense

On the other, full paragraph breaks look weird, I need that short sentence
thing sometimes

So right now I have two markdown renderer settings and it's weird

Maybe fight the renderer so two lines are paragraph, one blank line is the
short break?
But it still looks weird raw
So maybe just accept that my text is 80 chars wide on the output?

### categories
I have a few high level categories like "blog" or "drafts" or "lyrics"

11ty has a concept of collections, which it uses for things like "display all
blog posts" or building a navigation thingy
https://www.11ty.dev/docs/collections/

So I have a collection for my high level categories, and I have a collection
for "scaffolding", or pages like blog/index.html that aren't real content that
I want to show up in a "recently updated" section

You generate collections by adding tags to things, so I assume I could also
have a tag cloud this way, but I would need to keep a separate list of my
collections

Each category is done by putting files in $category/$post.md, and then a
[directory data file](https://www.11ty.dev/docs/data-template-dir/)
(`$category/$category.11tydata.js`) sets up stuff

`$category.index.html` lists all posts in that category

Those are really just magic files right now that call the relevant templates, and I would like to automate it with like
`let categories = ["blog", "drafts", "lyrics"]` and it knows to parse those directories

### Git workflow
conventional commits

type thoughts:
* content $category (blog, lyrics, ...) should this be content($category) not
  $category($post)?
* build: eleventy tooling
* ci: github actions
* chore
* feat/fix/refactor relate to site structure or code features

### Questions/ideas
#### Navbar layout
* Include current page in breadcrumbs?
  * If not, just have nothing on landing page?
  * If not, also add back in trailing >>

#### landing page ideas
* node visualization of interlinks could be cool, but I'm not interlinking enough
* blog posts down the side, each linked to prev and next

### TODOs
* [[links?]]
* blog/index, add short descriptions?
* wiki/notes pages
  * backlinks: https://github.com/binyamin/eleventy-garden
* fingerprinting css? https://www.brycewray.com/posts/2022/09/cache-busting-eleventy-simpler-way-sass/
* finalize page layout a little more
* sort lyrics by title
* image alt text mouseover
* semantic layout passthrough
* getGitLastUpdatedTimeStamp: handle unstaged changes
* link to me elsewhere
  * github
  * ???
* fight renderers so html is more human readable?
* do validation on html after render?


## Design Literature Reivew
* https://qntm.org/
  * title: `$pageTitle @ Things Of Interest`
  * navigation: breadcrumbs, no website title
* https://utcc.utoronto.ca/~cks/space/blog/
  * title: `Chris's Wiki :: $slug`
  * navigation: breadcrumbs, no website title
  * navigation: sidebar on right with website info
* https://computer.rip
  * title: `$date $pageTitle`
  * navigation: navbar
* http://elm-chan.org
  * title: Most leaf pages are `$pageTitle`, most categories are `ELM - $category`
  * navigation: no consistency
* https://qwertyuiop.ninja
  * title: `$pageTitle`
  * navigation: navbar with home
* https://agmlego.com/
  * title: `AGMLego Blog · $pageTitle -- $date`
  * navigation: navbar with categories
* https://rachelbythebay.com/
  * title: `$pageTitle`
  * navigation: header button to writing from blog posts
* https://www.jwz.org/blog/
  * title: `jwz: $pageTitle`
  * navigation: prev/next & navbar
* https://www.schneier.com/
  * title: `$pageTitle - Schneier on Security`
  * navigation: breadcrumbs & navbar
* https://www.pentadact.com
  * title: `$pageTitle - a post on Tom Francis' blog`
  * navigation: navbarr
* https://www.antipope.org/charlie/blog-static/  `$pageTitle - Charlie's Diary`
  * navigation: prev/next & navbar
* https://krebsonsecurity.com/
  * title: `$pageTitle - Krebs on Security`
  * navigation: navbarr
* https://www.bldgblog.com/
  * title: `$pageTitle - BLDBLOG`
  * navigation: link to home

