# Hugo Barros — Portefólio Profissional

Portefólio de Hugo Barros, Técnico Superior de Inovação e Desenvolvimento Turístico no Município de Braga.
Next.js 13 (App Router) · Tailwind CSS.

```bash
npm install
npm run dev
```

## Identidade

Registo institucional: fundo branco, azul-marinho (`--navy`), cinzas neutros e um acento discreto (`--accent`).
Títulos em Source Serif 4, texto em Public Sans. Tokens em `app/globals.css`. Sem animações decorativas.

## Estrutura da página

1. **Perfil** — apresentação, ficha profissional e indicadores
2. **Áreas de atuação** — quatro áreas; cada uma filtra a lista de projetos
3. **Projetos** — todos os projetos numa grelha, com filtro por área e pesquisa
4. **Missões internacionais** — tabela de feiras, cimeiras e júris
5. **Contacto** e rodapé

Cada projeto abre um **dossier** (enquadramento, eixos, registo fotográfico, ficha do projeto e documentos),
com link partilhável `/#projeto/<id>` e navegação por teclado (`←` `→`, `Esc`).

## Onde editar

| Ficheiro | Conteúdo |
| --- | --- |
| `app/ui/projects.ts` | Lista de projetos, áreas e missões (título, ano, local, resumo, imagem) |
| `app/ui/dossiers.tsx` | Texto completo de cada dossier, em PT e EN |
| `app/ui/Hero.tsx` | Apresentação, ficha profissional e indicadores |
| `app/ui/Contact.tsx` | Contactos e rodapé |
