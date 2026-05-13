#!/usr/bin/env node
/* ============================================================
   Website Method — Sync (BMad-style otimizado)
   Distribui _wm/core/skills/ para todas as IDEs configuradas

   Uso:
     node _wm/core/lib/sync.js              # auto-detecta IDEs
     node _wm/core/lib/sync.js --all        # força todas as IDEs
     node _wm/core/lib/sync.js --only=claude-code,cursor
   ============================================================ */

'use strict';

const fs   = require('fs');
const path = require('path');

/* ── cores ── */
const c = {
  reset:'\x1b[0m', bold:'\x1b[1m', dim:'\x1b[2m',
  green:'\x1b[32m', yellow:'\x1b[33m', cyan:'\x1b[36m',
  red:'\x1b[31m', gray:'\x1b[90m', blue:'\x1b[34m',
};
const ok    = (m) => console.log(`${c.green}✓${c.reset} ${m}`);
const warn  = (m) => console.log(`${c.yellow}⚠${c.reset} ${m}`);
const info  = (m) => console.log(`${c.cyan}ℹ${c.reset} ${m}`);
const err   = (m) => console.log(`${c.red}✗${c.reset} ${m}`);
const dim   = (m) => `${c.gray}${m}${c.reset}`;
const bold  = (m) => `${c.bold}${m}${c.reset}`;

/* ── paths ── */
const ROOT       = path.resolve(__dirname, '..', '..', '..');
const SOURCE_DIR = path.join(ROOT, '_wm', 'core', 'skills');
const SHARED_DIR = path.join(ROOT, '_wm', 'core', 'shared');
const MAP_FILE   = path.join(ROOT, '_wm', '_config', 'platform-map.json');

/* ── args ── */
function parseArgs() {
  const flags = {};
  for (const arg of process.argv.slice(2)) {
    const m = arg.match(/^--([^=]+)(?:=(.+))?$/);
    if (m) flags[m[1]] = m[2] ?? true;
  }
  return flags;
}

/* ── helpers ── */
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function removeDir(target) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

function listSkills() {
  if (!fs.existsSync(SOURCE_DIR)) return [];
  return fs.readdirSync(SOURCE_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name);
}

function detectPlatform(platform, def) {
  if (!def.detect || def.detect.includes('always')) return false;
  return def.detect.some(p => fs.existsSync(path.join(ROOT, p)));
}

/* ── geradores por formato ── */

function syncSkillDir(platformKey, def, skills) {
  const target = path.join(ROOT, def.target);
  removeDir(target);
  for (const skill of skills) {
    const src  = path.join(SOURCE_DIR, skill);
    const dest = path.join(target, skill);
    copyDir(src, dest);
  }
  /* copiar shared/ junto */
  const sharedTarget = path.join(ROOT, def.target, '_shared');
  if (fs.existsSync(SHARED_DIR)) copyDir(SHARED_DIR, sharedTarget);
  ok(`${def.name} ${dim(`→ ${def.target}/ (${skills.length} skills)`)}`);
}

function syncAgentPointer(platformKey, def, skills) {
  const target = path.join(ROOT, def.target);
  removeDir(target);
  fs.mkdirSync(target, { recursive: true });

  for (const skill of skills) {
    const skillFile = path.join(SOURCE_DIR, skill, 'SKILL.md');
    if (!fs.existsSync(skillFile)) continue;
    const content = fs.readFileSync(skillFile, 'utf8');
    /* extrai frontmatter */
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const fm = fmMatch ? fmMatch[1] : `name: ${skill}\ndescription: Website Method skill`;
    const pointer = `---\n${fm}\n---\n\n# ${skill}\n\nFull skill: \`_wm/core/skills/${skill}/SKILL.md\`\n\nRead that file to load the complete skill.\n`;
    fs.writeFileSync(path.join(target, `${skill}.agent.md`), pointer);
  }
  ok(`${def.name} ${dim(`→ ${def.target}/ (${skills.length} pointers)`)}`);
}

