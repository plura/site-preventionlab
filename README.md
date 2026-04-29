# PreventionLab — Site

Corporate website for **PreventionLab**, a health & wellness company focused on stress, sleep, and longevity.

## Structure

```
/
├── placeholder/                    # Coming-soon landing page
│   ├── index.html
│   └── assets/
│       ├── css/
│       │   ├── base.css            # Reset, CSS vars (--pl-*), html/body
│       │   ├── layout.css          # Page structure, canvas, divider
│       │   └── components.css      # UI components (brand, modal, form, socials…)
│       ├── icons/                  # Local SVG brand icons
│       │   ├── facebook.svg
│       │   ├── instagram.svg
│       │   └── linkedin.svg
│       └── js/
│           ├── main.js             # Entry point (module)
│           ├── modal.js            # Native <dialog> modal + focus trap
│           └── particles.js        # Canvas particle background
└── .vscode/
    ├── sftp.json                   # SFTP credentials (gitignored)
    └── sftp.json.example           # Template — copy and fill in credentials
```

## SFTP Setup

Copy `.vscode/sftp.json.example` to `.vscode/sftp.json` and fill in your host credentials. The `sftp.json` file is gitignored to keep credentials out of the repo.

## Contact

- **Phone:** +351 912 198 818
- **Website:** [preventionlab.pt](http://www.preventionlab.pt)
