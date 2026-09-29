from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    # Expose safe account fields without returning a user's password
    is_manager = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_manager']

    def get_is_manager(self, user):
        return user.is_staff or hasattr(user, 'manager_profile')


class RegistrationSerializer(serializers.ModelSerializer):
    # Validate new account data and hash the password through Django
    password = serializers.CharField(write_only=True, min_length=3)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        # Create the user with Django's password-hashing workflow
        return User.objects.create_user(**validated_data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data