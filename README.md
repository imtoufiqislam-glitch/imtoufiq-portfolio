# Toufiq — Developer & Digital Marketer Portfolio

Interactive 3D-enhanced personal portfolio built with **React**, **TypeScript**, **Tailwind CSS v4**, **Three.js**, and **Motion** — optimized for Android mobile browsers and desktop screens.

---

## Local Development & Production Build

```bash
npm install
npm run dev      # Local preview on http://localhost:3000
npm run build    # Production build into ./dist (includes .htaccess, favicon, assets)
```

---

## Deploy from GitHub to cPanel (3 Ways)

### Option 1 (Recommended): Automatic Deploy via GitHub Actions → cPanel FTP

Shared cPanel hosting often lacks Node.js 20+ or enough RAM to run `vite build`. This repository includes `.github/workflows/cpanel-deploy.yml`, which builds your site on GitHub and automatically uploads `dist/` (including `.htaccess`) to your cPanel `public_html/` on every push to `main`.

1. Push this project to your GitHub repository (`main` branch).
2. In cPanel, open **FTP Accounts** (or use your main cPanel FTP login) and note your FTP Host, Username, and Password.
3. In your GitHub repo, go to **Settings → Secrets and variables → Actions → New repository secret** and add:
   - `FTP_SERVER` — e.g. `ftp.imtoufiq.xyz` (or your cPanel server IP)
   - `FTP_USERNAME` — your cPanel / FTP username
   - `FTP_PASSWORD` — your cPanel / FTP password
   - `FTP_SERVER_DIR` *(optional)* — defaults to `./public_html/` (change only if deploying to a subdomain or addon domain folder, e.g. `./public_html/` or `./imtoufiq.xyz/`)
4. Push any commit to `main` (or trigger **Build and Deploy to cPanel** manually from the GitHub **Actions** tab).

---

### Option 2: cPanel Git™ Version Control (`.cpanel.yml`)

This repository includes `.cpanel.yml` configured to always run a fresh production build (`npm ci` when `package-lock.json` is present, otherwise `npm install`, followed by `npm run build`) and deploy only the compiled contents of `dist/` into `$HOME/public_html/` while preserving your existing `.htaccess` and cPanel system files.

1. In cPanel, open **Git™ Version Control → Create**.
2. Paste your GitHub repository URL (`imtoufiq-portfolio`) and set a repository path (e.g. `/home/USERNAME/repositories/imtoufiq-portfolio`).
3. Click **Manage → Pull or Deploy → Update from Remote**, then click **Deploy HEAD Commit**.
   - *Tip:* If your shared cPanel plan does not provide Node.js 20+ in shell PATH, use **Option 1 (GitHub Actions)** or **Option 3 (Manual Build Upload)**.

---

### Option 3: Manual Build & Upload to `public_html`

1. Run `npm install && npm run build` locally.
2. Zip the **contents inside** the `dist/` folder (make sure hidden `.htaccess` is included).
3. Open **cPanel → File Manager → `public_html`**, upload the zip, and click **Extract**.

---

## Included cPanel & SEO Production Files

- `public/.htaccess` — Automatically copied to `dist/.htaccess`; handles Apache/LiteSpeed SPA routing, Gzip compression, asset caching, and security headers.
- `.cpanel.yml` — Deployment tasks for cPanel Git™ Version Control.
- `.github/workflows/cpanel-deploy.yml` — Automated GitHub → cPanel build & FTP deployment workflow.
- `public/favicon.svg` — Custom brand icon for desktop & Android Chrome tabs.
- `public/robots.txt` & `public/sitemap.xml` — Search indexing configuration for `https://imtoufiq.xyz`.
