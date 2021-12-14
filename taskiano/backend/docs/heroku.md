<h1>Taskiano: The Django Application</h1>

<h2>Deploying to Heroku</h2>

- [0. Install Heroku CLI](#0-install-heroku-cli)
- [1: Make login](#1-make-login)
- [2: Heroku create a new app](#2-heroku-create-a-new-app)
- [3: Send a git repo to Heroku](#3-send-a-git-repo-to-heroku)
- [4: Make migrations in heroku](#4-make-migrations-in-heroku)
- [5: Migrate in heroku](#5-migrate-in-heroku)


<h3>Getting Started</h3>

#### 0. Install Heroku CLI

---

[Heroku CLI - Download and Install](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

---

#### 1: Make login

```sh
╭─host@linux ~/Desktop/Projects/Taskiano/taskiano/backend/
╰─$ heroku login
```

#### 2: Heroku create a new app

```sh
╭─host@linux ~/Desktop/Projects/Taskiano/taskiano/backend/
╰─$ heroku create taskiano-backend
```

#### 3: Send a git repo to Heroku

```sh
╭─host@linux ~/Desktop/Projects/Taskiano/taskiano/backend/
╰─$ git add *
╭─host@linux ~/Desktop/Projects/Taskiano/taskiano/backend/
╰─$ git commit -m "Initial commit"
╭─host@linux ~/Desktop/Projects/Taskiano/taskiano/backend/
╰─$ git push heroku main
```

#### 4: Make migrations in heroku

```sh
╭─host@linux ~/Desktop/Projects/Taskiano/taskiano/backend/
╰─$ heroku run python manage.py makemigrations
```

#### 5: Migrate in heroku

```sh
╭─host@linux ~/Desktop/Projects/Taskiano/taskiano/backend/
╰─$ heroku run python manage.py migrate
```

<p align="center">Done ❤️</p>
