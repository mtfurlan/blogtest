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


`~/.gitconfig`: The big thing is to rewrite remote URLs to match the different
Host entries in your `~/.ssh/config`
```
[url "git@github.com-$enterprise:$enterpriseOrg"]
    insteadOf = git@github.com:$enterpriseOrg
```

So for example, if your enterprise organization is github.com/SecretStuff, you
would have
```
[url "git@github.com-SecretStuff:SecretStuff"]
    insteadOf = git@github.com:SecretStuff
```
so it uses the host `github.com-SecretStuff` instead of github.com, which your
ssh config will provide a different ssh key for

### per-directory git configuration

One neat feature git has is the ability to include a different config based on
what directory it's in, so you can get different config based on where a repo is
located on your computer
```
[includeIf "gitdir:~/work/"]
    path = ~/work/.gitconfig
```
