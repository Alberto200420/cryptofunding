from django.contrib import admin
from .models import *

class ContractsAdmin(admin.ModelAdmin):
    list_display = ('id', 'contractAddress', )
    list_display_links = ('contractAddress', )

admin.site.register(GoerliPublic, ContractsAdmin, )
admin.site.register(GoerliPrivate, ContractsAdmin, )