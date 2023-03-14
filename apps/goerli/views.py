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

        goerli_public = GoerliPublic(
            addressDelCreador = request.POST.get('creatorAddress'),
            contractAddress = request.POST.get('contractAddress'),
            slug = request.POST.get('slug'),
            rendimiento = request.POST.get('rendimiento'),
            terminosYcondiciones = request.POST.get('termsAconditions'),
            cantidadObjetivo  = request.POST.get('targetCuantity'),
            correoElectronico = request.POST.get('email'),
            linkInstagram = request.POST.get('linkInstagram'),
            paginaWeb = request.POST.get('webPage'),
            linkTwitter = request.POST.get('linkTwitter'),
            linkedin = request.POST.get('linkedin'),
            oficinas = request.POST.get('ofice'),
            imagenPersonal = request.FILES.get('personalFile'),
            logo = request.FILES.get('logo'),
            trayectoria = request.POST.get('trayectory'),
        )

        goerli_public.save()

        return Response({'data': 'data saved succes'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'data no saved'}, status=status.HTTP_201_CREATED)
    
@api_view(('POST', ))
def save_data_private(request):
    if request.method == 'POST':

        goerli_private = GoerliPrivate(
            addressDelCreador = request.POST.get('creatorAddress'),
            contractAddress = request.POST.get('contractAddress'),
            slug = request.POST.get('slug'),
            rendimiento = request.POST.get('rendimiento'),
            terminosYcondiciones = request.POST.get('termsAconditions'),
            cantidadObjetivo  = request.POST.get('targetCuantity'),
        )

        goerli_private.save()

        return Response({'data': 'data saved succes'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'data no saved'}, status=status.HTTP_201_CREATED)