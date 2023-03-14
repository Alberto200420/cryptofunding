from rest_framework import serializers
from .models import *

class PostSerializer(serializers.ModelSerializer):
    class Meta: 
        model=GoerliPublic
        fields=[
            'id',
            'addressDelCreador',
            'contractAddress',
            'slug',
            'terminosYcondiciones',
            'fechaDeCreacion',
            'rendimiento',
            'cantidadObjetivo',
            'correoElectronico',
            'linkInstagram',
            'paginaWeb',
            'linkTwitter',
            'linkedin',
            'oficinas',
            'imagenPersonal',
            'logo',
            'trayectoria'
        ]
        id
# roundTipe