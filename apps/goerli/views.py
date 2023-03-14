from rest_framework.views import APIView
from rest_framework.decorators import api_view
import json
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import * 
from .serializers import *

class SearchListPublicContractsView(APIView):
    parser_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        parametro = request.query_params.get('contract')

        if GoerliPublic.objects.filter(contractAddress=parametro).exists():
            contrato = GoerliPublic.objects.get(contractAddress=parametro)
            serializer = PublicSerializer(contrato)
            resultado = serializer.data

            return Response({'contrato': resultado}, status=status.HTTP_200_OK)
        
        elif GoerliPrivate.objects.filter(contractAddress=parametro).exists():
            contrato = GoerliPrivate.objects.get(contractAddress=parametro)
            serializer = PrivateSerializer(contrato)
            resultado = serializer.data

            return Response({'contrato': resultado}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No contract found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(('POST', ))
def save_data_public(request):
    if request.method == 'POST':
        data = request.body.decode()
        info_dic = json.loads(data)
        # estas comillas son como viene la data del front-end
        addressDelCreador = info_dic.get('creatorAddress')
        contractAddress = info_dic.get('contractAddress')
        slug = info_dic.get('slug')
        rendimiento = info_dic.get('rendimiento')
        terminosYcondiciones = info_dic.get('termsAconditions')
        cantidadObjetivo = info_dic.get('targetCuantity')
        correoElectronico = info_dic.get('email')
        linkInstagram = info_dic.get('linkInstagram')
        paginaWeb = info_dic.get('webPage')
        linkTwitter = info_dic.get('linkTwitter')
        linkedin = info_dic.get('linkedin')
        oficinas = info_dic.get('ofice')
        imagenPersonal = info_dic.get('personalFile')
        logo = info_dic.get('logo')
        trayectoria = info_dic.get('trayectory')

        goerli_public = GoerliPublic(
            addressDelCreador = addressDelCreador,
            contractAddress = contractAddress,
            slug = slug,
            rendimiento = rendimiento,
            terminosYcondiciones = terminosYcondiciones,
            cantidadObjetivo = cantidadObjetivo,
            correoElectronico = correoElectronico,
            linkInstagram = linkInstagram,
            paginaWeb = paginaWeb,
            linkTwitter = linkTwitter,
            linkedin = linkedin,
            oficinas = oficinas,
            imagenPersonal = imagenPersonal,
            logo = logo,
            trayectoria = trayectoria,
        )
        goerli_public.save()

        return Response({'data': 'data saved succes'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'data no saved'}, status=status.HTTP_201_CREATED)
    
@api_view(('POST', ))
def save_data_private(request):
    if request.method == 'POST':
        data = request.body.decode()
        info_dic = json.loads(data)
        # estas comillas son como viene la data del front-end
        addressDelCreador = info_dic.get('creatorAddress')
        contractAddress = info_dic.get('contractAddress')
        slug = info_dic.get('slug')
        rendimiento = info_dic.get('rendimiento')
        terminosYcondiciones = info_dic.get('termsAconditions')
        cantidadObjetivo = info_dic.get('targetCuantity')

        goerli_private = GoerliPrivate(
            addressDelCreador = addressDelCreador,
            contractAddress = contractAddress,
            slug = slug,
            rendimiento = rendimiento,
            terminosYcondiciones = terminosYcondiciones,
            cantidadObjetivo = cantidadObjetivo,
        )
        goerli_private.save()

        return Response({'data': 'data saved succes'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'data no saved'}, status=status.HTTP_201_CREATED)