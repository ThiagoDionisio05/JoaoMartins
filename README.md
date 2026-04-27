# João Mantin — Landing Page

> Site profissional de um treinador e terapeuta muscular, desenvolvido com HTML, CSS e JavaScript puro, utilizando boas práticas de UX/UI design e animações modernas.

---

## Índice

- [Sobre o projeto](#sobre-o-projeto)
- [Tecnologias e bibliotecas](#tecnologias-e-bibliotecas)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Conceitos aplicados](#conceitos-aplicados)
  - [HTML Semântico](#html-semântico)
  - [CSS Moderno](#css-moderno)
  - [JavaScript](#javascript)
  - [UX/UI Design](#uxui-design)
  - [Responsividade](#responsividade)
  - [Animações](#animações)
- [Bibliotecas externas](#bibliotecas-externas)
- [Boas práticas utilizadas](#boas-práticas-utilizadas)
- [O que estudar a seguir](#o-que-estudar-a-seguir)

---

## Sobre o projeto

Landing page completa para o profissional João Mantin. O objetivo foi criar uma experiência visual de alto nível com foco em:

- Apresentação clara dos serviços
- Conversão (botões de contato, WhatsApp, planos)
- Animações que guiam o olhar do usuário
- Funcionar perfeitamente em qualquer dispositivo

---

## Tecnologias e bibliotecas

| Tecnologia | Para que serve |
|---|---|
| HTML5 | Estrutura e conteúdo da página |
| CSS3 | Estilização, layout e responsividade |
| JavaScript (ES6+) | Interatividade, animações e lógica |
| [GSAP](https://greensock.com/gsap/) | Animações de alta performance |
| [AOS](https://michalsnik.github.io/aos/) | Animações ativadas pelo scroll |
| [Google Fonts](https://fonts.google.com/) | Tipografia (Bebas Neue, Barlow) |

---

## Estrutura de pastas

```
JoaoMartins/
│
├── index.html          # Arquivo principal — toda a estrutura HTML
│
├── css/
│   └── style.css       # Todos os estilos da página
│
├── js/
│   └── main.js         # Toda a lógica JavaScript
│
└── assets/
    └── images/
        └── Joao.png    # Foto do profissional
```

> **Por que separar CSS e JS?**
> Manter cada linguagem em seu próprio arquivo torna o projeto mais organizado, fácil de manter e mais rápido de entender quando você voltar ao código depois de um tempo.

---

## Como rodar o projeto

Não precisa instalar nada. Basta:

1. Clonar ou baixar a pasta do projeto
2. Abrir o arquivo `index.html` diretamente no navegador

**Recomendação:** Use a extensão **Live Server** no VS Code para ver as mudanças em tempo real enquanto você edita o código.

---

## Conceitos aplicados

### HTML Semântico

O HTML semântico usa tags que descrevem o significado do conteúdo, não apenas a aparência:

```html
<!-- Ruim (não diz o que é) -->
<div class="topo">...</div>

<!-- Bom (descreve o conteúdo) -->
<nav>...</nav>
<section id="servicos">...</section>
<footer>...</footer>
```

Tags usadas neste projeto: `<nav>`, `<section>`, `<footer>`, `<button>`, `<ul>`, `<li>`, `<a>`.

---

### CSS Moderno

#### Variáveis CSS (Custom Properties)

Definidas no `:root`, permitem reutilizar valores em todo o arquivo:

```css
:root {
  --navy: #0a0f2e;
  --accent: #2563eb;
  --gold: #c9a227;
}

/* Uso */
.botao {
  background: var(--accent);
}
```

> Se você quiser mudar a cor principal do site, basta alterar `--accent` em um único lugar. Sem variáveis, você teria que procurar e substituir em centenas de linhas.

#### CSS Grid

Usado para criar o layout de duas colunas do hero e da seção de terapia:

```css
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* duas colunas iguais */
  gap: 4rem;
}
```

#### Flexbox

Usado para alinhar elementos em linha ou coluna:

```css
nav {
  display: flex;
  align-items: center;         /* centraliza verticalmente */
  justify-content: space-between; /* logo à esquerda, links à direita */
}
```

#### `clamp()` — Tipografia fluida

Faz o tamanho da fonte crescer e diminuir automaticamente conforme a tela, sem media queries:

```css
font-size: clamp(2.5rem, 4vw, 4rem);
/* mínimo: 2.5rem | preferido: 4% da largura da tela | máximo: 4rem */
```

#### `object-fit: cover`

Faz a imagem preencher o espaço sem distorcer, como um zoom centralizado:

```css
.hero-photo {
  width: 100%;
  height: 380px;
  object-fit: cover;
  object-position: 50% 30%; /* ponto de foco da imagem */
}
```

#### Pseudo-elementos `::before` e `::after`

Criam elementos visuais extras sem adicionar HTML:

```css
/* Barra colorida no lado da foto */
.hero-photo-wrap::before {
  content: '';
  position: absolute;
  left: 0;
  width: 3px;
  background: linear-gradient(to bottom, var(--accent), var(--gold));
}

/* Gradiente que dissolve a foto no card */
.hero-photo-wrap::after {
  content: '';
  position: absolute;
  bottom: 0;
  height: 200px;
  background: linear-gradient(to bottom, transparent, var(--navy-mid));
}
```

#### Glassmorphism

Efeito de vidro fosco, muito usado em design moderno:

```css
.hero-photo-badge {
  background: rgba(10, 15, 46, 0.75); /* fundo semitransparente */
  backdrop-filter: blur(12px);         /* desfoca o que está atrás */
  border: 1px solid rgba(37, 99, 235, 0.5);
}
```

---

### JavaScript

#### Seleção de elementos

```js
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
```

#### Event listeners

Escutam eventos (clique, scroll) e executam código:

```js
window.addEventListener('scroll', () => {
  // código que roda toda vez que o usuário rola a página
});

hamburger.addEventListener('click', () => {
  // código que roda ao clicar no menu hambúrguer
});
```

#### `classList` — manipular classes CSS via JS

```js
navbar.classList.add('scrolled');    // adiciona classe
navbar.classList.remove('scrolled'); // remove classe
navbar.classList.toggle('open');     // alterna (add/remove)
```

#### IntersectionObserver

Detecta quando um elemento entra na tela, sem precisar calcular scroll manualmente:

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // elemento está visível na tela
      animateCounter(entry.target);
    }
  });
});

observer.observe(document.querySelector('.stat-num'));
```

#### Animação de contador com easing

```js
function animateCounter(el) {
  const target = parseInt(el.dataset.target); // pega o valor do data-target="100"
  const suffix = el.dataset.suffix || '';     // pega o sufixo: "%", "+"
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / 1800, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // easing cúbico (desacelera no final)
    el.textContent = Math.round(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
```

---

### UX/UI Design

#### Hierarquia visual

O olhar do usuário segue uma ordem natural. No hero:
1. **H1** (maior, mais impactante) — o que você vai ganhar
2. **Subtítulo** — por que confiar
3. **Badges** — prova rápida de competência
4. **Botões** — ação clara

#### Contraste e paleta

- `--navy` (fundo escuro) + `--white` (texto claro) = legibilidade máxima
- `--accent` (azul) = ações e destaques
- `--gold` (dourado) = terapia muscular (premium, diferenciado)

#### Feedback visual em hover

Todo elemento interativo dá um retorno ao usuário:

```css
.service-card:hover {
  transform: translateY(-6px);      /* sobe levemente */
  border-color: rgba(37,99,235,0.6); /* borda mais visível */
}
```

#### Progress bar

A barra no topo da página mostra quanto falta para terminar de ler — reduz a ansiedade do usuário e aumenta o tempo na página.

#### Nav que encolhe no scroll

Ocupa menos espaço quando o usuário já passou pelo topo:

```js
navbar.classList.toggle('scrolled', window.scrollY > 60);
```

---

### Responsividade

Feita com **Mobile First** + **Media Queries**:

```css
/* Estilos base (desktop) */
.hero-grid {
  grid-template-columns: 1fr 1fr;
}

/* Mobile: tablet */
@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr; /* empilha em coluna única */
  }
  .hero {
    min-height: auto;   /* não força 100vh quando empilhado */
    overflow: visible;  /* não corta o conteúdo */
  }
}

/* Mobile: pequeno */
@media (max-width: 580px) {
  .hero-actions {
    flex-direction: column; /* botões um embaixo do outro */
  }
}
```

**Breakpoints usados:**

| Breakpoint | Dispositivo alvo |
|---|---|
| `1100px` | Tablets grandes / laptops pequenos |
| `900px` | Tablets / celulares grandes |
| `580px` | Celulares comuns |

---

### Animações

#### GSAP — entrada do hero

Cria uma sequência de animações encadeadas (`timeline`):

```js
const tl = gsap.timeline({ delay: 0.15 });

tl.to('#navbar',   { opacity: 1, y: 0, duration: 0.6 })
  .to('.hero-tag', { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
  // '-=0.2' significa: começa 0.2s antes do anterior terminar
  .to('.hero h1',  { opacity: 1, y: 0, duration: 0.7 }, '-=0.35');
```

> Os elementos começam invisíveis (`opacity: 0`) e sobem de baixo (`y: 40 → 0`), criando um efeito de entrada elegante.

#### AOS — animações no scroll

Basta adicionar `data-aos` ao elemento HTML:

```html
<div class="service-card" data-aos="fade-up" data-aos-delay="150">
  ...
</div>
```

Configuração global no JS:

```js
AOS.init({
  duration: 700,    // duração em ms
  easing: 'ease-out-cubic',
  once: true,       // anima só na primeira vez que aparece
  offset: 60,       // começa a animar 60px antes de entrar na tela
});
```

---

## Bibliotecas externas

Carregadas via **CDN** (sem instalar nada):

```html
<!-- No <head> -->
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

<!-- Antes do </body> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
```

> **CDN** (Content Delivery Network) é uma rede de servidores ao redor do mundo que entrega arquivos rapidamente. Em vez de baixar a biblioteca e colocar no projeto, você aponta para ela online.

---

## Boas práticas utilizadas

- **Separação de responsabilidades:** HTML = estrutura, CSS = aparência, JS = comportamento
- **Variáveis CSS:** cores e valores reutilizáveis em um único lugar
- **`passive: true` no scroll:** melhora a performance do scroll no mobile
- **`aria-label`:** acessibilidade para leitores de tela (ex: botão hambúrguer)
- **`data-*` attributes:** comunicam dados do HTML para o JavaScript sem poluir o código
- **`will-change` implícito via GSAP:** GSAP otimiza automaticamente as animações com GPU
- **`once: true` no AOS:** cada elemento anima apenas uma vez, evitando distração

---

## O que estudar a seguir

Depois de entender bem este projeto, os próximos passos naturais são:

1. **Git & GitHub** — versionar seu código e colaborar com outros
2. **Flexbox e Grid avançados** — [Flexbox Froggy](https://flexboxfroggy.com/) e [Grid Garden](https://cssgridgarden.com/)
3. **JavaScript assíncrono** — `fetch`, `async/await`, consumir APIs
4. **Frameworks CSS** — Tailwind CSS (utility-first) ou Bootstrap
5. **Framework JS** — React ou Vue.js para projetos maiores
6. **Performance web** — Lighthouse, lazy loading, otimização de imagens
7. **Acessibilidade (a11y)** — fazer sites usáveis por todos

---

## Desenvolvido por

**[dionisio.dev](https://dionisio.dev)**
