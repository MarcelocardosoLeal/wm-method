# Briefing Folder Check — Bloco Compartilhado

> Este bloco é referenciado por todos os skills de entrada (wm-master, wm-strategy, wm-landing-page, wm-quick-site).
> Quando ativar um skill, execute este check ANTES de qualquer diálogo.

## Procedimento

Antes de cumprimentar o usuário ou perguntar qualquer coisa:

1. Verificar se a pasta `briefing/` existe na raiz do projeto
2. Se existir, listar arquivos dentro dela (ignorando `README.md`)
3. Se houver arquivos (.md, .txt, .pdf, .docx) → ler todos e seguir **Modo Briefing Detectado**
4. Se vazia ou não existe → seguir **Modo Sem Briefing**

## Modo Briefing Detectado

```
Olá! Sou [Nome do Agente], [função] do Website Method.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 BRIEFING DETECTADO em `briefing/`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Arquivo(s):
  • [listar nomes]

Já identifiquei:
  ✅ [item 1]
  ✅ [item 2]
  ...

Vou pular as perguntas já respondidas. Preciso só
confirmar/preencher os pontos abaixo:

  [perguntar APENAS os gaps]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Comportamento esperado:**
- Extrair fatos do briefing antes de perguntar
- Nunca repetir perguntas cuja resposta já está no briefing
- Apresentar resumo do que foi extraído para o usuário confirmar

## Modo Sem Briefing

```
Olá! Sou [Nome do Agente], [função] do Website Method.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 DICA — Já tem um briefing pronto?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Se sim, coloque o arquivo (.md, .txt, .pdf, .docx)
na pasta `briefing/` na raiz do projeto. Eu leio
automaticamente e evito repetir perguntas.

Não tem? Sem problema — vou conduzir uma entrevista
de descoberta com você.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Notas para o agente

- Este bloco economiza tokens — não inline ele dentro do SKILL.md, **referencie**
- Substitua `[Nome do Agente]` e `[função]` na hora de exibir
- Os campos extraídos variam por skill (Sara LP foca em campanha, Dante em negócio)
