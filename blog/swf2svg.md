---
title: Notes on extracting SVG from SWF
---

I Found a flash thing with a vector I wanted, how to do this in 2024 was a little annoying to work out.

## Tools required:
* [swftools](http://www.swftools.org/)
  * tools for extracting stuff from SWFs
  * building: download repo, make changes, build
* [swf-convert](https://github.com/maltaisn/swf-convert)
  * convert extracted assets to svg
  * just download the jar

### building swftools
Gotta fix a warning about comparing a pointer to a number:
```
925c925
<     if(pos1=0)
---
>     if(pos1 != NULL)
927c927
<     else if(pos2>=0)
---
>     else if(pos2 != NULL)
```


Because of the way they build each lib separate then link, tell linker to ignore multiple defines, it's *probably* fine (worked for me!)
```
LDFLAGS="-z muldefs" CFLAGS=-ggdb ./configure
make
```

## extracting
### find interesting paths
swfextract gives a list of paths, manually edit it and
```
for i in $paths; do ../swftools-0.9.2/src/swfextract ../whatever.swf -i "$i" -o "$i.swf" && ../swftools-0.9.2/src/swfrender "$i.swf" -o "$i.png"; done
```
Look at the output pngs to find which IDs we want.

### turn paths into svg
```
java -jar ../swf-convert.jar svg $id.swf
```
outputs `$id.svg`
