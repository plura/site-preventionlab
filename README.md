# Prevention Lab — Site

Corporate website for **Prevention Lab**, a preventive medicine clinic focused on
stress, sleep, and longevity. Porto. Copy is PT-PT throughout.

## Placeholder

`placeholder/` is a customized [site-placeholder-starter](https://github.com/plura/site-placeholder-starter),
brought to parity with commit [`ba6d506`](https://github.com/plura/site-placeholder-starter/tree/ba6d506)
in 2026-08. It mirrors the starter's structure 1:1 — the starter's repo root is
our `placeholder/`.

**Not a fork.** This project independently converged with the starter's
conventions and is one of the two sources it was extracted from, so "parity"
here means the shapes agree, not that files were copied down wholesale.

**How any of it works — setup, the mail-template build, MJML gotchas — is
[documented in the starter](https://github.com/plura/site-placeholder-starter/tree/ba6d506#readme),
not repeated here.** Links are pinned to the ported commit. Only what this
project does *differently* is below.

### Divergences

- **The email design is this project's own** — a light frame around a white card
  with a lime accent rule, a CTA button and a quoted-message block. The starter's
  card-plus-dark-band design is not used, so `BRAND_DARK*` and `BRAND_RADIUS*`
  don't exist here and two extra colours do (`BRAND_RULE`, `BRAND_CREDIT`). Only
  the *build* is shared: **never diff the `.mjml` against the starter's**, only
  the pipeline around them. See `mail-templates/_tokens.json`.
- **`tools/build-mail.mjs` derives two extra tokens** — `CLIENT_EMAIL_DISPLAY`
  and `CLIENT_PHONE_DISPLAY`, which insert zero-width non-joiners so Gmail stops
  auto-detecting the address and phone number and recolouring them over the
  inline anchor styles. This is an edit to a starter-owned file, so it needs
  merging by hand on the next port — and is worth upstreaming.
- **`mail-templates/tokens.json` is committed**, not gitignored as the starter
  does it. The starter withholds it because it's a reusable template that
  shouldn't carry client data — moot inside the project's own repo.
- **"Obrigada" in the auto-reply is deliberate.** It agrees with the speaker,
  Dra. Cristina Ferreira Leite, not the reader, so the starter's Portuguese
  gender-neutrality rule doesn't apply. Don't "fix" it.
- **`starter/custom/`** — `js/animations.js` (the GSAP entrance sequence) and
  `components/logo/` + `components/particles/`. This project's own code; never
  diff it against the starter.
- **Bilingual, with Portuguese as the base** — PT at `/`, EN at `/en/`, both
  indexed and cross-linked. That is the inverse of the starter, which ships
  English at the root, so check which direction its examples mean:
  `$BASE` in `strings.php` is Portuguese and `$OVERRIDES['en']` is the delta,
  and the second reply template is `contact-reply.en.mjml`.
- **No mailing list and no dark/light mode.** Both are starter features
  deliberately not brought in. `submit.php` has no newsletter block; the CSS is
  a single palette. Reinstating either means copying the marked blocks back.
- **CSS tokens are `--pl-*`, not `--site-*`.** The naming predates the starter's.
  A `base.css` change from the starter never applies verbatim here.

### Day-to-day

All run from `placeholder/`:

- `npm run build:mail` — after any `mail-templates/` edit. Output goes straight
  to `starter/app/templates/`, which is what PHP reads; there is no `dist/` and
  no copy step.
- `npm run check:config` — after adding or removing a feature in the markup.
- `npm run check:pages` — after editing `index.html` or `en/index.html`; they
  are copies of each other and nothing else keeps them in step.

Uncommitted local files, both gitignored: `.vscode/sftp.json` (from
`.vscode/sftp.json.example`) and `placeholder/starter/app/config.php` (from
`config.example.php` — SMTP and the contact addresses).

## Deployment

The starter's standard — [see it there](https://github.com/plura/site-placeholder-starter/blob/ba6d506/docs/deploying.md),
values are in [`.cpanel.yml`](.cpanel.yml). Merging to `main` deploys. SFTP stays configured
for the one thing a git deploy can never carry: `placeholder/starter/app/config.php`.

**The live site is behind the repo, and by two structural steps** — preventionlab.pt still
serves the pre-`starter/` flat layout. So the first deploy after this is a restructure: it needs
`config.php` moved to `starter/app/` on the server *first*, and leaves the old `assets/` and
`app/` directories live afterwards, since `cp -R` cannot delete. Both are manual, once.

## Contact

- **Phone:** +351 912 198 818
- **Website:** [preventionlab.pt](https://preventionlab.pt)
