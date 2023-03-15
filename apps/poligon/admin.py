from django.contrib import admin
from .models import *

class ContractsAdmin(admin.ModelAdmin):
    list_display = ('id', 'contractAddress', )
    list_display_links = ('contractAddress', )
    search_fields = ["contractAddress"]
    # ESTO ES PARA CREAR UNA TABLA/INTERFACE EN EL ADMINISTRADOR, Y ESTOS SON LOS CAMPOS QUE TENDRÁ 
# Y APARECERÁN EN GoerliPublic, Esta clase y por ende en este modelo se verá como lo dice en la clase
admin.site.register(PolygonPublic, ContractsAdmin, )
admin.site.register(PolygonPrivate, ContractsAdmin, )