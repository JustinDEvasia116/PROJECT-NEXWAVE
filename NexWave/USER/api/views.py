from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from ..models import Connections
from django.views import View
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from ..models import OTP
from .twilio_utils import *
import random
from .serializers import *

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token


class TokenObtainPairWithMobNumberSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        connections_instance = user
        if connections_instance:
            token['mob_number'] = connections_instance.username
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
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/signup',
        '/api/connections/create/',
        '/admins/pending-connections/'
    ]
    return Response(routes)


class GenerateOTPView(APIView):
    def post(self, request, format=None):
        serializer = GenerateOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        mob_number = validated_data.get('mob_number')
        # Generate OTP
        try:
            user = User.objects.get(username=mob_number)
        except User.DoesNotExist:
            return JsonResponse({'message': 'User does not exist'})

        # Generate a random 6-digit OTP
        otp = str(random.randint(100000, 999999))

        # Save the OTP in the database
        otp_obj, created = OTP.objects.get_or_create(user=user)
        otp_obj.otp = otp
        otp_obj.save()

        # Send the OTP to the user's phone using Twilio
        body = f"Your OTP is: {otp}"
        message_handler = MessageHandler(
            mob_number, body).sent_activation_sms()

        return JsonResponse({'message': 'OTP sent successfully'})


class UserLoginView(APIView):
    def post(self, request, format=None):
        serializer = VerifyOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        mob_number = validated_data.get('mob_number')
        entered_otp = validated_data.get('otp')

        try:
            user = User.objects.get(username=mob_number)
            username = user.username
        except User.DoesNotExist:
            return JsonResponse({'message': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            otp_obj = OTP.objects.get(user=user)
            databaseotp = otp_obj.otp
        except OTP.DoesNotExist:
            return JsonResponse({'message': 'OTP does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        if entered_otp == databaseotp:
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token
            access_token.payload['username'] = mob_number
            access_token.payload['is_user'] = True
            response_data = {
            'access': str(access_token),
            'refresh': str(refresh),
            }
            return JsonResponse(response_data, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'message': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)