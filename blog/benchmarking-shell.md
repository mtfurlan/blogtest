---
title: Benchmarking shell pipe stuff
---

I came across the [following snippet](https://unix.stackexchange.com/a/394723):
```
apt-get --just-print upgrade | grep -i security | awk '{print $2}' | awk '!seen[$0]++'
```
a minute of thinking aobut it, it's the same as
```
apt-get --just-print upgrade | grep -i security | awk '{print $2}' | sort | uniq
```
so why not write it that way?

feels like a performance thing, but why not make it all a single awk call?
```
awk '/security/ && !seen[$2]++ {print $2}'"
```

## benchmarking
So I played with [hyperfine](https://github.com/sharkdp/hyperfine) to try to
get some intuition for actual speeds

```
apt-get --just-print upgrade > /tmp/data
for i in $(seq 1 500); do cat /tmp/data >> /tmp/biggerdata; done

hyperfine \
    "cat /tmp/biggerdata | grep -i security | awk '{print \$2}' | awk '!seen[\$0]++'" \
    "cat /tmp/biggerdata | grep -i security | awk '!seen[\$2]++ {print \$2}'" \
    "cat /tmp/biggerdata | grep -i security | awk '{print \$2}' | sort | uniq" \
    "cat /tmp/biggerdata | grep -i security | cut -d' ' -f2 | sort | uniq" \
    "cat /tmp/biggerdata | awk '/security/i && !seen[\$2]++ {print \$2}'" \
    "cat /tmp/biggerdata | grep -i security | awk '!seen[\$2]++ {print \$2}'" \
    "cat /tmp/biggerdata | grep -i security | cut -d' ' -f2 | awk '!seen[\$0]++'" \
    "cat /tmp/biggerdata | awk '/security/i' | awk '!seen[\$2]++ {print \$2}'" \
    "cat /tmp/biggerdata | awk '/security/i && !seen[\$2]++ {print \$2}'"
```
```
                                  'cat /tmp/biggerdata | grep -i security | awk '{print $2}' | awk '!seen[$0]++'' ran
    1.00 ± 0.04 times faster than 'cat /tmp/biggerdata | grep -i security | cut -d' ' -f2 | awk '!seen[$0]++''
    1.01 ± 0.05 times faster than 'cat /tmp/biggerdata | grep -i security | awk '!seen[$2]++ {print $2}''
    2.67 ± 0.13 times faster than 'cat /tmp/biggerdata | awk '/security/i' | awk '{print $2}' | awk '!seen[$0]++''
    4.08 ± 0.14 times faster than 'cat /tmp/biggerdata | awk '/security/i && !seen[$2]++ {print $2}''
    5.39 ± 0.17 times faster than 'cat /tmp/biggerdata | grep -i security | awk '{print $2}' | sort | uniq'
    5.44 ± 0.20 times faster than 'cat /tmp/biggerdata | grep -i security | cut -d' ' -f2 | sort | uniq'
```
the original thing with one grep and two awk is always the fastest?
what?

## conclusions
each of these claims is verified by head to head comparison with hyperfine
* `cut -d' ' -f2` is basically the same as `awk '{print $2}'`
* `awk '!seen[$0]++'` is way faster than `sort | uniq`
* `grep -i security` is way faster than `awk '/security/i'`
* `awk '{print $2}' | awk '!seen[$0]++'"` is a little faster than `awk '!seen[$2]++ {print $2}'`
* `awk '/security/i' | awk '!seen[$2]++ {print $2}'` runs 1.59 ± 0.07 faster than `awk '/security/i && !seen[$2]++ {print $2}'`

So I guess more invocations of awk is faster than more complex awk scripts?
I guess awk is slow, but less slow than `sort | uniq`?

## other scripting languages
### perl
```
perl -ne '@a = split " "; print "$a[1]\n" if /security/i && !$seen{$a[1]}++'
```
* 7.95 ± 0.29 times slower than the fastest grep+awk+awk
* 1.96 ± 0.05 times slower than the entirely awk

### python
```
python -c "import sys; print('\n'.join(set([package for line in sys.stdin if 'security' in line.lower() and (package := line.split(' ')[1])])))"
```
* 3.58 ± 0.14 times slower than the fastest grep+awk+awk
* 1.14 ± 0.04 times *faster* than the entirely awk
