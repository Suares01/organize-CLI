<div id="top"></div>

[en](./README.md) | pt-BR

<h1 align="center">Organize CLI</h1>

<p align="center">Uma CLI para facilitar sua vida na hora de criar novos projetos 💪</p>

<h2 align="center">Conteúdos</h2>

<p align="center">
  <a href="#sobre">Sobre</a> •
  <a href="#comandos">Comandos</a> •
  <a href="#licença">Licença</a> •
  <a href="#contato">Contato</a>
</p>

---

<h2 id="sobre">Sobre</h2>

Este projeto visa facilitar sua vida na hora de criar e interagir com seus projetos JavaScript. Entre suas principais funcionalidades estão:

- criar o diretório e iniciar o projeto JavaScript;
- abra qualquer projeto em qualquer lugar da sua máquina usando seu IDE favorito...

Por enquanto está bem simples, mas tem mais por vir...

---

<h2 id="comandos">Comandos</h2>

- [new:user](#newuser)
- [list:user](#listuser)
- [set:active](#setactive)
- [new:project](#newproject)
- [list:project](#listproject)
- [open | o](#open--o)

### new:user

Este comando é responsável por criar novos usuários. Você precisa definir seu nome de usuário e senha (é possível criar muitos usuários). Quando o usuário é criado, ele é definido como [ativo](#setactive).

```shell
organize-cli new:user <username> <password>
```

_OPÇÕES_:

`-h, --help` - exibir comando de ajuda.

<p align="right">
  (<a href="#comandos">voltar</a>)
</p>

### list:user

Este comando é responsável por listar todos os usuários que você criou.

```shell
organize-cli list:user
```

_OPÇÕES_:

`-u, --user <username>` - retornar um usuário específico de acordo com o nome de usuário fornecido.

`-h, --help` - exibir comando de ajuda.

<p align="right">
  (<a href="#comandos">voltar</a>)
</p>

### set:active

Como mais de um usuário pode ser criado em sua máquina, você pode definir qual usuário é o ativo. O usuário ativo é aquele que executa os comandos, portanto, se você listar ou abrir projetos, a CLI procurará os projetos do usuário ativo. O mesmo vale para a criação de projetos. Portanto, é importante verificar qual usuário é o ativo, você pode ver isso [listando](#listuser) os usuários.

Este comando é responsável por alterar o usuário ativo.

```shell
organize-cli set:active <username>
```

_OPÇÕES_:

`-h, --help` - exibir comando de ajuda.

<p align="right">
  (<a href="#comandos">voltar</a>)
</p>

### new:project

Este comando é responsável por criar novos projetos para um usuário ativo. Basta navegar até o diretório que deseja criar o projeto e executar o comando abaixo.

```shell
organize-cli new:project <name>
```

_OPÇÕES_:

`-h, --help` - exibir comando de ajuda.

<p align="right">
  (<a href="#comandos">voltar</a>)
</p>

### list:project

Este comando é responsável por listar todos os projetos do usuário ativo.

```shell
organize-cli list:project
```

_OPÇÕES_:

`-n, --name <projectName>` - retornar um projeto específico de acordo com o nome fornecido.

`-h, --help` - exibir comando de ajuda.

<p align="right">
  (<a href="#comandos">voltar</a>)
</p>

### open | o

Este comando é responsável por abrir os projetos em seu IDE. Por padrão, a CLI usa VScode (`code`), mas você pode alterá-lo. Você pode executar esse comando de qualquer diretório da sua máquina.

```shell
organize-cli open <projectName>
```

or

```shell
organize-cli o <projectName>
```

_OPÇÕES_:

`-i, --ide <ideCLI>` - Altere o IDE para abrir seus projetos. (padrão: "code")

`-h, --help` - exibir comando de ajuda.

<p align="right">
  (<a href="#comandos">voltar</a>)
</p>

---

## Licença

Distribuído sob a licença MIT. Consulte [LICENSE](./LICENSE) para obter mais informações.

<p align="right">(<a href="#top">voltar ao topo</a>)</p>

## Contato

Lucas Suares - suares_silva.01@hotmail.com

<p align="right">(<a href="#top">voltar ao topo</a>)</p>

---

<p align="center">Copyright © 2022 Lucas Suares</p>
