#!/bin/bash

# Exit on error
set -o errexit

pipenv shell

pip install -r requirements.txt

python manage.py collectstatic --no-input

# python manage.py migrate