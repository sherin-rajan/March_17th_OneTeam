from django.contrib import admin
from movies.models import Movies,Category

# Register your models here.

class MovieAdmin(admin.ModelAdmin):
    list_display=['movie','category','release_date']

admin.site.register(Movies,MovieAdmin)

class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields={"slug":['category']}

admin.site.register(Category,CategoryAdmin)

