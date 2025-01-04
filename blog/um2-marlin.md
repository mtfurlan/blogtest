---
redirectFrom: um2-marlin
date: 2022-01-08
lastUpdated: 2022-01-08
title:  "Marlin on the Ultimaker 2"
categories:
---

$work has an ultimaker 2, I wanted to upgrade it and this would be vastly simpler with control over the firmware.

<!--excerpt-->


## Ultimaker firmware
The stock ultimaker firmware situation is very confusing.

Ultimaker have three github repos for three types of printer according to
[Ultimaker employee ckielstra](https://github.com/Ultimaker/Ultimaker2Marlin/issues/135#issuecomment-384258724),
and they may have more by now, they've released more printers.

My printer had 2.6 firmware on it, and I never figured out which branch was for the UM2 let alone that version.
I just gave up and am hoping that if I ever want stock firmware for some reason cura will just hand me something useful.


## Marlin
Running 2.0.9.3 for now because it's the most recent tag.

It's built with pio which is super convinent.
```
pio run -e mega2560ext
```
firmware is now at `.pio/build/mega2560ext/firmware.hex`

### Starting Config
Someone was nice enough to
[share a UM2 config for Marlin](https://github.com/MarlinFirmware/Configurations/tree/import-2.0.x/config/examples/Ultimaker/Ultimaker%202)

### Flashing
[Ultimaker forum user amedee](https://community.ultimaker.com/topic/17871-solved-cant-update-firmware-on-um2-i-think-ive-checked-all-the-obvious-stuff/#elControls_178123_menu)
gives us correct avrdude flashing arguments:
```
avrdude -C /etc/avrdude.conf -v -p atmega2560 -c wiring -P "/dev/ttyACM0" -b 115200 -D -U "flash:w:firmware.hex:i"
```
Or octopi firmware updater plugin, the AVR programmer type is "wiring".


## Running
Out of the gate the menu works, it moves.
Doesn't reach temp though, just https://cdn.discordapp.com/attachments/400424470327721985/929252930052317204/unknown.png
Looks like a PID issue but I don't want to learn PID tuning tonight.

Octoprint recommends
`HOST_ACTION_COMMANDS` so I enabled `HOST_PAUSE_M76` and `HOST_PROMPT_SUPPORT`.
It means the printer can tell octoprint to pause.

## PID tuning
https://marlinfw.org/docs/gcode/M303.html
