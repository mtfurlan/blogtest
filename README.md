---
layout: layouts/base
title: README
eleventyNavigation:
  key: README
  parent: Technically Competent
---
# blogtest

## notes on eleventy
* Edit _data_eleventyComputed.js to debug data cascade

## Site Layout maybe
```
.
├── README.md
├── notes -> /notes/index.md: list of notes
│   ├── some.md -> /notes/some/
│   └── notes.md -> /notes/notes/
├── blog -> /blog/index.html: list of blog posts
│   ├── posts.something
│   │   └── bunch of small posts in one file for stuff I don't think is worth
│   │       it's own file
│   │       I expect stuff like "cool updates to notes/something"
│   └── 2023-11-17-blog-layout.md -> /blog/blog-layout/
│       supports redirectFrom for old URLs
└── lyrics -> /lyrics/index.html: list of files
    └── artist-song.md -> /lyrics/artist-song/
```

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

### Questions/ideas
#### Navbar layout
* Include current page in breadcrumbs?
  * If not, just have nothing on landing page?
  * If not, also add back in trailing >>

#### landing page
* node visualization
* blog posts down the side, each linked to prev and next

### Bugs
Yay

### TODOs
* not duplicate title/key *everywhere*
* `*.11tydata.js` are all very similar
  * lyrics has better index thingy
* [[links?]]
* blog/index, add short descriptions?
* wiki/notes pages
  * backlinks: https://github.com/binyamin/eleventy-garden
* fingerprinting css? https://www.brycewray.com/posts/2022/09/cache-busting-eleventy-simpler-way-sass/
* finalize page layout a little more
* sort lyrics by title
* image alt text mouseover
* semantic layout passthrough
