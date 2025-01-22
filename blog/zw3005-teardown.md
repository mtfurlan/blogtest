---
redirectFrom: zw3005-teardown
date: 2019-09-17
lastUpdated: 2019-09-17
title:  "zw3005 honeywell z-wave lightswitch teardown"
categories: teardown
---

Some friends use the TP link kasa lightswitches.
I intended to buy one to evaluate, but got confused by someone else talking about what they use(z-wave) while I tried to order it.

I don't use zwave, so I decided to see what would be involved with converting it to be ESP based.

TL;DR: Maybe possible to convert, but way too much effort.


I'm just posting what I know because I couldn't find any pictures of the inside online.

It has the [SD3502](http://www.keil.com/dd/docs/datashts/sigmadesigns/sd3502_bro.pdf) Z-Wave SoC as the brain, and uses a BTA24-600BW triac as the switch.

After you take out all the obvious screws, you find this rivet.
![the rivet holding it together](/assets/pages/zw3005/rivet.jpg)
I drilled it out
![no rivet](/assets/pages/zw3005/no-rivet.jpg)

Pry the clips in the square slots out to remove the PCB.

Turns out the rivet was actually connecting the triac to the metal plate, so the metal plate was also a heatsink.
![good luck getting this back together David, sorry.](/assets/pages/zw3005/board.jpg)
Also debug pins!

It's a clever dual-layer set of boards.
![side view](/assets/pages/zw3005/side.jpg)

Overall, as it has the triac on the upper board, I'm not going to even try to bodge an ESP in.

I'm going to try to hand this off to someone who uses these, but as the rivet heatsink is now missing, I doubt it will work.
So if anyone wants the thing, let me know and I'll try to get it to you.
