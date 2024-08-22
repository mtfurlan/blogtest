---
title: UWB Qorvo DW3XXX family notes
---

SEE ALSO: [UWB Literature Review](../uwb-lit-review)

### existing software stuff
* DW1000 based
  * [decawave dwm1001 gateway system](https://www.qorvo.com/products/d/da007973)
    * networked uwb stuff with static anchors and gateway uplinks
    * rpi based
  * RIOT OS
* DW3xxx based
  * qorvo DW3xxx Driver API, PHY layer
    * [zephyr binary library](https://github.com/br101/zephyr-dw3000-decadriver)
    * [reverse engineered notes](https://gist.github.com/egnor/455d510e11c22deafdec14b09da5bf54)
    * downloads from qorvo below
  * qorvo UWB-Stack: MAC layer and some fira stuff
    * binary library, details below


## Qorvo/Decawave
Decawave was bought by qorvo in 2020 and moved from open source to binary
drivers early in the life of the DWM3XXX family

The DW1000 family was well recieved by many, but the more recent DWM3XXX
family's binary driver has frustated many

These notes are focused on the DW3XXX family

### docs from qorvo
* tranciever numbering
  * DW3110, DW3120, DW3210, DW3220
    * 1|2: 1 is WLCSP, 2 is QFN
    * 1|2: number of antenna
    * 0
  * QM33110W & QM33120W transceivers
    * QM33120W has 2 antenna
* [DWM3000](https://www.qorvo.com/products/p/DWM3000): DW3110 & antennas &
  support
  * schematic https://www.qorvo.com/products/d/da008507
  * datasheet https://www.qorvo.com/products/d/da008142
* DWM3000EVB arduino shield with DWM3000
  * schematic in DW3xxx_XR6.0C_24Feb2022
* [DWM3001C](https://www.qorvo.com/products/p/DWM3001C): nRF52833 & DW3110 &
  antennas & accelerometer & misc
  * FAMILY USER MANUAL: https://www.qorvo.com/products/d/da008154
    * has spi protocol docs
    * register files have IDs, "sub-registers" have offsets ($register:$offset)
  * schematics: https://www.qorvo.com/products/d/da008300
* [DWM3001CDK](https://www.qorvo.com/products/p/DWM3001CDK): DWM3001C & misc
  * QUICK START GUIDE: https://www.qorvo.com/products/d/da008427
* QM33120WDK1: nRF52840 & QM33 whatever, does both for AoA vs nonAoA

### Libs from qorvo/decawave
#### DW3XXX API
the lowest level code to interface with board over spi

versions I can find
* DW3000 C0 Device Driver Version 04.00.00
  * actual opensource driver
  * was in `DW3000_API_C0_rev4p0.zip`
  * versions can be found
    * [br101/zephyr-dw3000-decadriver opensource branch](https://github.com/br101/zephyr-dw3000-decadriver/tree/opensource)
    * [foldedtoad/dwm3000 (zephyr lib)](https://github.com/foldedtoad/dwm3000)
* DW3xxx Driver version 06.00.07
  * binary driver
  * `DW3XXX_API_rev9p3.zip`: Package v9.3 / Driver v06.00.07  (19th Nov 2021)
    * has a changelog with releases
  * inside [DW3xxx_XR6.0C_24Feb2022](https://www.qorvo.com/products/d/da007992) (this link *used* to point to something containing `DW3000_API_C0_rev4p0.zip`, the open source driver)
    * XR6.0C was released 2022-02-23 or 2022-02-24 depending on where you look
    * `release_note.md` claims it has "DW3XXX API (09.03.00) and Simple Examples package v6.0"
      * notably this contains DW3xx Driver 06.00.07
    * there is some Weirdness in dates in this release, the D
  * contains binaries for m33/m4 (nRF53X/everything else according to CMakeLists.tx from br101), HFP/SFP
* DW3XXX Device Driver Version 06.00.14
  * binary driver
  * `DWM3001CDK-DW3_QM33_SDK-FreeRTOS_0_1_1.zip`
    * no changelog or readme or anything
  * found in [`DWM3001CDK DK Software, Sources, Tools and Developer Guide.zip`](https://www.qorvo.com/products/d/da008604)
    * also contains UWB Stack R11.9.2
  * binaries for m4, HFP/SFP

#### UWB stack
[`DWM3001CDK DK Software, Sources, Tools and Developer Guide.zip`](https://www.qorvo.com/products/d/da008604)
contains UWB Stack R11.9.2 October 2022 as a binary lib with headers

UWB Stack has UWB MAC APIs and UCI APIs

I think UWB MAC is referring to MAC layer, UCI is a spec for MCU -> UWB tranciever comms(FiRa® UWB Command Interface (UCI) Technical Specification v2.0.0 looks like a nice spec but I can't have it right now)

no bluetooth discovery stuff

Used by a sample freertos app
