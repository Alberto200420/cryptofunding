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

    INFURA_URL = os.environ.get('INFURA_URL')
    provider = f'https://goerli.infura.io/v3/{INFURA_URL}'
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
    CONTRACT_TMIS = '0x0c689BB706F46f572B2334c3db35Cc55Be4a39D6'
    # CANVIAR ESTO
    addressDelCreador = request.POST.get('creatorAddress')
    contractAddress = request.POST.get('contractAddress')
    contrato = web3.eth.contract(address=CONTRACT_TMIS, abi=ABI)
    outPut = contrato.functions.buscarCONTRATO(_address=addressDelCreador).call()

    if request.method == 'POST':
        if contractAddress == outPut:

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
            return Response({'error': 'data no saved'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return Response({'error': 'data no saved'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    
@api_view(('POST', ))
def save_data_private(request):

    INFURA_URL = os.environ.get('INFURA_URL')
    provider = f'https://goerli.infura.io/v3/{INFURA_URL}'
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
    CONTRACT_TMIS = '0x0c689BB706F46f572B2334c3db35Cc55Be4a39D6'
    # CANVIAR ESTO
    addressDelCreador = request.POST.get('creatorAddress')
    contractAddress = request.POST.get('contractAddress')
    contrato = web3.eth.contract(address=CONTRACT_TMIS, abi=ABI)
    outPut = contrato.functions.buscarCONTRATO(_address=addressDelCreador).call()

    if request.method == 'POST':
        if contractAddress == outPut:

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
            return Response({'error': 'data no saved'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return Response({'error': 'data no saved'}, status=status.HTTP_406_NOT_ACCEPTABLE)