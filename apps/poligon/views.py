from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import * 
from .serializers import *
from web3 import Web3
import os
import environ

env = environ.Env()
environ.Env.read_env()

class SearchListPublicContractsView(APIView):
    parser_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        parametro = request.query_params.get('contract')

        if PolygonPublic.objects.filter(contractAddress=parametro).exists():
            contrato = PolygonPublic.objects.get(contractAddress=parametro)
            serializer = PublicSerializer(contrato)
            resultado = serializer.data

            return Response({'contrato': resultado}, status=status.HTTP_200_OK)
        
        elif PolygonPrivate.objects.filter(contractAddress=parametro).exists():
            contrato = PolygonPrivate.objects.get(contractAddress=parametro)
            serializer = PrivateSerializer(contrato)
            resultado = serializer.data

            return Response({'contrato': resultado}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No contract found'}, status=status.HTTP_404_NOT_FOUND)

class ContratosAgrupados(APIView):
    parser_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
            if PolygonPublic.objects.all().exists():
                # Obtener el parámetro de página de la solicitud de consulta.
                # Si no se proporciona ningún parámetro, establecer el valor en 1.
                page = int(request.query_params.get('page', 1))
                # Establecer el tamaño de la página (número de registros por página).
                page_size = 3
                # Calcular el índice de inicio y el índice de finalización
                # de los registros que se devolverán en la respuesta.
                start_index = (page - 1) * page_size
                end_index = start_index + page_size

                # Obtener los registros de la base de datos utilizando slicing.
                contracts = PolygonPublic.objects.all()[start_index:end_index]
                # Serializar los registros obtenidos.
                serializer = PublicPaginator(contracts, many=True)
                # Crear un diccionario que incluya la información de los registros
                # y la información de paginación.
                result = {
                    'contracts': serializer.data,
                    'page': page,
                }
                # Devolver la respuesta con el diccionario creado.
                return Response(result, status=status.HTTP_200_OK)
            else:
                return Response({'error':'No contracts found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(('POST', ))
def save_data_public(request):

    INFURA_URL = os.environ.get('INFURA_URL')
    provider = f'https://polygon-mainnet.infura.io/v3/{INFURA_URL}'
    web3 = Web3(Web3.HTTPProvider(provider))
    # CANVIAR ESTO
    ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "buscarCONTRATO",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "terminosYcondiciones",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "DyOchoDinero",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "SIXdinero",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rendimiento",
                "type": "uint256"
            }
        ],
        "name": "crearContrato",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "detener",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
    CONTRACT_TMIS = '0x7988B7E7DA1c7F745a9dF60AC0CF7A0f51738265'
    # CANVIAR ESTO
    addressDelCreador = request.POST.get('creatorAddress')
    direccion = Web3.to_checksum_address(addressDelCreador)
    contractAddress = request.POST.get('contractAddress')
    contrato = web3.eth.contract(address=CONTRACT_TMIS, abi=ABI)
    outPut = contrato.functions.buscarCONTRATO(_address=direccion).call()

    if request.method == 'POST':
        if contractAddress == outPut:

            polygon_public = PolygonPublic(
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

            polygon_public.save()

            return Response({'data': 'data saved succes'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'data no saved'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return Response({'error': 'data no saved'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    
@api_view(('POST', ))
def save_data_private(request):

    INFURA_URL = os.environ.get('INFURA_URL')
    provider = f'https://polygon-mainnet.infura.io/v3/{INFURA_URL}'
    web3 = Web3(Web3.HTTPProvider(provider))
    # CANVIAR ESTO
    ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "buscarCONTRATO",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "terminosYcondiciones",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "DyOchoDinero",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "SIXdinero",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rendimiento",
                "type": "uint256"
            }
        ],
        "name": "crearContrato",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "detener",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
    CONTRACT_TMIS = '0x7988B7E7DA1c7F745a9dF60AC0CF7A0f51738265'
    # CANVIAR ESTO
    addressDelCreador = request.POST.get('creatorAddress')
    direccion = Web3.to_checksum_address(addressDelCreador)
    contractAddress = request.POST.get('contractAddress')
    contrato = web3.eth.contract(address=CONTRACT_TMIS, abi=ABI)
    outPut = contrato.functions.buscarCONTRATO(_address=direccion).call()

    if request.method == 'POST':
        if contractAddress == outPut:

            polygon_private = PolygonPrivate(
                addressDelCreador = request.POST.get('creatorAddress'),
                contractAddress = request.POST.get('contractAddress'),
                slug = request.POST.get('slug'),
                rendimiento = request.POST.get('rendimiento'),
                terminosYcondiciones = request.POST.get('termsAconditions'),
                cantidadObjetivo  = request.POST.get('targetCuantity'),
            )

            polygon_private.save()

            return Response({'data': 'data saved succes'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'data no saved'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return Response({'error': 'data no saved'}, status=status.HTTP_406_NOT_ACCEPTABLE)