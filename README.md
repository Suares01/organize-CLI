<div id="top"></div>

en | [pt-BR](./README_pt-br.md)

<h1 align="center">Organize CLI</h1>

<p align="center">A CLI to make your life easier when creating new projects 💪</p>

<h2 align="center">Contents</h2>

<p align="center">
  <a href="#about">About</a> •
  <a href="#installation">Installation</a> •
  <a href="#getting-started">Getting Started</a> •
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

## Installation

Use npm or yarn:

```shell
npm install --global organizejs-cli
```

or

```shell
yarn global add organizejs-cli
```

## Getting Started

First of all you need to create a user, use the command below:

```shell
organize new:user name password
```

When creating a user, it is already defined as active on your machine, to understand it better click [here](#setactive).

Now you can start creating your projects. Navigate to the directory where you want to create the project and run the command below (this command automatically creates the project folder with the name that was defined).

```shell
organize new:project project_name
```

Now you can use the command [open](#open--o) to open the project in your IDE. **I recommend that you check the command to avoid any errors**.

```shell
organize open project_name
```

See about [commands](#commands) to better understand how the CLI works.

<h2 id="commands">Commands</h2>

<ul>
  <li><a href="#newuser">new:user</a></li>
  <li><a href="#listuser">list:user</a></li>
  <li><a href="#setactive">set:active</a></li>
  <li><a href="#newproject">new:project</a></li>
  <li><a href="#listproject">list:project</a></li>
  <li><a href="#open--o">open</a></li>
</ul>

### new:user

This command is responsible to create new users. You need to set your username and password (It's possible to create many users). When the user is created it is set to [active](#setactive).

```shell
organize new:user <username> <password>
```

_OPTIONS_:

`-h, --help` - display help for command.

<p align="right">
  (<a href="#commands">back</a>)
</p>

### list:user

This command is responsible for listing all the users you have created.

```shell
organize list:user
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
organize set:active <username>
```

_OPTIONS_:

`-h, --help` - display help for command.

<p align="right">
  (<a href="#commands">back</a>)
</p>

### new:project

This command is responsible for creating new projects for an active user. Just navigate to the directory you want to create the project and run the command below.

```shell
organize new:project <name>
```

_OPTIONS_:

`-h, --help` - display help for command.

<p align="right">
  (<a href="#commands">back</a>)
</p>

### list:project

This command is responsible for listing all projects of the active user.

```shell
organize list:project
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
organize open <projectName>
```

or

```shell
organize o <projectName>
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
