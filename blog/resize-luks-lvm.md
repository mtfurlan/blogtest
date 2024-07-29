---
title: Resizing luks encryped lvm
---

debian installer picks insane defaults like 1GiB swap or 500ish MiB /boot

some definitions:
* Physical Volume (PV): This can be created on a whole physical disk (think /dev/sda) or a Linux partition.
* Volume Group (VG): This is made up of at least one or more physical volumes.
* Logical Volume (LV): This is sometimes referred to as the partition, it sits within a volume group and has a file system written to it.
* File System: A file system such as ext4 will be on the logical volume.
* Physical Extent (PE): unit shown by vgdisplay, kinda block size todo research
```
cryptsetup luksOpen /dev/nvme0n1p3 foo
lvreduce -r --size -${whatever}GiB /dev/mapper/azura--vg-root
vgchange -a n
cryptsetup luksClose foo
gparted /dev/nvme0n1
#now gparted can shrink luks with pv, but can't fuck with lvs
cryptsetup luksOpen /dev/nvme0n1p3 foo
vgdisplay
#extents are the number shown by vgdisplay, before the GiB number
lvextend --extents +$something /dev/mapper/azura--vg-swap_1
sudo mkswap /dev/mapper/azura--vg-swap_1
````
i wrote this in vim from a phone
maybe i should have enabled mouse
