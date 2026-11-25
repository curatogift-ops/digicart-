# DigiKart Solutions — Corporate Website

Static HTML / CSS / JS website for DigiKart Solutions, Greater Noida West.

## Run locally

```bash
npx serve .
```

Then open http://localhost:3000.

## Editing content

| What | Where |
| --- | --- |
| Digital service pages | `content/services.js` |
| Computer courses (duration, fees, highlights) | `content/courses.js` |
| Education / admission programmes | `content/education.js` |
| Printing products & prices | `content/printing.js` |
| Phone, email, address, hours, domain | top of `build-site.js` |
| Page layouts and copy | `build-site.js` |
| Styles / colours | `css/styles.css` (tokens in `:root`) |
| Interactions (menu, search, tabs, FAQ, form) | `js/main.js` |
| Logo, favicon, photos | `assets/` |

After editing `content/services.js` or `build-site.js`, regenerate all pages:

```bash
node build-site.js
```

## Before going live

- Replace `SITE_URL` in `build-site.js` with the final domain and rebuild (canonical tags, sitemap, Open Graph).
- Set confirmed working hours in `HOURS`.
- Replace the generated photos in `assets/` with real photos of the shop if available.
- The enquiry form validates input and opens WhatsApp with the enquiry pre-filled. To also email
  enquiries to the business, connect the form to a form service (e.g. Formspree, Web3Forms) or a serverless function.
