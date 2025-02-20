---
redirectFrom: dc28-mud
date: 2020-08-09
lastUpdated: 2020-08-09
title:  "Defcon 28 EvilMog's Mud Writeup"
categories:
---

This was my first defcon, and I chose to spend it playing the MUD from [EvilMog](https://mog.ninja/).

Here is my writeup.



![Mud MOTD](/assets/pages/dc28-mud/motd.png)


I ended up using Mudlet and tintin++ as my mud clients.

Mudlet is a GUI based thing, and does everything with LUA.
tintin++ is a command line client that lets me run arbitrary things.

The extent of prior experience with text adventures is playing some of the hitchikers guide, and a tiny bit of zork but never getting very far in either, so I spent quite a while on the newbie quest, figuring out how to kill things and such.

## Mapping
EvilMog was nice enough to have packaged a modified version of [a mudlet mapping script](https://wiki.mudlet.org/w/IRE_mapping_script).

![Top Sewer Level](/assets/pages/dc28-mud/sewer-1.png)

You had to be careful to help it with areas, because not all steps are equal sizes (especially when using the city transport system) and if you don't split things up everything will be on top of itself.
But overall the mapping worked really well, and made this doable at all for me.
You could also double click on a point to just navigate there, which really helped with the 5 layers of sewer and labyrinth.

## Crypto Mining Challenge
I think one of the things I spent the longest on was trying to solve the mining challenge.
When you type `crypto`, it gives you a prompt like
```
Solve: 37 * 607 / 127 - 916 * 213 / [blank] = -135
Represented in LPC as:
  total = (varA * varB / varC - varD * varE / varF);
```
and you must respond with `crypto 626`

One of the flags was for solving this 1000 times, and it also gives you money and XP.

I got all the fields split out by mudlet, and I just needed to process it.

### Attempt A:
My first thought was just calling something like mathematica, but I didn't have it installed, and mudlet doesn't seem to let you exec stuff.
It does however, have `getHTTP`, so I got the query working in wolfram alpha, looked up the API, and then found some API keys on pastebin.
Got it working with curl, life was good problem solved, right?

No, `getHTTP` is only in the next unreleased version of Mudlet, and after compiling that and trying it a bunch of the mapping scripts broke so I decided it wasn't worth it.

### Attempt B:
At this point I spent a while trying to actually solve math in lua.

I don't like lua it turns out.

I was continuously saying "what do you mean $commonFunction isn't built in", and then copying in a function like array length from the internet.

I started out trying to find the blank, and then searching back and forward till I found plus or minus so I could just add everything past those to the other side, but string processing was going poorly in lua.

A friend convinced me that converting it to RPN would make the problem easier, and I suspect that if I had ever done that before or lua was less terrible to work with this *might* have worked.
As it was, it was late and I was tired by the time I started, and it was early and I was very tired by the time I gave up.
I had converted it to an RPN stack, and was trying to figure out how to only reduce operations I could reduce at the point I gave up.

A different friend suggested turning the location of the blank and the priority of each operation into a state, and then doing a lookup table for the formula to apply to the variables, but I think it would have ended up at like 128 different options, and I didn't want to deal with that.

### Attempt 3:
At this point I just gave up on mudlet, and used tintin++ because while it has less built in scripting, you can just run whatever you want.


```
#!/bin/bash

# call this like "$0 '37 * 607 / 127 - 916 * 213 / [blank] = -135'"

#stuff to put in tintin++:
#alias {G} {#ticker {crypto} {crypto} {5}}
#alias {S} {#unticker crypto}
#action {^Solve: %1} {#script {res} {bash /tmp/crypto.sh "%1"}; #delay {1} {#show $res[1]; $res[1]}}

urlencode() {
  python -c 'import urllib, sys; print urllib.quote(sys.argv[1], sys.argv[2])' \
    "$1" "$urlencode_safe"
}

equation=$(echo "$1" | sed 's/.blank./x/')
encoded=$(urlencode "$equation")
apikey="google: api.wolframalpha appid site:pastebin.com"
curl --silent "http://api.wolframalpha.com/v2/query?appid=$apikey&output=json&input=N[solve[$encoded%2C+x]]" --globoff | jq '[.queryresult.pods[] | select(.title | contains("Substitution"))] | .[-1] | .subpods[0].plaintext' -r | sed s/'^..//' | awk '{print int($1+0.5)}' | sed 's/^/crypto /'
```

So I ran this overnight, and ended up with a lot of money and max level. This put me in a good place to try to solve the other things.


## Quests
```
-----------------------------------------------------------------
| Active Quests                                                 |
-----------------------------------------------------------------
| Newbie       - North From Start
| Pottles      - Find Pottles in the Sewer
| Wizard       - Find the wizard potion in the dungeon deep below the sewer
| Sewer        - Find and slay the sewer monster
| Ticket       - Go to the advancement room and find the tokens
| Parrot       - Find the mean parrot in the sewer beneath the labyrinth
| Evil         - Find kendall and ask him about rats
| Woodland     - Kill all the creature types in woodland
-----------------------------------------------------------------
```
A few of the quests were just find something and kill it or drink it, those happened in the course of other things.

I did these all concurrently, just focusing on one for a while till I got super stuck.

### Map Layout
I'm only going to describe how it changed from the [Nettitude Labs Derbycon 2019 writeup](https://labs.nettitude.com/blog/derbycon-2019-ctf-write-up/)

At the start there is still the woodland to the north, and a small starting area.
Everything else is down, and it's a one way trip to the city.

The sewers are accessed by going down in several places in the city, and the dungeons and labyrinths are beneath the sewers.
The grid style changed a few times, in the city and the sewers, it was XYZ with 0,0,0 being the center of the city.
The labyrinths and dungeons used letter and number mostly, but I didn't do too much navigation by references in them, so I didn't ever understand it well.

#### Teleportation
One useful tip: If you're not a fed, you can set your start room.
You can recall to your start room.
Start room format is stuff like
* `start_room=/domains/core/rooms/city/x40y-70z0.c`
* `start_room=/domains/required/rooms/start.c`
* `start_room=/domains/core/rooms/east/x300y-40z0.c`

Because it chagned based on area, I ended up turning on `save_on_quit`, quitting and rejoining, disabling it, and then modifying it to the coordinates I wanted.

### Sewer Quest
So to solve the sewer quest, first you must talk to Arnie.
* Arnie says: The monster is in the steam generators but its blocked by a vent.
* Arnie says: The vent is blocked by steam.
* Arnie says: To disable the steam you need to find generator control.
* Arnie says: You need a secard to access generator control.
* Arnie says: You need a tracker to find the secard.
* Arnie says: To get the tracker you will have to pry it from my cold dead hands.

The tracker pointed to an empty space, so teleported in and got the card.

After getting the card, I noticed that the hallway I exited into had the text `A large pipe juts out here to the west.`
Having things that the mapper doesn't show as options means reading is important.
Or just adding highlights. Either way.

Another cool thing about the IRE mapper is that you can set custom exits for rooms, so you can make it say `enter pipe` to go to a room so it can do pathfinding through that.

The next step of finding the generator control took forever, even with instructions that were a bit past hints from EvilMog.
Part of it was that I had mapped out some of the sewer into the wrong area, and I was trusting my map.

So shockingly enough, below the hydro generators there is a weird basement, and a room that says "The western wall here looks a little bit artificial."
Go through the wall, and magic, generator controls.
You use them to disable steam for 5 minutes.

Searching my logs for "steam", I found that Hydro Generator #5 has "An abnormal amount of steam appears to be rising from the floor."
Go down from that, stab a baddie, receive flag.


### Evil Quest
The first instructions is to "Find kendall and ask him about rats"
He tells us to go kill a rat queen in a bio lab in shay park.

![Image from Nettitude Derbycon 2019 from EvilMog](/assets/pages/dc28-mud/bio-lab.png)

This was one of the places the Nettitude Labs writeup came in handy.
EvilMog shared a picture of a map, and they had it.

After that, we have to
* kill the queen rat
* talk to kendall
* talk to carson
* kill the Cyberslime
* talk to norman
* find norman's wallet
* break into a storage closet, "touch padd"
* access Grey's computer
* talk to Old Tom the miner
* touch padd
* talk to EvilMogs Agent
* stab johnson
* find the sandworm pits
* Decide if you support the church of wifi or prefer the sweet embrace of an airlock opening
  * You do this by typing "access $choice" at the touch padd, I spent way too long trying to figure out what the access code was or where to enter it.


### Key Quest
This quest is to find eight buttons.
SweetJesus gave me the location of the first, and from that I could see the kinds of things to look for:
```
EvilMog Park

This park just seems to go on and on, almost as if its cheap filler for some sort of demonic
quest thought up by overlord EvilMog. This area shows no originality and its probably just here to
mess with you. A shrub is somewhere in this chaos.

> look shrub
Underneath this shrub is a purple button.
```

I found seven of the eight buttons, the last one is "Key 1 - City"



## CTF

So saturday afternoon I decided to try to figure out what to do with the flags I had been finding.
Turns out there is a leaderboard, and there are things like "find this specific snake in the sewer" that give points.
Also, you can get more points for doing everything again but as a fed (hardmode).

I did this in spite of the Nettitude team doing the *exact same thing* and talking about it in their writeup.
After this discovery I proceeded to have a surprise starfinder game I had agreed to a week ago, and lost quite a bit of time to that.

I found most of the animals and finished most of the stuff sunday morning.
One annoying that that I'm really glad EvilMog shared is
```
[gossip] Evilmog: oh this is evil, the explore flags depend on the player who discovers that
```
So I was wandering around with a low level fed, and any time I found something I would check the flag against my list, and if it was the hacker/human flag, I would have a high level character come kill it.
It took a while to get all the fed flags this way, because there was another hacker wandering around at the same time.

The last flags I got were actually the intro quest, because I can't read signs and had to wait for someone to explain that you have to claim the quest to get the flag, not just get the "$person completed the quest" notification.
Feds can't use the start_room teleport trick, so I had to do the intro quest a fourth time sunday morning.

## Things learned
* Make sure logging is enabled the entire time, to enable room text search
* Look at the actual place to submit flags at the start
* Commands are confusing and if I want to do this again I should probably play more muds
* Finding exits that require special commands is annoying

Overall it was amazing fun, and a great first Defcon and first MUD thanks to [EvilMog](https://twitter.com/Evil_Mog)