function syncSingleFile(platformKey, def, skills) {
  const target = path.join(ROOT, def.target);
  let out = `# AGENTS.md — Website Method\n\n`;
  out += `> Instruções universais para agentes de IA. Compatível com qualquer IA/IDE que lê AGENTS.md.\n\n`;
  out += `## Como usar\n\n`;
  out += `1. Leia \`_wm/core/skills/wm-master/SKILL.md\` para carregar o Vinx (maestro/menu principal)\n`;
  out += `2. Antes de qualquer diálogo, verifique a pasta \`briefing/\` (lógica em \`_wm/core/shared/briefing-check.md\`)\n`;
  out += `3. Roteie para o skill especialista correto baseado no pedido do usuário\n\n`;
  out += `## O time (catálogo de skills)\n\n`;
  for (const skill of skills) {
    const skillFile = path.join(SOURCE_DIR, skill, 'SKILL.md');
    if (!fs.existsSync(skillFile)) continue;
    const content = fs.readFileSync(skillFile, 'utf8');
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) continue;
    const nameM = fmMatch[1].match(/name:\s*(.+)/);
    const descM = fmMatch[1].match(/description:\s*(.+)/);
    out += `- **${nameM?.[1] || skill}** — ${descM?.[1] || ''}\n`;
    out += `  Arquivo: \`_wm/core/skills/${skill}/SKILL.md\`\n\n`;
  }
  out += `## Blocos compartilhados\n\n`;
  out += `- \`_wm/core/shared/briefing-check.md\` — lógica de detecção da pasta \`briefing/\`\n`;
  out += `- \`_wm/core/shared/asset-folders.md\` — instruções de pastas de assets do cliente\n\n`;
  out += `## Convenções do projeto\n\n`;
  out += `- Idioma: Português (Brasil)\n`;
  out += `- Pasta de briefing: \`briefing/\`\n`;
  out += `- Assets do cliente: \`assets-cliente/\`\n`;
  out += `- Identidade humana: cada skill tem um nome de pessoa (Vinx, Dante, Bento, Luna, Leal, Kael, Noah, Zion, Sara, Vick, Max, Lara). Nunca use códigos internos (AG-XX, WM-00) ao falar com o usuário.\n`;
  fs.writeFileSync(target, out);
  ok(`${def.name} ${dim(`→ ${def.target} (catálogo de ${skills.length} skills)`)}`);
}

/* ── manifest CSV (camada 1 — catálogo leve) ── */
function generateManifest(skills) {
  let csv = 'name,description,file\n';
  for (const skill of skills) {
    const skillFile = path.join(SOURCE_DIR, skill, 'SKILL.md');
    if (!fs.existsSync(skillFile)) continue;
    const content = fs.readFileSync(skillFile, 'utf8');
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) continue;
    const nameM = fmMatch[1].match(/name:\s*(.+)/);
    const descM = fmMatch[1].match(/description:\s*(.+)/);
    const name  = (nameM?.[1] || skill).trim();
    const desc  = (descM?.[1] || '').trim().replace(/"/g, '""');
    csv += `${name},"${desc}",_wm/core/skills/${skill}/SKILL.md\n`;
  }
  const out = path.join(ROOT, '_wm', '_config', 'manifest.csv');
  fs.writeFileSync(out, csv);
  ok(`Manifest CSV ${dim(`→ _wm/_config/manifest.csv (${skills.length} entries)`)}`);
}

/* ── main ── */
function main() {
  const flags = parseArgs();

  console.log('');
  console.log(`${bold('Website Method — Sync')} ${c.gray}(BMad-style)${c.reset}`);
  console.log(c.gray + '─'.repeat(50) + c.reset);

  if (!fs.existsSync(MAP_FILE)) {
    err(`platform-map.json não encontrado em _wm/_config/`);
    process.exit(1);
  }
  if (!fs.existsSync(SOURCE_DIR)) {
    err(`Pasta de skills não encontrada: _wm/core/skills/`);
    process.exit(1);
  }

  const map    = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'));
  const skills = listSkills();

  if (skills.length === 0) {
    warn(`Nenhum skill em _wm/core/skills/ ainda.`);
    console.log(c.gray + 'Crie _wm/core/skills/<nome>/SKILL.md primeiro.' + c.reset);
    return;
  }

  info(`Encontrados ${bold(skills.length)} skills em _wm/core/skills/`);
  console.log('');

  /* gerar manifest */
  generateManifest(skills);
  console.log('');

  /* determinar plataformas-alvo */
  const all  = flags.all;
  const only = flags.only ? String(flags.only).split(',').map(s => s.trim()) : null;

  for (const [key, def] of Object.entries(map.platforms)) {
    if (only && !only.includes(key)) continue;

    const isUniversal = def.detect?.includes('always');
    const detected    = isUniversal || detectPlatform(key, def);

    if (!all && !only && !detected) {
      console.log(`  ${c.gray}- ${def.name} (não detectado, pulando)${c.reset}`);
      continue;
    }

    try {
      if (def.format === 'skill-dir')        syncSkillDir(key, def, skills);
      else if (def.format === 'agent-pointer') syncAgentPointer(key, def, skills);
      else if (def.format === 'single-file')   syncSingleFile(key, def, skills);
      else warn(`Formato desconhecido para ${key}: ${def.format}`);
    } catch (e) {
      err(`Falha ao sincronizar ${def.name}: ${e.message}`);
    }
  }

  console.log('');
  console.log(c.gray + '─'.repeat(50) + c.reset);
  ok(bold('Sincronização concluída.'));
  console.log('');
  console.log(`${dim('Próximos passos:')}`);
  console.log(`  • Use ${bold('/wm-master')} (Claude Code) ou`);
  console.log(`  • Mencione "Website Method" para qualquer IA ler AGENTS.md`);
  console.log('');
}

main();
