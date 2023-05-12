from rest_framework import generics, permissions
from rest_framework.generics import ListAPIView, UpdateAPIView
from django.contrib.auth.decorators import login_required, permission_required
from rest_framework.decorators import api_view, permission_classes,action
from django.utils.decorators import method_decorator
from rest_framework import status
from rest_framework.response import Response
from USER.api.serializers import *
from USER.models import *
from .twilio_utils import send_sms

class PendingConnectionsView(generics.ListAPIView):
    serializer_class = ConnectionSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return Connections.objects.filter(user__is_active=False)
    
class TakeActionView(UpdateAPIView):
    serializer_class = ConnectionSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_object(self):
        pk = self.kwargs.get('pk')
        obj = Connections.objects.filter(pk=pk, user__is_active=False).first()
        return obj

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        approved = request.data.get('approved', None)
        if approved is not None:
            if approved == 'true':
                instance.user.username = instance.mob_number
                instance.user.is_active = True
                instance.user.save()
                body = f"Your account with Nexwave is now active! Welcome aboard!"
                send_sms(instance.mob_number, body)
                instance.delete()
                return Response({'detail': 'Connection request approved.'})
            elif approved == 'false':
                instance.delete()
                return Response({'detail': 'Connection request rejected.'})
        return Response({'detail': 'Invalid request.'}, status=status.HTTP_400_BAD_REQUEST)









    
@api_view(['GET'])
def getRoutes(request):
    routes =[

        '/admins/pending-connections/' 
        ''         
    ]
    return Response(routes)