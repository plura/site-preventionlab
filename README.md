# Prevention Lab — Site

Corporate website for **Prevention Lab**, a preventive medicine clinic focused on stress, sleep, and longevity. Porto.

## Structure

```
/
├── placeholder/                        # Coming-soon landing page
│   ├── index.html
│   ├── app/                            # Server-side form processing (not public)
│   │   ├── submit.php                  # Form handler — validates, sends email + auto-reply
│   │   ├── config.example.php          # SMTP config template — copy to config.php and fill in
│   │   ├── config.php                  # SMTP credentials (gitignored, create on server)
│   │   ├── lib/phpmailer/              # PHPMailer core files
│   │   └── templates/
│   │       ├── email-contact.html      # HTML email template
│   │       ├── logo-350x250.png        # Logo used in email header
│   │       └── .htaccess               # Deny direct access to templates/
│   └── assets/
│       ├── css/
│       │   ├── base.css                # Reset, CSS vars (--pl-*), html/body
│       │   ├── layout.css              # Page structure, canvas, divider
│       │   ├── components.css          # UI components (buttons, modal, form, socials…)
│       │   └── logo.css                # Logo layout and vars (--pl-logo-*)
│       ├── icons/                      # SVG brand icons (social)
│       │   ├── facebook.svg
│       │   ├── instagram.svg
│       │   └── linkedin.svg
│       ├── images/
│       │   └── og.png                  # Open Graph image
│       └── js/
│           ├── main.js                 # Entry point — wires up all modules
│           ├── animations.js           # Entrance animation orchestrator (FLIP + layout cascade)
│           ├── logo.js                 # Logo animation sequence (GSAP timeline)
│           ├── modal.js                # Native <dialog> modal + focus trap
│           └── particles.js            # Canvas particle background
└── .vscode/
    ├── sftp.json                       # SFTP credentials (gitignored)
    └── sftp.json.example               # Template — copy and fill in credentials
```

## SFTP Setup

Copy `.vscode/sftp.json.example` to `.vscode/sftp.json` and fill in your host credentials. The `sftp.json` file is gitignored.

## Form Setup

Copy `placeholder/app/config.example.php` to `placeholder/app/config.php` on the server and fill in SMTP credentials. The `config.php` file is gitignored and must be created manually on the server.

## Contact

- **Phone:** +351 912 198 818
- **Website:** [preventionlab.pt](https://preventionlab.pt)
