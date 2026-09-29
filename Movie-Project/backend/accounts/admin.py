from django.contrib import admin

from .models import ManagerProfile


@admin.register(ManagerProfile)
class ManagerProfileAdmin(admin.ModelAdmin):
	list_display = ('user', 'created_at')
	search_fields = ('user__username', 'user__email', 'user__first_name', 'user__last_name')
	autocomplete_fields = ('user',)
	readonly_fields = ('created_at',)
