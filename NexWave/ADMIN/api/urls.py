from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes,name ='available routes'),
    path('pending-connections/', views.PendingConnectionsView.as_view(), name='pending-connections'),
    path('pending-connections/<int:pk>/actions/',views.TakeActionView.as_view(), name='pending-connections-actions'),
]
