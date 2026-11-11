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
| `/` | Apresentação, perfil, áreas de competência, projetos em destaque, metodologia, distinções e redes, representação internacional, contacto |
| `/projetos` | Todos os projetos em grelha ou lista, com filtro por área (`?area=europeu`) e pesquisa |
| `/projetos/<id>` | Estudo de caso: abertura com ficha, história em três tempos (desafio, resposta, impacto), síntese e citação, enquadramento, eixos, registo fotográfico, documentação e projeto seguinte. Barra de progresso e navegação por capítulos |
| `/percurso` | Função atual, missões internacionais, distinções e projetos por ano de início |
| `/contacto` | Pedido de contacto por assunto (abre o cliente de email), email, LinkedIn e entidade |

Os links antigos `/#projeto/<id>` são redirecionados para `/projetos/<id>`.

## Identidade

Base neutra (branco, `soft`, `line`, `mute`, `ink`) com quatro tons por área, definidos em
`app/ui/viz/palette.ts`: ardósia (candidaturas europeias), terracota (promoção internacional),
musgo (inovação digital) e bronze (produto turístico). Cada tom tem quatro variantes: `tint`
(painéis claros), `deep` (rótulos), `dark` (secções imersivas a toda a largura) e `glow`
(acentos sobre fundo escuro). `NIGHT` e `BRASS` servem a secção de distinções.
Tipografia: Inter para o texto e Instrument Serif em itálico para acentos (classe `.em`).

Movimento:
- Ecrã de entrada (`Intro.tsx`), uma vez por sessão: o anel do monograma desenha-se, o nome aparece
  letra a letra e o ecrã abre-se ao meio. Pode ser saltado (Esc).
- Abertura com uma grelha inclinada de fotografias (`HeroSlides`, adaptado de Tilted Grid Hero) e títulos que entram palavra a palavra (`Split`).
- Projetos em destaque numa calha com profundidade (`ProjectRail`, adaptado de Focus Rail).
- Distinções em lista que abre a fotografia ao passar o rato (adaptado de Cinematic List).
- Redes e parceiros em faixa contínua; missões em painéis que se expandem e, no percurso, numa linha de
  metro que se preenche com o scroll (`MetroLine`).
- Rodapé com o nome em grande revelado letra a letra (adaptado de Wordmark Reveal Footer).
- Parallax discreto (`[data-parallax]`) e grão de filme nas secções escuras.
- Cabeçalho flutuante em vidro (adaptado de Liquid Glass Navbar) com monograma, indicador deslizante,
  e que se esconde ao descer e volta ao subir. Menu móvel em ecrã inteiro.

Motion graphics vivos (nível 3 do método Living Site, desenhados em código):
- `LivingMethod.tsx`: a metodologia como diagrama vivo. Cada volta é um projeto real que passa por
  território, estratégia, candidatura e resultado, e termina no resultado verdadeiro. Começa vazio,
  entra a 30% visível, repete sem parar, pausa fora do ecrã e mostra a imagem final com movimento reduzido.
- `WordLight` (em `parts.tsx`): a frase do perfil acende palavra a palavra enquanto atravessa o ecrã.

Nenhum efeito altera o scroll da página. Tudo respeita `prefers-reduced-motion`.
O cabeçalho fica transparente sobre as aberturas escuras marcadas com `[data-hero]`.

## Onde editar

| Ficheiro | Conteúdo |
| --- | --- |
| `app/ui/projects.ts` | Projetos, áreas e missões (título, ano, local, resumo, função, resultado, imagem, coordenadas) |
| `app/ui/profile.ts` | Função, competências por área, metodologia, distinções e redes |
| `app/ui/narrative.ts` | Narrativa de cada projeto: o desafio, a resposta e o impacto |
| `app/ui/dossiers.tsx` | Texto completo de cada projeto, em PT e EN |
| `app/page.tsx` | Página inicial (incluindo os projetos em destaque) |
| `app/ui/viz/palette.ts` | Tons de cada área |
| `app/globals.css` · `tailwind.config.ts` | Cores, escala tipográfica e movimento |
