---
redirectFrom: homeassistant-tablets
date: 2022-01-08
lastUpdated: 2022-01-08
title:  "homeassistant-tablets"
categories:
---




Hackday tablet
Vulkan Electronics | Excursion XC
Model No: VT1008X4
FCC ID: 2AFA3V106

battery connector notes: https://groups.google.com/g/hackadaytablets/c/97yV7rLxKw8/m/8nUgaZL6AgAJ
> A careful examination will reveal that the "sense" wire goes nowhere on almost all of the tablets.
> I have seen a handful of boards where the boards appear to be more fully populated down by the battery connector.
> They more populated ones appear to actually make use of the "sense" wire.
> I also have some tablets that had batteries soldered on (now cut off) they just used two wires connected.
>
> I have not had any issues charging batteries. The third wire is appears to be a temperature  sense and
> is not used on most of the tablets I have seen. I would suggest that you do your own investigation well.
> I my be wrong.
- HackADayTablets

> On a side note the sense wire appears to go to a thermistor that has a 12k resistance at 65 degrees f while other side is connected to the black/negative wire.
- william.a...@gmail.com


Video powering from bench supply:
https://www.youtube.com/watch?v=B15UcgVrals

Video removing battery connector:
https://www.youtube.com/watch?v=Rd5Z62_dRlUo

Notes on powering it:
https://11569134993819730327.googlegroups.com/attach/3736e2b645ba/Vulcan%20tablet%20notes%2011-29-21.pdf?part=0.1&view=1&vt=ANaJVrFVZqxqziVzWlNjqpiSq_Kbbb1eNW6DbGSBCQXI_g0z7JvOs3Cpcp8cF_2pnCQPXVqhvaI1OuFRj8E-IQFkwEtRB_O_af2l8eqlcZfZGHQSHTg4Vpo


Powerup summary:
* connect 5V to battery connector area
* Wait till it stops drawing power (21s)
* Press power button 2 seconds


layout
```

                        power, volume u/d
                            v  v  v
                           ┌─────────────────────┐
                           │       camera        │
                           │                     │
                   reset-->│                logo │
usb and other connectors-->│                     │
                           │                     │
                           └─────────────────────┘
```

## passwords
some tablets come with oem install mode, others are in setup mode.
bios: empty
oem install mode: oem/oem


## bios
disable pxeboot
disable numpad

What is
* `Android-IA`
* `UEFI: Built-in EFI Shell`


## Running software
It boots mint, thanks Mike.
I ended up wanting debian though

`apt install vim tmux git redshift-gtk network-manager-gnome ntp`

### display
#### screen rotation
https://wiki.ubuntu.com/X/InputCoordinateTransformation
inverted (cables downards, logo up)
`~/.xsessionrc`
```
xrandr -o inverted
xinput set-prop pointer:'Goodix Capacitive TouchScreen' 'Coordinate Transformation Matrix' -1 0 1 0 -1 1 0 0 1
```

#### Power dimming
`~/.xsessionrc`
```
# turn off default screensaver
xset s off
# turn off default standby, hibernate, ... after n minutes
xset -dpms
```


### autostart
`.config/lxsession/LXDE/autostart`
runs ~/startup.sh

#### Kiosk
```
firefox --kiosk http://whatever
```

### Reshift
`~/.config/redshift.conf`
```
[redshift]
location-provider=manual

[manual]
lat=whatever
lon=whatever
```
Run redshift, enable at boot from status icon

### Logo button
The logo button is bound to `Super_L` I found it helpful to be sure that's bound to something to tab out of the kiosk browser.

### DateTime & RTC
Some tables always come up with the wrong date, I assume the rtc is on the battery that isn't installed.
`ntp.conf`
```
# add this to the top, it means don't panic on large offsets
tinker panic 0
server 192.168.x.x iburst
# edit this, it will let us listen to a single server
tos minclock 1 minsane 1
# if you can't talk to internet, comment out the pools
```



### Disable services
* ModemManager
* cups
* cups-browserd
