# 0.5.0 (2025-04-14)

### Features

* add changelog to home page ([8d07a3e](https://github.com/RafaelEtec/nextchat/commit/8d07a3e124223a84be76170f09357110a01ea71d))

# 0.4.0 (2025-04-14)

Todas as mudanças importantes deste projeto serão documentadas aqui.

## [0.3.0]

### Adicionado
- Página de changelog na UI.
- Suporte à leitura do `README.md` dentro da interface.

---

## [0.2.0] - 2025-04-14

### Adicionado
- Componentes de sidebar (`Sidebar`, `SidebarBody`, `SidebarLink`, etc) com animações via Framer Motion.
- Suporte a Zustand para controle de estado global (ex: abrir/fechar sidebar).
- Autenticação via GitHub e Google usando NextAuth.
- Layout responsivo com adaptação para dispositivos móveis.
- Navegação por grupos de conversa.

### Corrigido
- Problema de chave duplicada em listas de links da sidebar.
- Incompatibilidade entre `useState` e Zustand no componente `Sidebar`.

---

## [0.1.0] - 2025-04-10

### Adicionado
- Primeira versão estável do app de chat em tempo real 🎉
- Login com provedores externos.
- Layout com sidebar dinâmica e responsiva.