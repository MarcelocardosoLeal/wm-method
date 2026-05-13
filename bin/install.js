#!/usr/bin/env node
/* ============================================================
   Website Method — Instalador CLI
   Uso:
     node bin/install.js          # instala no diretório atual
     node bin/install.js --all    # força todas as plataformas
     npx wm-method install        # quando publicado no npm
   ============================================================ */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT_SOURCE = path.resolve(__dirname, '..');
const TARGET      = process.cwd();

const c = {
  reset:'\x1b[0m', bold:'\x1b[1m',
  green:'\x1b[32m', yellow:'\x1b[33m', cyan:'\x1b[36m',
  red:'\x1b[31m', gray:'\x1b[90m',
};
const ok   = (m) => console.log(`${c.green}✓${c.reset} ${m}`);
const info = (m) => console.log(`${c.cyan}ℹ${c.reset} ${m}`);
const err  = (m) => console.log(`${c.red}✗${c.reset} ${m}`);
const bold = (m) => `${c.bold}${m}${c.reset}`;
const dim  = (m) => `${c.gray}${m}${c.reset}`;

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function main() {
  console.log('');
  console.log(`${bold('Website Method — Instalador')} ${dim('v2.0')}`);
  console.log(c.gray + '─'.repeat(50) + c.reset);

  /* Cenário 1 — instalação local (sync.js já existe) */
  const localSync = path.join(TARGET, '_wm', 'core', 'lib', 'sync.js');
  if (fs.existsSync(localSync)) {
    info('Website Method já está instalado neste projeto.');
    info('Rodando sincronização com IDEs detectadas...');
    console.log('');
    require(localSync);
    return;
  }

  /* Cenário 2 — instalação fresh (npx wm-method install) */
  info(`Instalando Website Method em: ${TARGET}`);
  console.log('');

  /* copiar _wm/ */
  const sourceWm = path.join(ROOT_SOURCE, '_wm');
  const targetWm = path.join(TARGET, '_wm');
  if (fs.existsSync(sourceWm)) {
    copyDir(sourceWm, targetWm);
    ok(`_wm/ instalado ${dim('(skills, config, lib)')}`);
  } else {
    err('Fonte _wm/ não encontrada no pacote.');
    process.exit(1);
  }

  /* criar pastas de input */
  const briefingDir = path.join(TARGET, 'briefing');
  if (!fs.existsSync(briefingDir)) {
    fs.mkdirSync(briefingDir, { recursive: true });
    fs.writeFileSync(
      path.join(briefingDir, 'README.md'),
      '# Briefing\n\nColoque aqui qualquer arquivo de briefing (.md, .txt, .pdf, .docx).\nOs agentes leem automaticamente e evitam repetir perguntas.\n'
    );
    ok(`briefing/ criado`);
  }

  const assetsDir = path.join(TARGET, 'assets-cliente');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(path.join(assetsDir, 'fotos'),  { recursive: true });
    fs.mkdirSync(path.join(assetsDir, 'textos'), { recursive: true });
    fs.mkdirSync(path.join(assetsDir, 'docs'),   { recursive: true });
    ok(`assets-cliente/ criado ${dim('(fotos, textos, docs)')}`);
  }

  /* rodar sync */
  console.log('');
  info('Sincronizando para IDEs detectadas...');
  console.log('');
  require(path.join(targetWm, 'core', 'lib', 'sync.js'));
}

main();
