from django.contrib import admin
from jobs.models import Sectors,Company,Jobs

# Register your models here.
admin.site.register(Sectors)
admin.site.register(Company)
admin.site.register(Jobs)