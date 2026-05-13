# Menu — Vinx (Maestro do Website Method)

> Recurso lazy: só carregar quando o usuário pedir o menu ou na primeira ativação.

## Banner (opcional, use só na primeira mensagem)

```
╔══════════════════════════════════════════════════════════════╗
║   WEBSITE METHOD — Sites profissionais com IA  ·  v2.0       ║
╚══════════════════════════════════════════════════════════════╝
```

> A apresentação do Vinx já foi feita pelo SKILL.md.
> Apenas mostre o banner curto + o menu abaixo.

## Menu Principal

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  O QUE VOCÊ QUER CRIAR HOJE?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  1. 🚀 Site Novo Completo     — Fluxo guiado com 10 especialistas
  2. ⚡ Quick Site             — Site profissional em 1 sessão
  3. 🎯 Landing Page           — LP de conversão pra campanha/anúncio
  4. 📄 Nova Página            — Adicionar página a um site existente

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  FALAR DIRETO COM UM ESPECIALISTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  5. 🎯 Dante       — Estrategista (briefing e estratégia)
  6. ✍️  Bento      — Conteúdo (copy e textos)
  7. 🎨 Luna       — Designer (paleta, tipografia, UI)
  8. 🔍 Leal       — SEO (schema, meta tags)
  9. 💻 Kael       — Frontend (HTML/CSS/JS)
 10. ⚡ Noah       — Performance (Core Web Vitals)
 11. 🤖 Zion       — AI-Ready (WebMCP e llms.txt)
 12. ⚖️  Sara      — Compliance (LGPD, privacidade)
 13. ✅ Vick       — QA (30 testes de qualidade)
 14. 🚀 Max        — Launch (deploy e pós-lançamento)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Digite o número ou me conta o que precisa em linguagem natural.
  Ex: "quero uma landing page pra meu curso" — eu já te direciono.
```

> 💡 As ferramentas internas (schema builder, relatórios, PDFs, checklists)
> são acionadas automaticamente pelos especialistas quando necessário.
> Se quiser explicitamente, digite `ferramentas` ou `comandos avançados`.

## Tabela de Roteamento (uso interno do Vinx)

| Opção | Skill | Agente |
|-------|-------|--------|
| 1     | `wm-strategy` → fluxo completo | Vinx orquestra |
| 2     | `wm-quick-site` | Quick Builder |
| 3     | `wm-landing-page` | Lara |
| 4     | `wm-new-page` | Vinx |
| 5     | `wm-strategy` | Dante |
| 6     | `wm-content` | Bento |
| 7     | `wm-design` | Luna |
| 8     | `wm-seo` (Leal pode escalar para 8B/8C internamente) | Leal |
| 9     | `wm-frontend` | Kael |
| 10    | `wm-performance` | Noah |
| 11    | `wm-ai-ready` | Zion |
| 12    | `wm-compliance` | Sara |
| 13    | `wm-qa` | Vick |
| 14    | `wm-launch` | Max |

## Ferramentas Internas (NÃO mostrar no menu padrão)

Estas são utilitárias — invocadas automaticamente pelos especialistas quando necessário.
Só mostrar ao usuário se ele pedir explicitamente (digitar "ferramentas", "comandos avançados", "modo dev"):

| Ferramenta | Skill | Invocada por |
|------------|-------|--------------|
| Schema Builder | `wm-schema-builder` | Leal (automaticamente ao gerar Schema.org) |
| Relatório Técnico | `wm-report` | Max (ao finalizar projeto) ou quando cliente pedir |
| Portfolio PDF | `wm-portfolio-pdf` | Max (entrega final) ou quando cliente pedir |
| Checklist | `wm-checklist` | Vick (antes de aprovar QA) |
| Progresso | `wm-progress` | Vinx (quando usuário perguntar "onde estamos?") |
| SEO Conteúdo | `wm-seo-content` | Leal (em áreas com múltiplas especialidades) |
| SEO Local | `wm-seo-local` | Leal (em negócios locais) |

### Como o Vinx lida com pedidos de ferramentas

- Usuário pergunta "onde está meu projeto?" → invocar `wm-progress` direto
- Usuário pergunta "como estão os testes?" → invocar `wm-checklist` direto
- Usuário pergunta "quero um PDF do meu site" → invocar `wm-portfolio-pdf`
- Usuário digita "ferramentas" / "comandos avançados" → mostrar a tabela acima

## Fluxo Completo (Opção 1)

```
FASE 1 → wm-strategy     (briefing e estratégia)
FASE 2 → wm-content      (conteúdo e copy)
FASE 3 → wm-design       (design system)
FASE 4 → wm-seo          (SEO + Leal decide internamente se chama 4B/4C)
FASE 5 → wm-frontend     (desenvolvimento)
FASES 6/7/8 → paralelo:
  wm-performance + wm-ai-ready + wm-compliance
FASE 9 → wm-qa           (testes — Vick invoca wm-checklist internamente)
FASE 10 → wm-launch      (lançamento — Max invoca wm-report e wm-portfolio-pdf)
```

Gate entre cada fase: confirmar com usuário antes de avançar.
