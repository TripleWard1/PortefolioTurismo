# Hugo Barros — Portefólio Profissional

Portefólio de Hugo Barros, Técnico Superior de Inovação e Desenvolvimento Turístico no Município de Braga.
Next.js 13 (App Router) · Tailwind CSS.

```bash
npm install
npm run dev
```

## Identidade

Registo institucional e editorial: papel quente, azul-marinho profundo e filete dourado.
Títulos em Fraunces, texto em Inter. Tokens em `app/globals.css` e `tailwind.config.ts`.

Efeitos (todos sóbrios e desativados com "reduzir movimento"):
abertura com o nome e filete dourado (uma vez por sessão), zoom lento da fotografia do hero,
contagem dos indicadores, conteúdo a surgir ao descer, scroll horizontal nas candidaturas
europeias (desktop) e zoom lento das imagens ao passar.

## Estrutura da página

1. **Hero** — apresentação, retrato e indicadores
2. **Perfil** — citação, biografia e ficha profissional
3. **01 · Candidaturas europeias** — galeria horizontal (carrossel com setas em mobile)
4. **02 · Promoção internacional** — feiras e lista de presença internacional
5. **03 · Inovação digital**
6. **04 · Produto turístico e património** — linhas alternadas
7. **05 · Índice** — todos os projetos, com filtro por área
8. **Contacto** e rodapé

Cada projeto abre um **dossier** (capa, enquadramento, eixos, registo fotográfico, ficha e documentos),
com link partilhável `/#projeto/<id>` e navegação por teclado (`←` `→`, `Esc`).

## Onde editar

| Ficheiro | Conteúdo |
| --- | --- |
| `app/ui/projects.ts` | Projetos, áreas e missões (título, ano, local, resumo, imagem) |
| `app/ui/dossiers.tsx` | Texto completo de cada dossier, em PT e EN |
| `app/ui/Hero.tsx` · `About.tsx` | Apresentação, indicadores e perfil |
| `app/ui/Chapters.tsx` | Capítulos e índice |
| `app/ui/Contact.tsx` | Contactos e rodapé |
