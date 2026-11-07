# Hugo Barros — Portefólio

Portefólio de Hugo Barros, Técnico Superior de Inovação e Desenvolvimento Turístico no Município de Braga.
Next.js 13 (App Router) · Tailwind CSS.

```bash
npm install
npm run dev
```

## Conceito

O portefólio é uma **apresentação em 10 capítulos de ecrã inteiro**, com a mesma linguagem visual do
Observatório do Turismo de Braga (OBSERVA): preto quente, creme e um único vermelho, Instrument Sans,
números grandes e fotografia em movimento lento.

1. Início · 2. Perfil · 3. Em números · 4. Candidaturas europeias · 5. Missões internacionais (mapa)
· 6. Promoção internacional · 7. Inovação digital · 8. Produto e património · 9. Índice · 10. Contacto

- **Desktop (modo apresentação):** roda do rato, `↓` `↑`, espaço, `PageUp`/`PageDown`, `1`–`9` e `0`,
  `Home`/`End`, `F` para ecrã inteiro, gestos no tátil. O cursor esconde-se quando está parado.
  Cada capítulo tem endereço próprio (`/#missoes`, `/#indice`, …).
- **Mobile e ecrãs baixos:** os mesmos capítulos empilhados, com as mesmas entradas animadas.
- **Dossiers:** cada projeto abre um dossier (`/#projeto/<id>`), com `←` `→` e `Esc`.
- Abertura uma vez por sessão; tudo respeita "reduzir movimento".

## Onde editar

| Ficheiro | Conteúdo |
| --- | --- |
| `app/ui/projects.ts` | Projetos, áreas e missões (com coordenadas) |
| `app/ui/dossiers.tsx` | Texto completo de cada dossier, em PT e EN |
| `app/ui/slides.tsx` | Conteúdo e ordem dos capítulos |
| `app/ui/Deck.tsx` | Motor da apresentação (navegação, barra de progresso, abertura) |
| `app/ui/AtlasMap.tsx` | Mapa das missões |
| `app/globals.css` | Tokens e animações |
