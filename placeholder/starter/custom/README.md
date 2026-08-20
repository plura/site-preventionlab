# starter/custom/

The slot set aside for code the [starter](https://github.com/plura/site-placeholder-starter)
doesn't ship. Nothing in here came from it, so when a starter update lands, `starter/app/` and
`starter/assets/` are the folders worth diffing and this one is the folder to ignore outright.

## What's here

```
custom/
  components/
    logo/       logo.css + logo.js — the animated Prevention Lab logo and its intro timeline
    particles/  particles.css + particles.js — the drifting-motes canvas backdrop
```

Both are wired from `starter/assets/js/main.js`, which passes them into the starter's generic
`initAnimations()` as the page's hero and backdrop. That keeps `animations.js` free of any logo
or canvas specifics — it orchestrates the entrance, the components supply what's entering.

Component stylesheets are linked from `index.html` after the three starter stylesheets, so they
can override them.

## What doesn't go here

Edits to files the starter owns: brand tokens stay in `starter/assets/css/base.css`, page copy
and logo markup in `index.html`, endpoint behaviour in `starter/app/`. No folder catches those —
that's what the starter-commit note in the project README is for.

`custom/` is live code: it deploys like any other directory, don't add it to the SFTP ignore list.
