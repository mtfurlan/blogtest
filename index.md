---
layout: layouts/base
title: Technically Competent
override:tags: [scaffolding]
eleventyNavigation:
  key: Technically Competent
---

Hi I'm Mara and I'm of the opinion personal websites are useful and better than
a walled garden :)

## Site Layout
├── [blog](blog/): dated blog posts(with [rss](feed.xml)!)\
├── [drafts](drafts/): drafts\
└── [lyrics](lyrics/): song lyrics I've transcribed

Also, [some meta notes](README).


## Recently updated

{% for post in collections.recent %}
* [{{post.data.eleventyNavigation.parent}}: {{post.data.title}}]({{post.url}}) posted {{ post.date | formatDate  }} {% if post.data.lastUpdated %}(updated {{post.data.lastUpdated | formatDate }}){% endif %}
{% endfor %}
