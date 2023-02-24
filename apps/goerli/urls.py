from django.urls import path
from .views import *

urlpatterns = [
    path('public/search', SearchListPublicContractsView.as_view()),
    path('private/search', SearchListPrivateContractsView.as_view()),
    path('send/public', save_data_public, name='save_data_public'),
    path('send/private', save_data_private, name='save_data_private'),
]