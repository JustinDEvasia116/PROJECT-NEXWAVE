from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
from .views import TokenObtainPairWithMobNumberView

from rest_framework_simplejwt.views import (
   
    TokenRefreshView,
)

urlpatterns = [
    path('',views.getRoutes),
    # path('verify-otp/', views.VerifyOTPView.as_view(), name='verify-otp'),
    path('token/', TokenObtainPairWithMobNumberView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('connections/create/', views.ConnectionCreateView.as_view(), name='connection-create'),
    path('generate-otp/', views.GenerateOTPView.as_view(), name='generate-otp'),
    path('user-login/', views.UserLoginView.as_view() , name='user-login'),
    

    
]