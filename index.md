---
layout: layouts/base
title: Technically Competent
override:tags: [scaffolding]
eleventyNavigation:
  key: Technically Competent
---

<img src="/assets/Corridor9875pixani-construction.gif" alt="">

Very construction.
Much site.

## Site Layout ish
├── [drafts](drafts/): drafts\
├── [blog](blog/): dated blog posts(with [rss](feed.xml)!)\
└── [lyrics](lyrics/): song lyrics I've transcribed

Also, [some meta notes](README).


## Recently updated

{% for post in collections.recent %}
* [{{post.data.eleventyNavigation.parent}}: {{post.data.title}}]({{post.url}}) posted {{ post.date | formatDate  }} {% if post.data.lastUpdated %}(updated {{post.data.lastUpdated | formatDate }}){% endif %}
{% endfor %}
