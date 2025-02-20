---
redirectFrom: linux-MTA-forwarding
date: 2018-03-07
lastUpdated: 2022-06-06
title:  "Linux MTA Email Forwarding with nullmailer"
categories: linux
---

Notifications are useful when services fail.

Sadly, they often get sent to `root@127.0.0.1`, where they don't get read because nobody sets up their mta.

[nullmailer](https://untroubled.org/nullmailer/) to the rescue.


```
sudo apt-get install nullmailer mailutils
```


In `/etc/nullmailer/remotes` put
```
74.125.206.108 smtp --port=465 --auth-login --ssl --user=yourSendingEmail@domain.tld --pass=iWonderIfQuotesWorkForSpaces --insecure
```
The password comes from the app password thing, you need to setup two factor in the gmail account.


To test this, try running
```
echo "error" | NULLMAILER_NAME="Some Service" mail -s "issue with service" "yourReceivingEmail@domain.tld"
```
`NULLMAILER_NAME` is optional, but will set from name instead of just being from yourSendingEmail@domain.tld


## smartd configuration
That can also be used in cronjobs, or other reporting.

In `/etc/smartd.conf`, we set stuff to hopefully check `/dev/sda` for issues and report them.
```
/dev/sda -M test -s S/../.././02 -H -C 0 -U 0 -m yourReceivingEmail@domain.tld
```
This should send a test email on daemon start, and run a short test every day at 2:00.
The jury is still out as to if it sends a test email every day at 2:00.
The test should not report anything unless there are problems.

I never figured out how to set the env var `NULLMAILER_NAME`, so the from is just whatever email you're sending from, but it does report hostname in the topic.

And then finally in `/etc/default/smartmontools` uncomment `start_smartd=yes` to autostart because that's how you do it I guess?

## tmpfs

There is an issue with this if the hard drive fails and gets mounted read only, you don't get any email from smartd about how the hard drive has issues.

https://serverfault.com/questions/961168/sending-email-with-read-only-root-drive-by-using-a-tmpfs-for-var-spool-nullmail

fstab:
```
tmpfs /var/spool/nullmailer tmpfs nodev,nosuid,noexec,nodiratime,size=5M   0 0
```
Somehow run this before nullmailer daemon:
```
sudo mkdir /var/spool/nullmailer/tmp
sudo mkdir /var/spool/nullmailer/queue
sudo chown -R mail:root /var/spool/nullmailer/
sudo chmod 755 /var/spool/nullmailer/
sudo chmod 750 /var/spool/nullmailer/queue/
sudo chmod 750 /var/spool/nullmailer/tmp/
```

Now it's in a tmpfs!

Full script:

```
#!/bin/bash
set -xeu

if [[ $EUID != 0 ]] ; then
  echo This must be run as root!
  exit 1
fi

tee /etc/systemd/system/nullmailer-mount.service >/dev/null <<EOF
[Unit]
Description=populate /var/spool/nullmailer/
Before=nullmailer.service

[Service]
Type=oneshot
ExecStart=systemd-tmpfiles --create nullmailer.conf
ExecStart=mkdir -p /var/spool/nullmailer/tmp
ExecStart=mkdir -p /var/spool/nullmailer/queue
ExecStart=chown -R mail:root /var/spool/nullmailer/
ExecStart=chmod 755 /var/spool/nullmailer/
ExecStart=chmod 750 /var/spool/nullmailer/queue/
ExecStart=chmod 750 /var/spool/nullmailer/tmp/

[Install]
WantedBy=nullmailer.service
EOF

if ! grep nullmailer /etc/fstab>/dev/null ; then
  sudo tee -a /etc/fstab >/dev/null <<FSTAB

  tmpfs /var/spool/nullmailer tmpfs nodev,nosuid,noexec,nodiratime,size=5M   0 0
FSTAB
fi

mkdir -p /var/spool/nullmailer
mount -a


apt-get install nullmailer mailutils -y
systemctl enable nullmailer-mount.service

tee /etc/nullmailer/remotes >/dev/null <<EOF
74.125.206.108 smtp --port=465 --auth-login --ssl --user=yourSendingEmail@domain.tld --pass=iWonderIfQuotesWorkForSpaces --insecure
EOF

systemctl restart nullmailer

echo "testing on $HOSTNAME on $(date --iso=seconds)" | NULLMAILER_NAME="Nullmailer Setup Script on $HOSTNAME" mail -s "test email" "yourEmail@domain.tld"
```

----
* This was updated 2019-04-02 when I added the tmpfs stuff and rewrote parts.
* This was updated 2019-07-24 with setup script.
* This was updated 2021-10-27 with a better nullmailer-mount unit
* 2021-10-28 better mail test
* 2022-06-06 error checking in script
