# 🍸 Velvet Pour — MOJITO (Emotion Driven Design Showcase)

O **Velvet Pour** é uma landing page conceitual e imersiva desenvolvida para a marca de drinks premium "Mojito". O projeto foi construído do zero utilizando a filosofia de **Emotion Driven Design** (Design Guiado por Emoção), onde cada interação, transição e animação foi meticulosamente planejada para despertar o desejo do usuário e traduzir o frescor e a sofisticação da coquetelaria clássica.

---

## 🚀 Tecnologias e Stack Utilizada

* **Framework:** Next.js (React) — Utilizado pela robustez na renderização e otimização de performance.
* **Estilização:** Tailwind CSS — Garantiu uma interface moderna, clean, responsiva e com um visual focado no contraste elegante de cores.
* **Animações (O Core do Projeto):** GSAP (GreenSock Animation Platform) — Usado para criar uma experiência fluida através de interações de alto nível.
* **Linguagem:** JavaScript (ES6+)

---

## 🧠 Aprendizados Fundamentais Aplicados

Para que a interface respondesse às emoções do usuário sem comprometer a performance do navegador, foi necessário mergulhar a fundo nos conceitos mais avançados de manipulação de animação do GSAP:

### ⚡ Controle Avançado do Motor GSAP
* **`gsap.context()`**: Implementado para o ecossistema do Next.js. Garantiu que todas as animações fossem limpas da memória de forma segura (`revert()`) quando os componentes sofressem desmontagem (unmount), evitando o vazamento de memória (*memory leaks*).
* **`gsap.defaults()`**: Aplicado globalmente para unificar a identidade visual do site, economizando centenas de linhas de código ao definir tempos (`duration`) e suavizações (`ease`) padronizados.
* **`gsap.effects`**: Criação de animações reutilizáveis e parametrizadas (como o surgimento dos elementos da tela), chamadas facilmente por nomes personalizados, mantendo o código limpo e seguindo o princípio DRY (*Don't Repeat Yourself*).

### 🔄 Dinâmica e Sincronismo
* **`gsap.ticker`**: O "coração" por trás do acompanhamento de eventos complexos ou interações baseadas no movimento do mouse, onde o destino da animação é dinâmico/ambíguo.
* **`gsap.delayedCall()`**: Substituto de alta performance para o `setTimeout` nativo, garantindo sincronia perfeita com o motor de renderização da página.
* **`gsap.globalTimeline`**: Entendimento do controle mestre do tempo para gerenciar a velocidade e o fluxo das animações da aplicação.
* **`gsap.utils`**: Uso de ferramentas matemáticas como `clamp()` e `mapRange()` para calibrar e limitar o comportamento dos elementos visuais baseados na navegação do cliente.

---

## 🎨 O Conceito: Emotion Driven Design

A interface foi projetada para que o design não seja apenas funcional, mas **sentido**. 
* Elementos orgânicos (como as folhas flutuantes) trazem sensação de frescor.
* A tipografia imponente em serifas remete ao luxo e à tradição.
* A suavidade das transições simula a fluidez de um bom drink, segurando a atenção do usuário de ponta a ponta e transformando uma simples rolagem de tela em uma experiência sensorial.

---

## 📦 Como Executar o Projeto Localmente

1. Clone o repositório:
```bash
git clone [https://github.com/SEU-USUARIO/nome-do-repositorio.git](https://github.com/SEU-USUARIO/nome-do-repositorio.git)
