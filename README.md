---
layout: layouts/base
title: README
override:tags: [scaffolding]
eleventyNavigation:
  key: README
  parent: Technically Competent
---
# https://technicallycompetent.com

my personal website

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

## eleventy notes
* tagging pages as "scaffolding" if they need to be in collections.all but aren't real content

## Questions/ideas
### Navbar layout
* Include current page in breadcrumbs?
  * If not, just have nothing on landing page?
  * If not, also add back in trailing >>

### landing page
* node visualization
* blog posts down the side, each linked to prev and next

## Bugs
Yay

## TODOs
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
