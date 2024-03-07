
# Node.js Express RESTful API

Node.js Express RESTful API for MySQL databases (and other technologies)



## Installation

Clone the project

```bash
  git clone https://github.com/varsanyib/node-mysql-api
```

Go to the project directory

```bash
  cd node-mysql-api
```

Install dependencies

```bash
  npm i
```
or
```bash
  npm install express body-parser mysql2 cors
```
    
## Run

Start the server

```bash
  node app.js
```
or
```bash
  node .
```


## API Reference

#### VUCIR informations

```http
  GET /
```

#### Technologies (MySQL) self-test

```http
  GET /selftest
```

#### List all tasks

```http
  GET /todo
```

#### List specific task by ID

```http
  GET /todo/{id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required**. Specific task ID in request URL. |

#### Create task

```http
  POST /todo/
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Task title. (Length max.: 255) |
| `details` | `string` | **Required**. Task details. (Length max.: 1000) |
| `completed` | `boolean` | **Required**. Task status. |

> [!IMPORTANT]
> The data is sent in body raw, JSON format!

#### Modify specific task data

```http
  PUT /todo/{id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required**. Specific task ID in request URL. |
| `title` | `string` | **Required**. Task title. (Length max.: 255) |
| `details` | `string` | **Required**. Task details. (Length max.: 1000) |
| `completed` | `boolean` | **Required**. Task status. |

> [!IMPORTANT]
> The data is sent in body raw, JSON format, except task ID!

#### Delete specific task

```http
  DELETE /todo/{id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required**. Specific task ID in request URL. |


## Tech Stack

**Server:** Node v21.6.2