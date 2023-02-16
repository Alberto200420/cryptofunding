1- instale el ambiente virtual --- pipenv install ------ despues me corri el comando pipenv shell

2- instale django -------------- pip install django==3.2.16 ---------- despues django-admin startproject django_app .

3- instale librerias de requirements.txt ---------------  pip install -r ./requirements.txt ----- me dio un herror entonces
entré aquí ----  https://stackoverflow.com/questions/47318227/cannot-install-psycopg2-ubuntu ----- segui estos comandos
sudo apt install python3-dev libpq-dev ------------- pip3 install psycopg2

4- No se intalaron todas las librerias entonces lo hice manualmetne las que me pendia al correr el comando 
'python manage.py migrate'


CREADNO EL APP DE GOERLI - dentro de la carpeta app pon python ../manage.py startapp (goerli) luego ir a apps.py de goerli 
y agregarle de name = 'goerli'  a  name = 'apps.goerli'

Despues crear un urls.py en el app y agregale {
    from django.urls import path
    from .views import *

    urlpatterns = [
        
    ]
}

DESPUES IR A settings.py y agregarle {
    PROJECT_APPS = [ 
        'apps.goerli',
    ]
}