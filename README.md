# blogtest

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
├── redirects file that handles stuff like
│   ├── /frsky-communication-intro -> /blog/frsky-communication-intro
│   └── /blog/whatever -> /notes/whatever when I decide a blog post is now notes
└── lyrics -> /lyrics/index.html: list of files
    └── artist-song.md -> /lyrics/artist-song/
```

## TODO:
* on v3 eleventy release change package.json, need v3 for esm reasons

## Design Literature Reivew
* https://qntm.org/                             `$pageTitle @ Things Of Interest`
  * breadcrumbs, no website title
* https://computer.rip                          `$date $pageTitle`
  * navbar
* http://elm-chan.org                           Most leaf pages are `$pageTitle`, most categories are `ELM - $category`
  * no consistency
* https://qwertyuiop.ninja                      `$pageTitle`
  * navbar with home
* https://agmlego.com/                          `AGMLego Blog · $pageTitle -- $date`
  * navbar with categories
* https://utcc.utoronto.ca/~cks/space/blog/     `Chris's Wiki :: $slug`
  * breadcrumbs, no website title
  * sidebar on right with website info
* https://rachelbythebay.com/                   `$pageTitle`
  * header button to writing from blog posts
* https://www.jwz.org/blog/                     `jwz: $pageTitle`
  * prev/next & navbar
* https://www.schneier.com/                     `$pageTitle - Schneier on Security`
  * breadcrumbs & navbar
* https://www.pentadact.com                     `$pageTitle - a post on Tom Francis' blog`
  * navbarr
* https://www.antipope.org/charlie/blog-static/  `$pageTitle - Charlie's Diary`
  * prev/next & navbar
* https://krebsonsecurity.com/                  `$pageTitle - Krebs on Security`
  * navbarr
* https://www.bldgblog.com/                     `$pageTitle - BLDBLOG`
  * link to home

### Conclusions
#### Title
$title @ Technically Competent

#### Page layout
breadcrumbs, maybe big title

#### landing page
* node visualization
* blog posts down the side, each linked to prev and next
