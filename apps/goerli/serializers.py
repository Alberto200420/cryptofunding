from rest_framework import serializers
from .models import *

class PublicSerializer(serializers.ModelSerializer):
    class Meta: 
        model=GoerliPublic
        fields=[
            'id',
            'roundTipe',
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


class PrivateSerializer(serializers.ModelSerializer):
    class Meta:
        model=GoerliPrivate
        fileds=[
            'id',
            'roundTipe',
            'addressDelCreador',
            'contractAddress',
            'slug',
            'terminosYcondiciones',
            'fechaDeCreacion',
            'cantidadObjetivo',
            'rendimiento'
        ]