<h1>Taskiano: The Django Application</h1>

<h2>Local deploying</h2>

- [1: Install **virtualenv** from pip](#1-install-virtualenv-from-pip)
- [2: Create python virtual enviroment environment](#2-create-python-virtual-enviroment-environment)
- [3: Enter the virtual environment](#3-enter-the-virtual-environment)
- [4: Make migrations](#4-make-migrations)
- [5: Migrate](#5-migrate)
- [6: Run the server](#6-run-the-server)

<h3>How to run this application with virtualenv</h3>

#### 1: Install **virtualenv** from pip

```sh
╭─host@linux ~/Desktop/Projects/Taskiano/taskiano/backend/
╰─$ pip install pipenv
```

#### 2: Create python virtual enviroment environment

```sh
╭─host@linux ~/Desktop/Projects/Taskiano/taskiano/backend/
╰─$ pipenv install
```

#### 3: Enter the virtual environment

```sh
╭─host@linux ~/Desktop/Projects/Taskiano/taskiano/backend/
╰─$ pipenv shell
```

#### 4: Make migrations

```sh
╭─host@linux ~/Desktop/Projects/Taskiano/taskiano/backend/
╰─$ python manage.py makemigrations
```

#### 5: Migrate

```sh
╭─host@linux ~/Desktop/Projects/Taskiano/taskiano/backend/
╰─$ python manage.py migrate
```

#### 6: Run the server

```sh
╭─host@linux ~/Desktop/Projects/Taskiano/taskiano/backend/
╰─$ python manage.py runserver
```

<p align="center">Done ❤️</p>
