---
redirectFrom: at90usbkey2
date: 2018-04-24
lastUpdated: 2018-10-09
title:  "Programming the AT90USBKEY2"
categories: avr, keyboard
---

In my continuing quest to turn a thinkpad keyboard into a USB keyboard, I decided to try the at90 line of avr chips.
Bought a AT90USBKEY2 dev kit, and tried to put TMK on it.

This was another "one" day project.
It ended in running the onekey example, so this post is more just "how to use the AT90USBKEY2.



## Important stuff first: How to flash.

* press RST and HWB simultaneously on the board
* release RST then release HWB
* Power cycle the board. *IMPORTANT*

The end results of my day are pretty much this repo of a blink sketch with a makefile that works and a README telling you how to press the buttons.
[https://github.com/mtfurlan/at90usbkey2-blink](https://github.com/mtfurlan/at90usbkey2-blink)

What happened is that the timing in the blink sketch was wrong.

I spent most of my day working on [trying to figure out why the delay was wrong](https://electronics.stackexchange.com/q/361303/181040), and the best guess seems to be that there is some issue with the soft reset.
I may follow up with atmel on that, maybe I'm just doing something really stupid.

Or just reset the board better.

## Important documentation:

Thanks to the CSC 460 Project Team A from 2007 for this pinout diagram:
[![labeled gpio pins](/assets/pages/at90usbkey2/pinout.png)](https://webhome.csc.uvic.ca/~mcheng/samples/cox/documentation/AT90_Pin_Diagram.pdf)


And then the jtag pinout I think from the atmel manual:

![jtag pinout](/assets/pages/at90usbkey2/jtag.png)

Thanks to this person http://generichid.sourceforge.net/hardware.htm
for which pins are already used by onboard stuff, and how to undo the onboard stuff if you need.


## And lastly, TMK.

To make the TMK onekey example work, you really just need to change `MCU` to `at90usb1287`.
That's it, it works.

EDIT: Clock speed is `8000000`, that one is important too.
