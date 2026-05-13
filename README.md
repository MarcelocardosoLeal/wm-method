# Website Method (wm-method) v2

> Sistema BMad-style de criação de sites profissionais com IA.
> **21 agentes especialistas**, **8 IDEs suportadas**, **zero dependências**.

[![npm version](https://img.shields.io/npm/v/wm-method.svg)](https://www.npmjs.com/package/wm-method)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org)

---

## ⚡ Início rápido (3 passos)

### 1. Instale

```bash
# Em uma pasta nova do seu projeto
npx wm-method install
```

> Não precisa instalar globalmente. O `npx` baixa, executa e descarta.

### 2. Coloque seu briefing (opcional)

Se já tem um briefing pronto, salve em `briefing/`:

```
seu-projeto/
├── briefing/
│   └── meu-briefing.md     ← qualquer .md, .txt, .pdf ou .docx
```

### 3. Acione um agente na sua IDE

| Sua IDE | Como acionar |
|---|---|
| **Claude Code** | digite `/wm-master` |
| **Cursor** | digite `@wm-master` |
| **Windsurf** | digite `@wm-master` |
| **Antigravity** | digite `/wm-master` (Claude) ou "use wm-master" (Gemini) |
| **VS Code + Copilot** | digite `@wm-master` |
| **OpenCode / Trae** | digite `/wm-master` |
| **Qualquer outra IA** | "Use o Website Method para criar um site" |

O **WM-00 Master** vai detectar seu briefing automaticamente, mostrar o menu, e te guiar.

---

## 📦 O que o instalador faz

Quando você roda `npx wm-method install`, ele cria:

```
seu-projeto/
├── _wm/                  ← núcleo do sistema (não mexer)
│   ├── core/
│   │   ├── skills/       ← 21 agentes especialistas
│   │   ├── shared/       ← blocos compartilhados
│   │   └── lib/sync.js   ← script de distribuição
│   └── _config/
│       └── platform-map.json
├── briefing/             ← coloque briefings aqui (.md, .txt, .pdf)
│   └── README.md
├── assets-cliente/       ← fotos, textos, docs do cliente
│   ├── fotos/
│   ├── textos/
│   └── docs/
└── AGENTS.md             ← instruções universais (qualquer IA lê)
```

E **distribui automaticamente** os 21 agentes para as IDEs que detectar:

| IDE detectada | Pasta gerada |
|---|---|
| Claude Code | `.claude/skills/` |
| Cursor | `.agents/skills/` |
| Windsurf | `.windsurf/skills/` |
| Antigravity | `.antigravity/skills/` |
| VS Code + Copilot | `.github/agents/` |
| OpenCode | `.opencode/skills/` |
| Trae | `.trae/skills/` |

Se você adicionar uma IDE nova depois, rode:

```bash
npx wm-method install
# ou se já tem instalado:
node _wm/core/lib/sync.js --all
```

---

## 🤖 Os 21 agentes

### 🎯 Iniciar projeto
| Agente | O que faz |
|---|---|
| `wm-master` | Menu principal (orquestrador) |
| `wm-strategy` | **Dante** — briefing e estratégia |
| `wm-quick-site` | Site completo em 1 sessão |
| `wm-landing-page` | Landing Page de conversão |
| `wm-new-page` | Adicionar página a site existente |

### 🛠️ Pipeline de criação
| Agente | O que faz |
|---|---|
| `wm-content` | **Bento** — conteúdo e copywriting |
| `wm-design` | **Luna** — paleta, tipografia, design system |
| `wm-seo` | **Leal** — SEO on-page, Schema.org, meta tags |
| `wm-seo-content` | **Leal Content** — conteúdo semântico |
| `wm-seo-local` | **Leal Local** — Google Business, geo-targeting |
| `wm-frontend` | **Kael** — HTML/CSS/JS puro, sem frameworks |
| `wm-performance` | **Noah** — Core Web Vitals, WebP, lazy loading |
| `wm-ai-ready` | **Zion** — WebMCP, llms.txt, AI-friendly |
| `wm-compliance` | **Sara** — LGPD, política de privacidade |
| `wm-qa` | **Vick** — 30 testes de qualidade |
| `wm-launch` | **Max** — deploy e pós-lançamento |

### 🧰 Utilitários
| Agente | O que faz |
|---|---|
| `wm-schema-builder` | Gerar Schema.org JSON-LD |
| `wm-report` | Relatório técnico HTML pro cliente |
| `wm-portfolio-pdf` | PDF institucional |
| `wm-checklist` | Validar 150+ itens de produção |
| `wm-progress` | Status do projeto |

---

## 🎬 Fluxo típico de uso

```
1. npx wm-method install
   ✓ _wm/, briefing/, assets-cliente/, AGENTS.md criados
   ✓ Skills distribuídos pra IDE que você usa

2. Coloca briefing.md em briefing/ (opcional)

3. Abre o projeto na sua IDE preferida

4. Aciona: /wm-master

5. WM-00 lê o briefing, mostra o menu

6. Você escolhe (ex: 3 - Landing Page)

7. Sara LP recebe o controle + briefing
   ✓ Pula perguntas que já estão no briefing
   ✓ Pergunta só os gaps

8. Coloca fotos em assets-cliente/fotos/

9. Sara constrói a LP completa (HTML/CSS/JS)

10. Aciona /wm-qa pra Vick validar 30 testes

11. Aciona /wm-launch quando estiver tudo OK
```

---

## 🔧 Comandos disponíveis

Depois de instalado, você pode usar:

```bash
# Resincronizar skills (após editar ou adicionar IDE)
npx wm-method install
# ou
node _wm/core/lib/sync.js

# Forçar distribuição pra TODAS as IDEs (não só as detectadas)
node _wm/core/lib/sync.js --all

# Distribuir só pra IDEs específicas
node _wm/core/lib/sync.js --only=claude-code,cursor

# Via npm scripts (se rodar dentro de um projeto wm-method)
npm run sync       # detectadas
npm run sync:all   # todas
```

---

## 💡 FAQ

**P: Preciso ter conta no npm?**
R: Não. `npx wm-method install` baixa o pacote público e roda. Não exige login.

**P: Funciona offline?**
R: Depois do primeiro `npx` (que baixa), sim. Tudo é Node.js puro, sem dependências.

**P: Posso usar múltiplas IDEs no mesmo projeto?**
R: Sim! O instalador detecta todas e distribui os skills pra cada uma. Você pode alternar entre Claude Code e Cursor no mesmo projeto sem reinstalar.

**P: Tenho que aprender BMad pra usar isso?**
R: Não. BMad é só o **padrão de arquitetura** usado internamente. Você só usa os comandos `/wm-master`, `/wm-strategy` etc.

**P: Funciona com ChatGPT, Gemini ou outras IAs sem skills nativos?**
R: Sim. O instalador cria um `AGENTS.md` na raiz que qualquer IA consegue ler. Basta dizer "Use o Website Method para criar um site" e a IA segue as instruções do arquivo.

**P: Posso customizar os agentes?**
R: Sim. Edite os arquivos em `_wm/core/skills/<agente>/SKILL.md` e rode `node _wm/core/lib/sync.js --all` pra distribuir as mudanças.

**P: O briefing precisa estar em formato específico?**
R: Não. Qualquer texto livre em `.md`, `.txt`, `.pdf` ou `.docx` funciona. Os agentes extraem as informações relevantes.

---

## 🏗️ Arquitetura (para devs)

### Princípios

- **Fonte única de verdade** — você edita só em `_wm/core/skills/`, o sync distribui
- **Zero dependências** — Node.js puro, sem `npm install` adicional
- **Multi-IDE nativo** — qualquer IDE que leia SKILL.md funciona
- **Token-efficient** — formato BMad com lazy-loading de recursos pesados

### Como o sync funciona

```javascript
// _wm/_config/platform-map.json define onde cada IDE espera os skills
{
  "claude-code":  ".claude/skills/",
  "cursor":       ".agents/skills/",
  "windsurf":     ".windsurf/skills/",
  ...
}

// _wm/core/lib/sync.js:
// 1. Lê _wm/core/skills/ (fonte)
// 2. Detecta IDEs presentes no projeto
// 3. Copia skills para cada pasta-alvo
// 4. Gera AGENTS.md universal
// 5. Gera _wm/_config/manifest.csv (catálogo leve)
```

### Como adicionar um novo agente

```bash
mkdir _wm/core/skills/wm-meu-novo-agente
cat > _wm/core/skills/wm-meu-novo-agente/SKILL.md <<EOF
---
name: wm-meu-novo-agente
description: O que ele faz...
---

Você é o ...

## Activation
1. Faça X
2. Faça Y
EOF

node _wm/core/lib/sync.js --all
# Pronto — disponível em todas as IDEs
```

---

## 📋 Requisitos

- **Node.js** >= 18.0.0
- **IDE ou IA**: Claude Code, Cursor, Windsurf, Antigravity, VS Code + Copilot, OpenCode, Trae, ou qualquer outra que leia arquivos Markdown

---

## 📜 Licença

MIT © [Marcelo Leal](https://github.com/marcelocardosoleal)

---

## 🔗 Links

- [npm package](https://www.npmjs.com/package/wm-method)
- [GitHub](https://github.com/marcelocardosoleal/wm-method)
- [Issues / Bugs](https://github.com/marcelocardosoleal/wm-method/issues)

---

## 🙏 Inspiração

Este projeto se inspira no [BMad Method](https://github.com/bmad-code-org/BMAD-METHOD) — padrão de skills multi-IDE com source-of-truth única. Otimizado para criação de sites profissionais em português brasileiro.
