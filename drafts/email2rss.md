---
title: "Email2RSS: a dumb email automation thing"
---

There are several services that provide acceptable mailing lists, but not rss
feeds (patreon, ao3, etc)
I've also had dumb ideas where I want to run scripts when I get certain emails

So the idea is a modular framework for passing emails to executables, with some
support for making rss feeds

## Prior Art
* https://codeberg.org/ext0l/sub-rosa
  * only patreon, and I don't know/want to learn rust

## how it might work
* core maintains a list of $n most recent emails and tracks which it has passed
  to plugins
  * does it track what it's passed to which plugin so you can add a plugin to
    historical emails?
* call each plugin and pass email over stdin
* rss builder can be called with a feed name as argument and a post as stdin
  * maintains dir of $y most recent posts for each feed, and generates static
    feeds to somewhere

