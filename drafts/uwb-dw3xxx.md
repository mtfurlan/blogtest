---
title: UWB Qorvo DW3XXX family notes
---

SEE ALSO: [UWB Literature Review](/blog/uwb-lit-review)

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

#### zips from qorvo
* [DWM3001CDK DK Software, Sources, Tools and Developer Guide -> `DWM3001CDK DK Software, Sources, Tools and Developer Guide/DWM3001CDK DK/`](https://www.qorvo.com/products/d/da008604)
  * dwm3001cdk documents page
  * hereafter referred to as `DWM3001CDK DK`
  * `./DWM3001CDK DK/DWM3001CDK_SDK/Doc/DWM3001CDK_SDK_Release_Notes_0.1.1.pdf` says this release contains `DWM3001CDK_SDK/Sources/DWM3001CDK-FreeRTOS_DW3_QM33_SDK_0_1_1.zip` but actually contains `DWM3001CDK_SDK/Sources/DWM3001CDK-DW3_QM33_SDK-FreeRTOS_0_1_1.zip`
  * has freertos segger project for the DWM3001CDK, or nRF52833
* [QM33 DK Software, Sources, Tools and Developer Guide -> `QM33120WDK1/`](https://www.qorvo.com/products/d/da008582)
  * dwm3001cdk evaulation tools page
  * hereafter referred to as `QM33120WDK1`
  * has freertos segger project for the nRF52840
  * basically identical to DWM3001CDK DK but for the nRF52840 not the nRF52833 inside the DWM3001C
* [DWM3000 API Software and API Guide -> `DW3xxx_XR6.0C_24Feb2022/`](https://www.qorvo.com/products/d/da007992)
  * DWM3001C documents page
  * hereafter referred to as `DW3xxx_XR6.0C_24Feb2022`

developer guides
* `./QM33120WDK1/DW3_QM33_SDK/Doc/DW3QM33_SDK_Developer_Guide_0.1.1.pdf`
* `./DWM3001CDK DK/DWM3001CDK_SDK/Doc/DWM3001CDK_SDK_Developer_Guide_0.1.1.pdf`


#### DW3XXX API
the lowest level code to interface with board over spi

##### DW3000 C0 Device Driver Version 04.00.00
* actual opensource driver
* was in `DW3000_API_C0_rev4p0.zip`
* versions can be found
  * [br101/zephyr-dw3000-decadriver opensource branch](https://github.com/br101/zephyr-dw3000-decadriver/tree/opensource)
  * [foldedtoad/dwm3000 (zephyr lib)](https://github.com/foldedtoad/dwm3000)
* reportedly, the URL to `DW3xxx_XR6.0C_24Feb2022/` *used* to point to this

##### DW3xxx Driver version 06.00.07
* binary driver
* `DW3xxx_XR6.0C_24Feb2022/` contains `DW3XXX_API_rev9p3.zip`: Package v9.3 / Driver v06.00.07  (19th Nov 2021)
  * has a changelog with releases
* XR6.0C was released 2022-02-23 or 2022-02-24 depending on where you look
  * `release_note.md` claims it has "DW3XXX API (09.03.00) and Simple Examples package v6.0"
* contains binaries for m33/m4 (nRF53X/everything else according to CMakeLists.tx from br101), HFP/SFP
* `./DW3xxx_XR6.0C_24Feb2022/Release_XR6.0C/Software/DW3XXX_API/Docs/DW3XXX_Software_API_Guide_2p2.pdf`

##### DW3XXX Device Driver Version 06.00.14
* binary driver
* found in
  * `DWM3001CDK DK` ... `DWM3001CDK-DW3_QM33_SDK-FreeRTOS_0_1_1.zip`
  * `QM33120WDK1`       `nRF52840DK-DW3_QM33_SDK-FreeRTOS_DW3_QM33_SDK_0_1_1.zip`
* no changelog/readme, but does have driver api guide pdf
* binaries for m4, HFP/SFP
* `./QM33120WDK1/DW3_QM33_SDK/Doc/` and `./DWM3001CDK DK/DWM3001CDK_SDK/Doc/` have `DW3xxx_Driver_API_Guide_6.0.14.pdf`

#### UWB stack
UWB Stack has UWB MAC APIs and UCI APIs

has some references to FIRA stuff

I think UWB MAC is referring to MAC layer, UCI is a spec for MCU -> UWB tranciever comms(FiRa® UWB Command Interface (UCI) Technical Specification v2.0.0 looks like a nice spec but I can't have it right now)

no bluetooth discovery stuff

`./QM33120WDK1/DW3_QM33_SDK/Doc/` and `./DWM3001CDK DK/DWM3001CDK_SDK/Doc/` have `UWB-Stack-R11.9.2.pdf`

It seems better to consider this a part of the DW3_QM33_SDK

##### UWB Stack R11.9.2 October 2022
* found in both `DWM3001CDK DK` and `QM33120WDK1`, next to DW3XXX Device Driver Version 06.00.14
* binary lib with headers


#### DW3_QM33_SDK
in both DWM3001CDK DK and QM33120WDK1, and contains UWB Stack and the DW3XXX API
FreeRTOS segger thingy

can actually do uwb ranging

##### keywords
* MCPS: MAC Common Part Sublayer
* UWBS: UWB Subsystem, the conceptual gropu for MAC&PHY layer
* UWB Service: thin inside fira framework that talks to UWBS

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
