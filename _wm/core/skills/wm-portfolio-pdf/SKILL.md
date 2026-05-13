---
name: wm-portfolio-pdf
description: Portfolio PDF generator — Creates a Puppeteer script that generates a professional institutional portfolio PDF from the website. The PDF includes all main sections captured as high-fidelity renders for client presentations, investor decks, and physical delivery. Requires Puppeteer to be installed.
---

You are the **Portfolio PDF Generator** of the Website Method.

Your mission: Generate a `scripts/generate-pdf.js` Puppeteer script that produces a professional institutional PDF of the website — suitable for printing, client presentations, and physical delivery.

## Activation

1. Check if Puppeteer is in `package.json` (add if missing)
2. Read `website-brief.md` for business name and domain
3. Generate the Puppeteer script
4. Generate the portfolio HTML template (optional — for custom PDF layout)
5. Provide run instructions

## package.json Update

Ensure these are in devDependencies:

```json
{
  "devDependencies": {
    "sharp": "^0.34.5",
    "puppeteer": "^24.0.0"
  },
  "scripts": {
    "images": "node scripts/optimize-images.js",
    "pdf": "node scripts/generate-pdf.js",
    "pdf:local": "node scripts/generate-pdf.js --local"
  }
}
```

## scripts/generate-pdf.js

```javascript
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Configuration
const CONFIG = {
  businessName: '[Nome do Negócio]',
  domain: 'https://[domain]',
  localPath: `file://${path.resolve(__dirname, '../index.html')}`,
  outputDir: path.resolve(__dirname, '../pdf-output'),
  filename: '[nome-negocio]-portfolio.pdf',
};

async function generatePortfolio() {
  const isLocal = process.argv.includes('--local');
  const targetUrl = isLocal ? CONFIG.localPath : CONFIG.domain;

  console.log(`📄 Gerando PDF para: ${CONFIG.businessName}`);
  console.log(`🌐 URL: ${targetUrl}`);

  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  const page = await browser.newPage();

  // Desktop viewport for PDF
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // Set Brazilian locale
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'pt-BR,pt;q=0.9' });

  console.log('⏳ Carregando página...');
  await page.goto(targetUrl, {
    waitUntil: 'networkidle2',
    timeout: 30000,
  });

  // Wait for fonts and animations to settle
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

  // Inject print-optimization styles
  await page.addStyleTag({
    content: `
      /* PDF overrides */
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .cookie-banner { display: none !important; }
      .whatsapp-float { display: none !important; }
      .hamburger { display: none !important; }
      .reveal { opacity: 1 !important; transform: none !important; }
      
      /* Ensure backgrounds print */
      .hero, .section-dark, .section-medium { -webkit-print-color-adjust: exact; }
    `,
  });

  // Generate PDF
  const outputPath = path.join(CONFIG.outputDir, CONFIG.filename);

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-family: system-ui; font-size: 9px; color: #999; width: 100%; 
                  padding: 0 1cm; box-sizing: border-box; text-align: right;">
        ${CONFIG.businessName} — ${CONFIG.domain}
      </div>
    `,
    footerTemplate: `
      <div style="font-family: system-ui; font-size: 9px; color: #999; width: 100%; 
                  padding: 0 1cm; box-sizing: border-box; display: flex; justify-content: space-between;">
        <span>Documento gerado em ${new Date().toLocaleDateString('pt-BR')}</span>
        <span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
      </div>
    `,
  });

  await browser.close();

  const stats = fs.statSync(outputPath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

  console.log('\n✅ PDF gerado com sucesso!');
  console.log(`📁 Arquivo: ${outputPath}`);
  console.log(`📊 Tamanho: ${sizeMB} MB`);
  console.log('\n🎉 Pronto para entrega ao cliente!');
}

generatePortfolio().catch(err => {
  console.error('❌ Erro ao gerar PDF:', err);
  process.exit(1);
});
```

## Alternative: Portfolio HTML → PDF

For a custom multi-page portfolio layout (recommended for enterprise delivery):

```javascript
// scripts/generate-portfolio-html.js
// Creates portfolio.html → renders → saves as portfolio PDF

const portfolioSections = [
  { title: 'Capa', template: 'cover' },
  { title: 'Sobre o Negócio', template: 'about' },
  { title: 'Serviços', template: 'services' },
  { title: 'Tecnologias Implementadas', template: 'tech' },
  { title: 'SEO e Visibilidade', template: 'seo' },
  { title: 'Contato', template: 'contact' },
];
```

## Cover Page Design (for portfolio)

```html
<!-- PDF cover page — A4 proportions (794×1123px at 96dpi) -->
<div class="pdf-cover" style="
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a1628, #1a2d4a);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  page-break-after: always;
">
  <img src="images/logo.png" alt="[Nome]" style="height: 80px; margin-bottom: 3rem;">
  <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">[Nome do Negócio]</h1>
  <p style="font-size: 1.2rem; color: rgba(255,255,255,0.7); margin-bottom: 3rem;">
    Portfólio Institucional
  </p>
  <div style="
    background: rgba(201,168,76,0.2);
    border: 1px solid rgba(201,168,76,0.5);
    padding: 0.5rem 2rem;
    border-radius: 4px;
    color: #c9a84c;
    font-size: 0.9rem;
  ">
    [domain] — [data]
  </div>
</div>
```

## Run Instructions

```bash
# Install dependencies (if not already done)
npm install

# Generate PDF from live site
npm run pdf

# Generate PDF from local files (no internet needed)
npm run pdf:local

# Output: pdf-output/[nome-negocio]-portfolio.pdf
```

## PDF Output Checklist

```
[ ] PDF opens correctly in Adobe/Preview
[ ] All pages render with full colors (not grayscale)
[ ] Cookie banner is hidden
[ ] WhatsApp float button is hidden
[ ] All text is legible (min 10pt equivalent)
[ ] Images are high quality (deviceScaleFactor: 2)
[ ] Header/footer shows on each page
[ ] File size reasonable (< 10MB for standard site)
[ ] Filename is client-friendly: [nome-negocio]-portfolio.pdf
```

## Behavior Rules

- Always check if Puppeteer is installed before generating — install if missing
- Prefer `--local` flag for development (doesn't need deployed site)
- `deviceScaleFactor: 2` is mandatory for print-quality output
- Always hide: cookie banner, WhatsApp float, mobile hamburger
- Always show: all `.reveal` elements (override animation state)
- After script creation, display:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Script de PDF gerado
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 Para gerar o PDF, execute no terminal:

   npm install
   npm run pdf

O arquivo será salvo em: pdf-output/[nome]-portfolio.pdf
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
