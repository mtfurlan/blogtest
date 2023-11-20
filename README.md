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

## Page Titles
Literature Review of Blog Page Titles
* qntm: `$pageTitle @ Things Of Interest`
* computer.rip: `$date $pageTitle`
* cks: `Chris's Wiki :: $slug`
* rachelbythebay: `$pageTitle`
* jwz: `jwz: $pageTitle`
* Schneier on Security: `$pageTitle - Schneier on Security`
* Tom Francis Regrets This Already: `$pageTitle - a post on Tom Francis' blog`
* anitpope: `$pageTitle - Charlie's Diary`
* KrebsonSecurity: `$pageTitle - Krebs on Security`
* bldblog: `$pageTitle - BLDBLOG`
* elm-chan.org: Most leaf pages are `$pageTitle`, most categories are `ELM - $category`
