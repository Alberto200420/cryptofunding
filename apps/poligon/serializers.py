from rest_framework import serializers
from .models import *

class PublicSerializer(serializers.ModelSerializer):
    class Meta: 
        model=PolygonPublic
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
        model=PolygonPrivate
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