# Hugo Barros — Portefólio

Portefólio de Hugo Barros, Técnico Superior de Inovação e Desenvolvimento Turístico no Município de Braga.
Next.js 13 (App Router) · Tailwind CSS · páginas geradas de forma estática.

```bash
npm install
npm run dev
```

## Páginas

| Endereço | Conteúdo |
| --- | --- |
| `/` | Apresentação, indicadores, 3 projetos em destaque, áreas de atuação, mapa das missões, contacto |
| `/projetos` | Todos os projetos, com filtro por área (`?area=europeu`) e pesquisa |
| `/projetos/<id>` | Estudo de caso: contexto, eixos, registo fotográfico, síntese e documentos |
| `/percurso` | Mapa das missões internacionais e cronologia por ano |
| `/contacto` | Email, LinkedIn e entidade |

Os links antigos `/#projeto/<id>` são redirecionados para `/projetos/<id>`.

## Identidade

Creme claro (`#F4F1EA`), tinta (`#1A1D21`) e azul-petróleo (`#0E5A6B`).
Títulos em Newsreader, texto em Schibsted Grotesk. Scroll normal em todas as páginas;
tudo respeita "reduzir movimento".

## Elementos de assinatura

| Componente | O que faz |
| --- | --- |
| `app/ui/fx/ContourField.tsx` | Curvas de nível generativas (ruído de Perlin + marching squares) em canvas, em movimento lento |
| `app/ui/fx/Globe.tsx` | Globo em Canvas 2D: continentes em pontos (`landDots.ts`), arcos de grande círculo de Braga às missões, arrastável |
| `app/ui/fx/Motion.tsx` | Palavras que se sucedem, faixas contínuas e arquivo visual de fotografias |
| `app/ui/viz/Gantt.tsx` | Cronologia 2024–2026 em Gantt, por área, com linha "hoje" |
| `app/ui/viz/AreaBar.tsx` | Distribuição dos projetos pelas quatro áreas |
| `app/ui/CommandK.tsx` | Pesquisa rápida (⌘K / Ctrl+K) por projetos e páginas |
| `.duo` (globals.css) | Duotone petróleo/creme em todas as fotografias; ganham cor ao passar o rato |
| `app/template.tsx` | Transição suave entre páginas (framer-motion) |

## Onde editar

| Ficheiro | Conteúdo |
| --- | --- |
| `app/ui/projects.ts` | Projetos, áreas e missões (título, ano, local, resumo, imagem, coordenadas) |
| `app/ui/dossiers.tsx` | Texto completo de cada projeto, em PT e EN |
| `app/page.tsx` | Página inicial (incluindo os projetos em destaque) |
| `app/globals.css` · `tailwind.config.ts` | Cores, tipografia e efeitos |
