---
title: How to python documentation
---

One of the things that's frustrated me about python is searching
"python iterable" rarely brings up the actual python documentation

So this is how to actually find stuff

* python documentation: https://docs.python.org
  * glossary has good high level descriptions, search works
* `python -m pydoc thing` or `help("thing")` in the repl get docstrings for something
* https://sphinx.rip
  * `https://sphinx.rip/py/$package[.$Class[.$method]]` shortcuts to python documentation if you know the exact thing
  * `https://sphinx.rip/py/typing.$type` most types are probably linked in typing package

