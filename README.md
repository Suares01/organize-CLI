<div id="top"></div>

en | [pt-BR](./README_pt-br.md)

<h1 align="center">Organize CLI</h1>

<p align="center">A CLI to make your life easier when creating new projects 💪</p>

<h2 align="center">Contents</h2>

<p align="center">
  <a href="#about">About</a> •
  <a href="#commands">Commands</a> •
  <a href="#license">License</a> •
  <a href="#contact">Contact</a>
</p>

---

<h2 id="about">About</h2>

This project aims to make your life easier when creating and interacting with your JavaScript projects. Among its main features are:

- create the directory and start the JavaScript project;
- open any project anywhere on your machine using your favorite IDE...

For now it's pretty simple, but there's more to come...

---

<h2 id="commands">Commands</h2>

- [new:user](#newuser)
- [list:user](#listuser)
- [set:active](#setactive)
- [new:project](#newproject)
- [list:project](#listproject)
- [open | o](#open--o)

### new:user

This command is responsible to create new users. You need to set your username and password (It's possible to create many users). When the user is created it is set to [active](#setactive).

```shell
organize-cli new:user <username> <password>
```

_OPTIONS_:

`-h, --help` - display help for command.

<p align="right">
  (<a href="#commands">back</a>)
</p>

### list:user

This command is responsible for listing all the users you have created.

```shell
organize-cli list:user
```

_OPTIONS_:

`-u, --user <username>` - return a specific user according to the given username.

`-h, --help` - display help for command.

<p align="right">
  (<a href="#commands">back</a>)
</p>

### set:active

Since more than one user can be created on your machine, you can define which user is the active one. The active user is the one executing the commands, so if you list or open projects, the CLI will look for the active user's projects. The same goes for creating projects. So it's important verify which user is the active, you can see this by [listing](#listuser) the users.

This command is responsible for changing the active user.

```shell
organize-cli set:active <username>
```

_OPTIONS_:

`-h, --help` - display help for command.

<p align="right">
  (<a href="#commands">back</a>)
</p>

### new:project

This command is responsible for creating new projects for an active user. Just navigate to the directory you want to create the project and run the command below.

```shell
organize-cli new:project <name>
```

_OPTIONS_:

`-h, --help` - display help for command.

<p align="right">
  (<a href="#commands">back</a>)
</p>

### list:project

This command is responsible for listing all projects of the active user.

```shell
organize-cli list:project
```

_OPTIONS_:

`-n, --name <projectName>` - return a specific project according to the given name.

`-h, --help` - display help for command.

<p align="right">
  (<a href="#commands">back</a>)
</p>

### open | o

This command is responsible for opening the projects in your IDE. By default, the CLI uses VScode (`code`), but you can change it. You can run this command from any directory on your machine.

```shell
organize-cli open <projectName>
```

or

```shell
organize-cli o <projectName>
```

_OPTIONS_:

`-i, --ide <ideCLI>` - Change the IDE for open your projects. (default: "code")

`-h, --help` - display help for command.

<p align="right">
  (<a href="#commands">back</a>)
</p>

---

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Lucas Suares - suares_silva.01@hotmail.com

<p align="right">(<a href="#top">back to top</a>)</p>

---

<p align="center">Copyright © 2022 Lucas Suares</p>
