# Prevention Lab — Site

Corporate website for **Prevention Lab**, a preventive medicine clinic focused on stress, sleep, and longevity. Porto.

> Structural parity with [site-placeholder-starter](https://github.com/plura/site-placeholder-starter)
> as of `248ab80` (2026-07-21), plus the `starter/` + `starter/custom/` folder split adopted
> 2026-08-21. Not a fork — this project independently converged with the starter's conventions,
> and is in fact one of the two sources it was extracted from. The starter's newer mailing-list,
> multi-language and dark/light-mode features were deliberately not brought in here.
>
> `starter/app/` and `starter/assets/` are the folders to diff against the starter when an
> update lands; `starter/custom/` never came from it. See `placeholder/starter/custom/README.md`.

## Structure

```
/
├── mail-templates/                     # MJML source for transactional emails (not deployed)
│   ├── _partials/
│   │   ├── _head.mjml                  # Shared mj-attributes, mj-style, mj-class definitions
│   │   ├── _header.mjml                # Logo + accent divider
│   │   ├── _fields.mjml                # Form-data table (shared by contact + contact-reply)
│   │   ├── _footer.mjml                # Contact info + social links
│   │   └── _credit.mjml                # Copyright / Plura credit line
│   └── contact/
│       ├── contact.mjml                # Notification email (to the clinic)
│       └── contact-reply.mjml          # Auto-reply email (to the submitter)
├── placeholder/                        # Coming-soon landing page (this folder is the webroot)
│   ├── index.html
│   └── starter/                        # Everything the starter owns, plus the custom slot
│       ├── app/                        # Server-side form processing (not public)
│       │   ├── submit.php              # Form handler — agnostic to fields, sends email + auto-reply
│       │   ├── config.example.php      # SMTP config template — copy to config.php and fill in
│       │   ├── config.php              # SMTP credentials (gitignored, create on server)
│       │   ├── lib/phpmailer/          # PHPMailer core files
│       │   └── templates/
│       │       ├── contact.html        # Compiled from mail-templates/contact/contact.mjml
│       │       ├── contact-reply.html  # Compiled from mail-templates/contact/contact-reply.mjml
│       │       └── .htaccess           # Deny direct access to templates/
│       ├── assets/
│       │   ├── css/
│       │   │   ├── base.css            # Reset, CSS vars (--pl-*), html/body
│       │   │   ├── layout.css          # Page structure, divider
│       │   │   └── components.css      # UI components (buttons, modal, form, socials…)
│       │   ├── icons/                  # SVG brand icons (social)
│       │   │   ├── facebook.svg
│       │   │   ├── instagram.svg
│       │   │   └── linkedin.svg
│       │   ├── images/
│       │   │   ├── og.png              # Open Graph image
│       │   │   └── mail/
│       │   │       └── logo-350x250.png # Logo used in email header (must be public — fetched by email clients)
│       │   └── js/
│       │       ├── main.js             # Entry point — wires the starter modules to the custom components
│       │       ├── animations.js       # Generic entrance orchestrator (FLIP + layout cascade), hero-agnostic
│       │       └── modal.js            # Native <dialog> modal + focus trap
│       └── custom/                     # Bespoke code with no starter equivalent — see its README
│           └── components/
│               ├── logo/               # logo.css (layout + --pl-logo-* vars), logo.js (GSAP intro)
│               └── particles/          # particles.css (#bg-canvas), particles.js (canvas backdrop)
└── .vscode/
    ├── sftp.json                       # SFTP credentials (gitignored)
    ├── sftp.json.example               # Template — copy and fill in credentials
    └── settings.json                   # mjml.allowIncludes / mjml.includePath for live preview
```

## SFTP Setup

Copy `.vscode/sftp.json.example` to `.vscode/sftp.json` and fill in your host credentials. The `sftp.json` file is gitignored.

## Form Setup

Copy `placeholder/starter/app/config.example.php` to `placeholder/starter/app/config.php` on the server and fill in SMTP credentials. The `config.php` file is gitignored and must be created manually on the server.

## Email Templates

Source lives in `mail-templates/` (MJML), compiled to `placeholder/starter/app/templates/*.html` for `submit.php` to load. Rebuild after editing:

```
npx mjml mail-templates/contact/contact.mjml -o placeholder/starter/app/templates/contact.html --config.allowIncludes true --config.includePath . --config.minify true
npx mjml mail-templates/contact/contact-reply.mjml -o placeholder/starter/app/templates/contact-reply.html --config.allowIncludes true --config.includePath . --config.minify true
```

## Contact

- **Phone:** +351 912 198 818
- **Website:** [preventionlab.pt](https://preventionlab.pt)
