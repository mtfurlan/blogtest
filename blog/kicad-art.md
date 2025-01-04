---
redirectFrom: kicad-art
date: 2018-09-27
lastUpdated: 2020-10-14
title:  "KiCad Art"
categories: kicad
---

Putting logos on a kicad board isn't terribly hard, just slightly annoying.

![some boards with art](/assets/pages/kicad-art/closeup.jpg)

<!--excerpt-->

Approach for copper/mask taken from [komar's techblog](http://blog.komar.be/making-pcb-artwork-in-kicad/), but I couldn't get the tooling to work.

[svg2mod fork for python3 support](https://github.com/zirafa/svg2mod) turns an svg into a `.kicad_mod` file.

* `pip3 install git+https://github.com/zirafa/svg2mod`

Summary
* Vector image in inkscape.
* Make it a path, where the fill actually fills it
* Resize to the final size (with a few mm spacing)
  * Object -> Transform
* Name layer `Cu`
* Duplicate layer, name `Mask`
* Make mask slightly bigger
  * Path -> Outset works
    * Step size in Preferences -> Behaviour -> Steps -> Inset/Outset by
* Path -> Break Apart
* Edit -> Resize Page to Selection
* `svg2mod -i input.svg -o output-filename --name module-name -p 1`

![some boards with art](/assets/pages/kicad-art/board-art.jpg)

---
* Update 2018-11-12: Add header image
* Update 2019-07-12: Redo instructions
* Update 2020-10-14: Add specifics
