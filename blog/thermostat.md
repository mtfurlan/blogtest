---
redirectFrom: thermostat
date: 2018-04-11
lastUpdated: 2018-05-15
title:  "Building a custom thermostat"
categories: automation
---

So at i3, one issue we have is people leaving the thermostats on high temepratures and going home.

So we built our own into the automation system.



At it's core, a thermostat is just a temperature sensor, some relays, some buttons, and a display.

And lo, a thermostat:
![protoboard version](/assets/pages/thermostat/first_board.jpg)
It just appeared, fully formed.

Alternately, [abzman](http://abzman2k.wordpress.com/) made it.

The [code](https://github.com/i3detroit/custom-mqtt-programs/blob/master/thermostat/thermostat.ino) was good fun to write.
Did you know that these things have complex behaviors? That are hard to keep in your head all at once?

Who knew.

Recommendation: Actually write down test procedures.

In the end it seemed to work, and it was put into use:
![v1 installed](/assets/pages/thermostat/v1.jpg)

That one has a bug in the cooling side of the temperature control.
Don't tell anyone.
It'll be fixed when I merge the branches for the new boards which will be before summer so nobody should use the AC.
Hopefully.


After we had the prototype working for a bit, I learned to use kicad.

![pcb version](/assets/pages/thermostat/boards.jpg)

My first board turned out pretty well, considering.

Issues:
* a few of the LEDs are backwards
* so the relay output is backwards, but our relays have NO and NC things so it's fine
* I pulled the i2c expander reset the wrong way, so we have to jumper one pin

We have 4 thermostats at i3, but only one does AC. The plan is to use the same thermostat with the cool button not usable.

Got a bunch of revisions to make written down, and even partially completed, but I'm not sure we will need to make a new version.

They're not installed at i3 yet, but I'm testing one in my house.
Has not yet burned down.

At least, it hadn't when I left this morning.


---
UPDATE 2018-05-15:

It was taken out of service a few weeks ago, once a flaw (possibly clear if you read closely) was discovered.

If you put the heater on the normally closed contacts, they are normally closed.
If the thermostat loses power, it turns the heat on.

And this is the story of why I was trying to work in a house that was 31C.

Board redesign in progress.

