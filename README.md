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
Títulos em Newsreader, texto em Schibsted Grotesk. Efeitos discretos: abertura curta (uma vez
por visita), entradas suaves, zoom nas fotografias, números a contar e mapa animado.
Tudo respeita "reduzir movimento". Scroll normal em todas as páginas.

## Onde editar

| Ficheiro | Conteúdo |
| --- | --- |
| `app/ui/projects.ts` | Projetos, áreas e missões (título, ano, local, resumo, imagem, coordenadas) |
| `app/ui/dossiers.tsx` | Texto completo de cada projeto, em PT e EN |
| `app/page.tsx` | Página inicial (incluindo os projetos em destaque) |
| `app/globals.css` · `tailwind.config.ts` | Cores, tipografia e efeitos |
