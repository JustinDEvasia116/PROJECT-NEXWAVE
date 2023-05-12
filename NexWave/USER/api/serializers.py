from rest_framework import serializers
from ..models import User, Connections
from django.contrib.auth import get_user_model
from ..models import Connections, Address
from django.contrib.auth.hashers import make_password
import uuid

User = get_user_model()

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['street', 'city', 'state', 'zip_code']



class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['street', 'city', 'state', 'zip_code']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')

class ConnectionSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    user = UserSerializer(read_only=True)

    class Meta:
        model = Connections
        fields = ['mob_number', 'connection_type', 'address', 'profile_name', 'id', 'user']

    def create(self, validated_data):
        address_data = validated_data.pop('address')
        address = Address.objects.create(**address_data)
        profile_name = validated_data.pop('profile_name')

        # Create a new user with a random username and default password
        username = f'new_connection_{uuid.uuid4().hex[:6]}'
        password = make_password(None)  # Generate a default password
        user = User.objects.create(username=username, password=password,is_active=False,)

        # Create the connection instance and assign the user
        connection = Connections.objects.create(address=address, profile_name=profile_name, user=user, **validated_data)
        
        return connection