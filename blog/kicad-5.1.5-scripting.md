---
redirectFrom: kicad-5.1.5-scripting
date: 2020-10-13
lastUpdated: 2020-10-14
title:  "kicad 5.1.5 scripting"
categories:
---

Notes on scripting in kicad 5.1.5, updated 2020-10-14


As development towards 6 continues, whatever I can get out of the debian repos gets less up to date.
The [official docs](https://docs.kicad-pcb.org/doxygen-python/index.html) are too new for me. and aren't useful.

[These folks](https://mirrors.cqu.edu.cn/kicad/doxygen-python/index.html) have a mirror that is close to correct, at least it has the
[pcbnew.TEXTE_PCB Class Reference](https://mirrors.cqu.edu.cn/kicad/doxygen-python/classpcbnew_1_1TEXTE__PCB.html)


```
import pcbnew

board = pcbnew.GetBoard()

# modify text size of text starting with "P":
for drw in board.GetDrawings():
    if (drw.GetShownText().startswith("P")):
        drw.SetThickness(150000)

for m in board.GetModules():
    if m.GetValue() == "2K2":
        m.Reference().SetVisible(True)
        m.Reference().SetTextHeight(500000)
        m.Reference().SetTextWidth(500000)
        m.Reference().SetThickness(70000)
```
