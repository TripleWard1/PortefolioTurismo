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
| `/percurso` | Missões internacionais e projetos por ano de início |
| `/contacto` | Email, LinkedIn e entidade |

Os links antigos `/#projeto/<id>` são redirecionados para `/projetos/<id>`.

## Identidade

Base neutra (branco, `soft`, `line`, `mute`, `ink`) com um tom suave por área, definido em
`app/ui/viz/palette.ts`: névoa (candidaturas europeias), argila (promoção internacional),
salva (inovação digital) e areia (produto turístico). Cada tom tem uma versão clara para
fundos de painéis e uma versão escura para rótulos.
Tipografia: Inter para o texto e Instrument Serif em itálico para acentos (classe `.em`).
Um só tipo de movimento: entrada suave ao aparecer e zoom ligeiro nas fotografias.

## Onde editar

| Ficheiro | Conteúdo |
| --- | --- |
| `app/ui/projects.ts` | Projetos, áreas e missões (título, ano, local, resumo, imagem, coordenadas) |
| `app/ui/dossiers.tsx` | Texto completo de cada projeto, em PT e EN |
| `app/page.tsx` | Página inicial (incluindo os projetos em destaque) |
| `app/ui/viz/palette.ts` | Tons de cada área |
| `app/globals.css` · `tailwind.config.ts` | Cores, escala tipográfica e movimento |
