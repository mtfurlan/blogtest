---
title: Youtube with yt-dlp & Widevine DRM decoding
---


First we must ask ourselves, what is a Widevine?


* https://www.ismailzai.com/blog/picking-the-widevine-locks
* https://forum.videohelp.com/threads/408031-Dumping-Your-own-L3-CDM-with-Android-Studio
* https://forum.videohelp.com/threads/404219-How-To-Dump-L3-CDM-From-Android-Device-s-%28ONLY-Talk-About-Dumping-L3-CDMS%29/page6?s=da067ba2bab6ce841c77ae58772f9029#post2646150

## Tools
* android emulator running Oreo x86 Android 8.0 (Google APIs)
  * 10/Q didn't work, and without google APIs won't have chrome so we won't have widevine support
    I think the internet said Google Play vs Google APIs won't work but I don't remember why.
* https://github.com/frida/frida/releases/
  * show more, find frida-server-whatever
* https://github.com/Diazole/dumper


## steps
* run emulator, push frida-server to /sdcard
* move to `data/local/tmp` & chmod +x
* run frida-server
* find libwvhidl.so, copy to somewhere readable and pull it
* Look at it with strings, the functions names you want are between
  `_lcc43` and `_ZN6wvoec333OEMCrypto_Level3AndroidFileSystem4ReadEPKcPvj`(Second occourance of OEMCrypto_Level3 in the file)
* put those function names in dumper/Helpers/scripts.sh KNOWN_DYNAMIC_FUNCTION_NAMES
* run dumper, this will listen in on those functions for drm functions and log keys
  * I had a *lot* of issues with this I think it just started working once I went old enough? Don't really remmeber
* Open DRM in a chrome tab in the phone https://bitmovin.com/demos/drm
* Hope it writes `key_dumps/Android\ Emulator\ */private_keys/*/*/client_id.bin` and `private_key.pem`


Now, what do we do with these keys?
