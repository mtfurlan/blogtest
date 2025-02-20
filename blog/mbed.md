---
redirectFrom: mbed
date: 2018-06-27
lastUpdated: 2018-06-27
title:  "Using and Debugging MBED with arm-gcc"
categories: mbed, notes
---

Just notes on using mbed

## Setting up
Get `gcc-arm-none-eabi-6-2017-q2-update`, put it somewhere.

`gcc-arm-none-eabi-7-2017-q4-major` didn't work for me, see
[mbed-os issue #6920](https://github.com/ARMmbed/mbed-os/issues/6920)

`mbed import some url`, just be careful about
[scp like urls](https://github.com/ARMmbed/mbed-cli/issues/706)
or `mbed new` whatever.

```
mbed config TARGET whatever
mbed config TOOLCHAIN GCC_ARM
mbed config GCC_ARM_PATH /opt/gcc-arm-none-eabi-6-2017-q2-update/bin/
```

Remember to put the mbed firmware on the device if needed.

Test that the device exists with `mbedls`, the mbed command to program is
```
udisksctl mount -b /dev/sdc; mbed compile --profile mbed-os/tools/profiles/debug.json --flash
```
Mount the device, compile with the debug profile(optional), and flash it.

## debugging
Install [pyOCD](https://github.com/mbedmicro/pyOCD) sets up the gdb server

Really, try `sudo -E pyocd-gdbserver --list` before you think it doesn't work,
it was a permissions issue for me, use their udev rule.


`.gdbinit`
```
define reload
mon reset
load
end

target remote localhost:3333
load
```

Run `pyocd-gdbserver`
Run `$GCC_PATH_THING/arm-none-eabi-gdb BUILD/whatever/whatever/whatever_applicaiton.elf`

Compile with debug profile, don't flash. Run `reload` in gdb, will program it.
