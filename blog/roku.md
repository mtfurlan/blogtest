---
title: roku without internet
tags: hacking
---
I want a jellyfin display client
Trying a roku, but it is unhappy without internet, it complains and also the
clock is wrong

I want to have clock without internet


## literature review
* roku is running a local api on port 8060
    * https://developer.roku.com/docs/developer-program/dev-tools/external-control-api.md
    * https://sdkdocs-archive.roku.com/External-Control-API_1611563.html
    * http://remoku.tv/
* https://exploitee.rs/index.php/Roku
    * neat list of secret pages
* some firmware analysis
    * https://www.reddit.com/r/netsec/comments/3eu4iv/a_little_roku_with_my_morning_coffee_a_firmware/
    * http://firmware.roku.com/<VERSION_ID> , eg http://firmware.roku.com/04D.55E04174A
* RokuControl-Conducting MITM Attacks on Roku - 2022 Coles et all
    * https://ieeexplore.ieee.org/document/9946502
    * They discovered the api on port 8060 *documented by the manufacturer*
    * what a find
* notes from Eric Cooper 2008
    * https://www.cs.cmu.edu/~ecc/roku-nfp.html
    * if it can't https it tries http

## wireshark capture from boot to has time
Started capture, booted device, stopped capture once it had time

No ntp, it's basically all tls

DNS requests:
* api2.sr.roku.com
* api.roku.com (twice)
* api.rokutime.com
* api.rpay.roku.com
* austin.sb.roku.com (twice)
* bailey.logs.roku.com
* cloudservices.roku.com
* configsvc.cs.roku.com
* display.ravm.tv (twice)
* hints.voice.roku.com
* images.sr.roku.com
* ls.cti.roku.com
* navigation.sr.roku.com
* scribe.logs.roku.com


api.rokutime.com sounds promising:
```
A api.rokutime.com CNAME api-weights.us-east-1.rokutime.com CNAME api.us-east-2.rokutime.com CNAME rokumesh-2-device.us-east-2.msc.roku.com A 3.20.27.28 A 3.128.227.227 A 18.217.208.75
```
We actually talk to all three of them, woooo

----
Anyway, it's all tls, so I gave up for now.
It's basically working fine if you ignore the clock.
