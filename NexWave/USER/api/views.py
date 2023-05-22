from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from firebase_admin import credentials
from ..models import Connections
from .serializers import ConnectionSerializer,GenerateOTPSerializer
import firebase_admin
from firebase_admin import auth
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
firebase_credentials = r"D:\PROJECT-SECOND\NexWave\NexWave\nexwave-22186-firebase-adminsdk-f5ds6-5088b7805a.json"
cred = credentials.Certificate(firebase_credentials)


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

def send_verification_code(phone_number):
     # Initialize the Firebase Admin SDK

    # Send verification code to the user's phone number
    
    verification_id = auth.create_phone_verification(
        phone_number=phone_number
    )
    
    print("Verification ID:", verification_id)
    # You can store the verification ID in your database or session for later use

    # The verification code will be sent to the user's phone number via SMS
    # Handle the verification code input from the user to complete the authentication process

class GenerateOTPView(APIView):
    def post(self, request, format=None):
        serializer = GenerateOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        name = validated_data.get('name')
        phone_number = validated_data.get('phone_number')
        # Generate OTP
        verification_code = send_verification_code(phone_number)
        print(verification_code)
        # Create or update Firebase user with phone number and OTP
        

        # Send OTP to user's phone number (e.g., using SMS)

        # Create the response data
        response_data = {
            'success': True,
            'message': 'OTP generated and sent successfully',
            'name': name,
            'phone_number': phone_number,
            
        }

        return Response(response_data)