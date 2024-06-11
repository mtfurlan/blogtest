---
title: Automagic ssh authentication for multiple github accounts
---

At $work we have multiple github organizations, some of which are associated
with my personal github account, and one of which is an enterprise thing that
can't share accounts.


`~/.ssh/config`: setup different Host entries with different keys for each
github account
```
Host github.com
    IdentityFile ~/.ssh/github_ed25519
Host github.com-$enterprise
    Hostname github.com
    IdentityFile ~/.ssh/github_$enterprise_ed25519
```


`~/.gitconfig`: The big thing is to rewrite remote URLs to match the different Host entries in your `~/.ssh/config`
```
[url "git@github.com-$enterprise:$enterpriseOrg"]
    insteadOf = git@github.com:$enterpriseOrg
```

One neat feature git has is the ability to include a different config based on
what directory it's in, so you can get different config based on where a repo is
located on your computer
```
[includeIf "gitdir:~/work/"]
    path = ~/work/.gitconfig
```
