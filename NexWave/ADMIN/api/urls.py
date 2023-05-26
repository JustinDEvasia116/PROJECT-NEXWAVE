from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('', views.RoutesAPIView.as_view(), name='available-routes'),
    path('pending-connections/', views.PendingConnectionsView.as_view(), name='pending-connections'),   
    path('pending-connections/<int:pk>/actions/',views.TakeActionView.as_view(), name='pending-connections-actions'),
    path('plan-categories/add/', views.PlanCategoryCreateAPIView.as_view(), name='plan-category-create'),
    path('plans/add/', views.PlanCreateAPIView.as_view(), name='plan-create'),
    path('admin-token/', views.MyTokenObtainPairView.as_view(), name='admin-token-obtain'),
    path('admin-token/refresh/', TokenRefreshView.as_view(), name='admin-token-refresh'),
    
]
