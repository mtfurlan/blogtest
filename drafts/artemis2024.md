---
title: Artemis Spaceship Bridge Simulator with DMX in 2024
---


## DMX
### TL;DR:
* dmx via wine is hard, I gave up and installed windows
* made an esp32 [dmx to network dmx(E1.31)](https://github.com/mtfurlan/dmx512-to-E1.31)
* wled strips recieve network dmx

### Artemis dmx notes
Artemis will *only* output DMX at ftdi stuff, it even has it's own ftd2xx.dll

[Artemis Bridge Tools](http://www.armidalesoftware.com/Artemis/DMXTools.htm)
will add support for extra types of devices, and add a bunch of extra info into
the dmx layer and some other stuff


### Wine DMX notes
* Joe Greene [says in 2013 that](https://appdb.winehq.org/objectManager.php?sClass=version&iId=28753&iTestingId=80265) dmx works if you run as root with "gaitopeich's" ftd2xx.dll.so
  * Unfortunately, search engines don't believe in gaitopeich
  * Amusingly, Joe Greene is the person who was kind enough to chat with me as an idiot uni student about building a [linux livecd for artemis](https://github.com/mtfurlan/Debian-LiveCD-for-Artemis) in 2014
* [brentr/wineftd2xx](https://github.com/brentr/wineftd2xx)
  * This exists, it doesn't seem to work
* [gatopeichs.pbworks.com](https://web.archive.org/web/20090904140812/http://gatopeichs.pbworks.com/#USBD2XXdriverforWine)
  * I found gaitopeich's thing!
    * it doesn't work!
  * [dac922/olimex-wine](https://github.com/dac922/olimex-wine): dac922 couldn't make it work, and forked it
    * it also doesn't work!

### WLED DMX notes
There is an experimental feature in the experimental repo for actual wired DMX input, but I couldn't make it work

I gave up and made an esp32
[dmx to network dmx(E1.31(sACN))](https://github.com/mtfurlan/dmx512-to-E1.31)
converter which the wled can listen to no issues, with the bonus that *all* wled
on a network can listen at the same time

## Artemis under wine on some tablets
Mike Drew gave away some Vulkan Electronics Excursion XC tablets via hackaday
the other year, so we're using them for the stations

They run debian stable just fine, but getting wine to work with artemis has directx 9 issues

Artemis 2.0(TODO: confirm version, `ArtemisSBS_2.exe`) works fine, but is old
2.8.0 has issues, 2.1 or something uses "newer" directx9 features
these tablets have issues with that

2.8.0 ran *twice*, but I couldn't figure out how to replicate, and gave up due
to convention deadline

dxdiag says some features are missing, but I don't really know what I'm doing

Windows sucks so much to install and configure and ssh into and *everythying*,
but at least once I got one kinda working I could image it.
Slow storage in the tablets and or the usb sucks though.


## Other interesting projects
* [protocol docs](https://artemis-nerds.github.io/protocol-docs/)
* [rjwut/ian java artemis client library](https://github.com/rjwut/ian)
* [artemis-glitter provides http server for extra screens](https://github.com/IvanSanchez/artemis-glitter)

## Current next steps
* try Artemis Bridge Tools
* try artemis-glitter
* get a list of hotkeys for each station
* figure out if a fake client can control station stuff (you can only have one weapons, but can another client send the stuff to launch a missile or whatever?)
* try to get an esp that can pretend to be a client so we can have physical buttons
* CAD for tablet holder
* spec for station connector (we need 5v(tablet, esp, etc), 12v(leds probably), what else? network?)
* determine system architecture
  * proposal while trying to sleep last night
    * Artemis dmx config just map every state to a channel, do no logic in artemis
    * broadcast this state dmx in universe 1 over UDP dmx
    * broadcast shipside lighting states in universe 2 udp dmx to room lightjng
    * each station has an esp listening to universe 1 UDP dmx, and does station specific lighting like missiles loaded or whatever
    * if we can bind hotkeys the MCU also does usb so like missile launch buttons
