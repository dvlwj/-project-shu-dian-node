# shu-dian-node

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

What is Shu Dian? Google translate yourself 😛. It's just a code name I create, because I am too lazy to put the real name of this project. Actually this project is a assignment test that I got.

## Getting Started <a name = "getting_started"></a>

To run this project is quite easy, just clone or download. 

Create a new database, for how is database example, you can take a look at `project_directory/mock_files/*.sql`

And then run :

```
npm install
```

```
npm run dev
```

Feel free to add new npm command inside `package.json` to suit your own interest.

### Prerequisites

Too busy to put min. specification, but my development environment when write this project is :

* Node v14.2.0
* Docker v19.03.8
* MySQL v8.0.20 (Dockernized)

Plese remember this program have a logs and sessions files. So if they are not appear in your project directory, you can try to create both folders manually and re-run the program.

It's should be like this :

```
--project_directory
---others folder
---logs
----logs file(s) will be generated and stored here
---sessions
----sessions file(s) will be generated and stored here
---others files
```