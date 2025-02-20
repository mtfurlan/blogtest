---
redirectFrom: rtk-notes
date: 2021-09-23
lastUpdated: 2021-10-01
title:  "Notes on RTKLIB and uBlox C94-M8P"
categories: rtk, gnss
---

Notes on how far I got trying to use RTKLIB and the uBlox C94-M8P.

I got a realtime RTKNAVI solution that switched between fixed and floating.



Most of this is based on blog/website posts from Tim Everett at [rtklibexplorer](https://rtklibexplorer.wordpress.com/).
He has been maintaining a fork of RTKLIB
> This is the demo5 version of the RTKLIB code customized for improved performance with low-cost single frequency and dual frequency receivers


## General Configuration
To do RTK we need some messages from the ublox.
```
RXM-SFRBX   0x02 0x13
RXM-RAWX    0x02 0x15
NAV-SVINFO  0x01 0x30
NAV-CLOCK   0x01 0x22
```
Sources:
* OpenStreetMap Wiki page on [U-blox raw format](https://wiki.openstreetmap.org/wiki/U-blox_raw_format#U-BLOX-M8).
* rtklibexplorer [Collecting raw Ublox data with RTKLIB](https://rtklibexplorer.wordpress.com/2016/02/03/collecting-raw-gps-data-with-rtklib/)

Can either enable these in ucenter and save, or do it in the RTKLIB serial input config

For RTKLIB serial input config, these are the startup commands
* These are decimal, *NOT* hex
* arguments to UBX-CFG-MSG are
  * class
  * id
  * port rates (1=once/solution, 2=once every other solution, etc)
    * i2c rate
    * uart1 rate
    * reserved rate
    * usb rate
    * spi rate
    * reserved rate

```
!UBX CFG-MSG 2 19 0 0 0 1 0 0
!UBX CFG-MSG 2 21 0 0 0 1 0 0
!UBX CFG-MSG 1 34 0 0 0 1 0 0
!UBX CFG-MSG 1 48 0 0 0 1 0 0
```

## Realtime RTK solutions
RTKNAVI is the real time rtk thing.

Setup the C94-M8P as serial rover input with above config

Get CORS RTCM3 input
* Sign up for a CORS thing like [mdotcors.michigan.gov](https://mdotcors.michigan.gov)
* Setup NTRIP client
  * put in host/port (`148.149.0.87:10000`), user/pass.
  * press Get Mountp
  * Select a mountpoint (`NETWORK_SOLUTION_RTCM3-GG`)
* setup output file
* start it and check output file for errors

Take guesses at what the config should be based on rtklibexplorer
[Updated guide to the RTKLIB configuration file](https://rtklibexplorer.wordpress.com/2018/11/27/updated-guide-to-the-rtklib-configuration-file/)
and
[RTKLIB: Tips for using a CORS station as base](https://rtklibexplorer.wordpress.com/2020/02/05/rtklib-tips-for-using-a-cors-station-as-base/)

![settings page](/assets/pages/rtk-notes/Setting1.png)
![settings page](/assets/pages/rtk-notes/Setting2.png)
![settings page](/assets/pages/rtk-notes/Positions.png)

Note that in positions you need to set the base station location or it will silently do nothing.

Also somehow you have to tell the CORS NTRIP caster where you are so it can give
you the closest, but I can't figure out how to do that anymore.

Anyway, this config did get me a solution that was sometimes fixed, usually floating.
