#!/bin/sh
pip install -r requirements.txt
python manage.py makemigrations api
python manage.py migrate
exec "$@"