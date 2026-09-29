from django.db import models
from django.conf import settings


class ManagerProfile(models.Model):
	user = models.OneToOneField(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name='manager_profile',
	)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f'Manager profile: {self.user.username}'
