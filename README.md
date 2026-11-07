# Hugo Barros — Portefólio Estratégico

Portefólio de estratégia de destino e inovação turística (Município de Braga).
Next.js 13 (App Router) · Tailwind · sem bibliotecas de animação.

```bash
npm install
npm run dev
```

## Direção visual — "Granito & Brasa"

- **Paleta:** noite de granito (`--night`, `--granite`, `--slab`), osso (`--bone`, `--paper`) e um único sinal, brasa (`--ember`). Tokens em `app/globals.css`.
- **Tipografia:** Instrument Serif (display), Inter Tight (texto), JetBrains Mono (etiquetas e dados).
- **Movimento:** ligado ao scroll e escrito diretamente no DOM via `requestAnimationFrame` (sem re-renders). Respeita `prefers-reduced-motion`.

## Estrutura

| Ficheiro | Papel |
| --- | --- |
| `app/ui/projects.ts` | Fonte única: projetos, temas, missões (coordenadas reais) |
| `app/ui/dossiers.tsx` | Conteúdo editorial PT/EN de cada dossier |
| `app/ui/sections.ts` | Ordem dos capítulos (navbar, menu, palette) |
| `app/ui/hooks.ts` | Scroll lock partilhado, progresso de scroll, in-view, hora de Braga |
| `Preloader` · `Hero` · `Manifesto` | Abertura, hero com paralaxe, manifesto lido ao scroll, marquee e métricas |
| `Positioning` | Cap. 01 — galeria horizontal fixada (carrossel em mobile) |
| `Missions` | Cap. 02 — atlas SVG com arcos a partir de Braga e distâncias reais |
| `Digital` · `Heritage` | Cap. 03 e 04 — cartões com spotlight/tilt e janela fixa com troca de imagem |
| `ProjectIndex` | Índice filtrável com pré-visualização a seguir o cursor |
| `Dossier` | Leitor de dossier em ecrã inteiro, índice lateral, lightbox, “próximo” |
| `CommandPalette` | ⌘K / Ctrl+K — pesquisa tolerante a acentos |
| `Cursor` | Cursor personalizado (apenas ponteiros finos) |

## Atalhos

- `⌘K` / `Ctrl+K` — pesquisa
- `←` `→` — dossier anterior / seguinte; `Esc` — fechar
- Deep-link de dossier: `/#projeto/<id>` (ex.: `/#projeto/smart-tourism`)
