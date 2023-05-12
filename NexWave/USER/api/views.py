from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from ..models import Connections
from .serializers import ConnectionSerializer



from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class TokenObtainPairWithMobNumberSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        connections_instance = user.connections_set.first()
        if connections_instance:
            token['mob_number'] = connections_instance.mob_number

        return token


class TokenObtainPairWithMobNumberView(TokenObtainPairView):
    serializer_class = TokenObtainPairWithMobNumberSerializer


class ConnectionCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = ConnectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getRoutes(request):
    routes =[
        '/api/token',
        '/api/token/refresh',
        '/api/signup',
        '/api/connections/create/',
        '/admins/pending-connections/'          
    ]
    return Response(routes)