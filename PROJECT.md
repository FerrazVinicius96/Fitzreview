# PROJECT.md

## 1. Escopo

FitzReview é um catálogo pessoal de leituras. O usuário busca livros via
Google Books API, e registra resenhas (nota + comentário) que ficam
persistidas no PostgreSQL, associadas a um usuário local (sem autenticação
formal — identidade via `localStorage`, ver `useUsuarioLocal`).

O produto é uma página única de scroll (Hero → Busca → Resultados → Frase
final) mais uma página de ficha técnica por livro (`/livro/:id`), com um
sistema visual autoral (paleta obsidiana/bronze, tipografia Cormorant +
IBM Plex, motivo recorrente de "lâmpada incandescente" acesa/apagada por
scroll) amarrando as seções.

## 2. Requisitos Funcionais

- [RF001] Buscar livros por termo livre via Google Books API.
- [RF002] Exibir resultados da busca com capa, título, autor e descrição.
- [RF003] Abrir a ficha técnica de um livro (`/livro/:id`) com metadados
  completos.
- [RF004] Registrar avaliação (nota + comentário) para um livro, associada
  a um usuário identificado localmente (nome/e-mail, sem senha).
- [RF005] Listar avaliações existentes de um livro.
- [RF006] Excluir uma avaliação.
- [RF007] Página inicial única, em scroll contínuo, com seções: Hero →
  Busca → Resultados da busca → Frase de fechamento (CTA).
- [RF008] Identidade visual coesa entre todas as seções, com o motivo da
  lâmpada incandescente reagindo a gatilhos de scroll (Hero e rodapé) e
  reaparecendo em miniatura (ponto de luz) nas demais seções.

## 3. Fora de Escopo (cortes negociados)

- Seção "Filosofia de leitura" (resenhas fictícias em destaque, sticky
  50/50) — existia na landing antiga e foi removida no Ciclo 1 por não
  caber na nova estrutura de 4 seções pedida pelo usuário. Conteúdo
  (`featuredReviews.ts`, `ReviewCoverCard.tsx`) foi apagado, não arquivado.
- Autenticação real (senha/OAuth) — identidade de usuário permanece via
  `localStorage`, herdada do estado anterior do projeto.
- Fotografias reais nos slots de imagem (`imageSlots.ts`) — o visual
  depende de CSS/SVG autoral (grain, glow, lâmpada em SVG); os arquivos em
  `public/images/` continuam ausentes (`.gitkeep`) e são opcionais.

## 4. Composição do Time de Subagents

Aprovado pelo usuário. Arquivos em `.claude/agents/`.

| Nome | Escopo/Responsabilidade | Model | Justificativa (custo/complexidade) |
| ---- | ------------------------ | ----- | ----------------------------------- |
| `frontend-visual` | React/TS, Tailwind, GSAP/Framer Motion, coesão visual entre seções | Sonnet | Decisões de design/motion exigem julgamento, não é tarefa mecânica |
| `backend-pern` | Routes → Controllers → Services → Repositories, SQL puro, migrations, transações | Sonnet | Erro em lógica de negócio/integridade de dados é mais caro de corrigir que um ajuste visual |
| `qa-integration` | Roda typecheck/build, smoke test dos fluxos principais, reporta achados objetivamente | Haiku | Verificação sistemática contra checklist, não decisão criativa — mais barato sem perder qualidade |

O orquestrador (esta sessão principal) continua coordenando e reportando checkpoints ao PO; não há um subagent "gerente" separado.

## 5. Decisões de Arquitetura

| Decisão | Motivo | Alternativa descartada |
| ------- | ------ | ----------------------- |
| Stack PERN, SQL puro via queries parametrizadas, sem ORM | Padrão herdado do CLAUDE.md, obrigatório em todo projeto do time | Prisma/Sequelize — mais abstração e custo de aprendizado do que o escopo pede |
| Camadas Routes → Controllers → Services → Repositories | Padrão herdado do CLAUDE.md | Estrutura MVC simples sem separação de repository |
| Transações `BEGIN/COMMIT/ROLLBACK` em operações multi-tabela | Padrão herdado do CLAUDE.md | Confiar em autocommit por query |
| Página única de scroll (Hero/Busca/Resultados/Frase) substituindo landing (`/`) + catálogo (`/catalogo`) separados | Pedido do usuário no Ciclo 1: fluidez de navegação, uma só narrativa de scroll | Manter duas rotas com nav cruzada |
| Lâmpada incandescente como SVG + CSS custom property (`--lamp-lit`), animada via GSAP ScrollTrigger já existente no Hero/rodapé | Sem custo de asset novo (imagens ausentes), reaproveita a paleta bronze do design system, funciona com `prefers-reduced-motion` | Fotografia de lâmpada (`imageSlots.readingLamp`) ou Lottie/animação em vídeo |
| Navegação para a busca por âncora (`#busca` + `scroll-behavior: smooth`) em vez de rota própria | Mantém tudo na mesma página; cobre o caso de vir de `/livro/:id` | Lib de scroll-to-hash dedicada |

## 6. Histórico de Ciclos

### Ciclo 1 — status: entregue, aguardando validação visual do usuário

**Entregue neste ciclo:**

- Landing (`/`) e Catálogo (`/catalogo`) unificados em uma única página
  (`pages/HomePage.tsx`): Hero → Busca (`#busca`) → Resultados → Frase
  final. Rota `/catalogo` removida; links internos apontam para `/` ou
  `/#busca`.
- Seção "Filosofia de leitura" removida (ver seção 3).
- Motivo visual da lâmpada incandescente (`IncandescentBulb.tsx` +
  `LampDot.tsx`), acesa/apagada via CSS custom property `--lamp-lit`,
  animada nos scrubs GSAP já existentes do Hero e do rodapé.

**Como validar:**

- `npx tsc --noEmit` e `npm run build` (frontend) rodam limpos.
- `npm run dev` (frontend) e navegar por `/`, `#busca`, resultado de
  busca e `/livro/:id`; observar a lâmpada acender no scroll do Hero e no
  preenchimento da frase final do rodapé.
- Validação visual no navegador ainda não foi feita por mim (extensão
  Claude in Chrome indisponível na sessão) — pendente de confirmação do
  usuário.

**Decisões técnicas tomadas:** ver seção 5.

**Pendências / riscos conhecidos:**

- Este ciclo foi executado **fora do processo do CLAUDE.md**: sem
  `PROJECT.md` prévio, sem proposta de time de subagents, sem aprovação
  de arquitetura antes de codar. Identificado após o usuário questionar;
  este documento é o retrofit combinado com o usuário.
- `public/images/*.jpg` continuam ausentes (opcional).

**Próximo ciclo (proposto):** ajuste fino de timing da animação da
lâmpada após validação visual do usuário; nesse ponto, proposta de
composição do time de subagents (seção 4) para os próximos ciclos.

## 7. Pendências e Riscos Ativos

- Validação visual do Ciclo 1 pendente (sem acesso a navegador nesta
  sessão) — delegar ao `qa-integration` assim que a extensão estiver
  conectada.
- Trabalho do Ciclo 1 foi feito antes da aprovação do time; ciclos
  seguintes devem delegar a `frontend-visual` / `backend-pern` /
  `qa-integration` conforme o escopo, em vez de eu executar diretamente.
