# Jonathan Gunawan – Portfolio

Live site: https://jonathangun.github.io/personal-website/

I design, build, and scale practical software: cloud-backed platforms, internal tooling, automation workflows, data/reliability improvements, and developer experience enhancements. I enjoy taking ambiguous problems and shipping lean, reliable solutions quickly.

## Snapshot
- Infrastructure & automation mindset (cloud, deployment, reliability)
- Full-stack delivery: prototypes → production (React / Next.js / APIs)
- Competitive programming background (fast problem decomposition)
- Strong bias toward maintainable, incremental architectures

## Selected Projects (Representative Samples)
| Project | What It Does | Highlights |
| ------- | ------------ | ---------- |
| **Tha-GPT** | Unified interface for multiple LLM providers (OpenAI, Anthropic, self-hosted). | Multi-provider abstraction; deployable on Cloud Run; customizable backends. [Live](https://thagpt-182249571755.asia-southeast2.run.app) · [Repo](https://github.com/JonathanGun/LibreChat) |
| **Property Marketing Agreement System** | Digital property marketing agreements with PDF generation & e-sign workflow. | Automates document lifecycle; integrates Google Drive & form ingestion. [Repo](https://github.com/JonathanGun/perjanjian-jasa-pemasaran-properti) |
| **E‑commerce + Admin Dashboard** | MERN + PHP hybrid for storefront + operational admin views. | Modular microservice style exploration; role-based panels. [Repo](https://github.com/JonathanGun/choco-factory-php) |
| **Minecraft Server Dashboard** | Real‑time orchestration of private modded servers. | Cloud Run + React control panel; automation for start/stop cycles. [Repo](https://github.com/JonathanGun/minecraft-server-controller-ui) |
| **File Encryption Tool** | Desktop-style UI for multi‑algorithm file encryption (RSA / ElGamal / Paillier / ECC). | Multi‑algo comparison; educational cryptography utility. [Repo](https://github.com/JonathanGun/RSA-ElGamal-Paillier-ECC-PySimpleGUI) |
| **Masyu Puzzle Solver** | Computer vision + logical solver for Masyu puzzles. | OpenCV parsing + constraint reasoning pipeline. [Repo](https://github.com/JonathanGun/masyu-solver) |

More on the live site (including achievements, education, smaller experiments, and challenge solutions).

## Technical Themes
- Cloud deployment (Cloud Run, Vercel, container-first approaches)
- Data workflows & reliability (scripting, validation, repeatability)
- Developer experience (tooling, dashboards, internal productivity surfaces)

## Contact
For roles, collaborations, or interesting problems:
- LinkedIn: https://www.linkedin.com/in/jonathanyudigun
- Email: mailto:jonathanyudigun@gmail.com

## Quick Start (Local Preview)
Want to run the site locally?
```bash
npm install
npm run develop
```
Browse: http://localhost:8000

## Social Preview Card (Open Graph / Twitter Image)
The repository also auto-generates a social preview SVG (`/static/social-card.svg`) during the build so that Open Graph / Twitter large card embeds display a branded image.

### How It Works
- Script: `scripts/generate-social-card.mjs`
- Trigger: Runs automatically as part of `npm run build` (see the build script in `package.json`).
- Output: `static/social-card.svg` (referenced in `siteMetadata.image` inside `gatsby-config.ts`).
- Gatsby includes this in meta tags through the `SEO` component.

### Regenerating Manually
If you edit the script and want to test the output quickly:
```bash
node scripts/generate-social-card.mjs
open static/social-card.svg
```
