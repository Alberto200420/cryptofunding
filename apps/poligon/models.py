from django.db import models

def public_thumbnail_directory(instace, filename):
    return 'publicPolygon/{0}/{1}'.format(instace.correoElectronico, filename)

# Create your models here.
class PolygonPublic(models.Model):
    roundTipe =             models.CharField(max_length= 6, default='public')
    addressDelCreador =     models.CharField(max_length = 52)
    contractAddress =       models.CharField(max_length = 52, unique=True)
    slug =                  models.SlugField(max_length = 52, unique=True)
    rendimiento =           models.PositiveIntegerField()
    terminosYcondiciones =  models.TextField()
    fechaDeCreacion =       models.DateField(auto_now_add = True)
    cantidadObjetivo =      models.PositiveIntegerField()
    correoElectronico =     models.EmailField(max_length = 150, unique=True)
    linkInstagram =         models.URLField(max_length = 250, blank=True, null=True)
    paginaWeb =             models.URLField(max_length = 250, blank=True, null=True) 
    linkTwitter =           models.URLField(max_length = 250, blank=True, null=True)
    linkedin =              models.URLField(max_length = 250, blank=True, null=True)
    oficinas =              models.URLField(max_length = 250, blank=True, null=True)
    imagenPersonal =        models.ImageField(upload_to=public_thumbnail_directory)
    logo =                  models.ImageField(upload_to=public_thumbnail_directory)
    trayectoria =           models.TextField()
    # renames the instances of the model
    # with their addressDelCreador name
    def __str__(self):
        return self.addressDelCreador

class PolygonPrivate(models.Model):
    roundTipe =             models.CharField(max_length= 7, default='private')
    addressDelCreador =     models.CharField(max_length = 52)
    contractAddress =       models.CharField(max_length = 52, unique=True)
    slug =                  models.SlugField(max_length = 52, unique=True)
    rendimiento =           models.PositiveIntegerField()
    terminosYcondiciones =  models.TextField()
    fechaDeCreacion =       models.DateField(auto_now_add = True)
    cantidadObjetivo =      models.PositiveIntegerField()
    def __str__(self):
        return self.addressDelCreador