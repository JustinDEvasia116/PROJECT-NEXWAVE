from django.db import models
from django.contrib.auth.models import AbstractUser



class Address(models.Model):
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)

class User(AbstractUser):
    mob_number = models.CharField(max_length=20,null=True, blank=True)
    user_address = models.ForeignKey(Address, on_delete=models.CASCADE, null=True, blank=True)

class Connections(models.Model):
    CONNECTION_TYPE_PREPAID = 'prepaid'
    CONNECTION_TYPE_POSTPAID = 'postpaid'
    CONNECTION_TYPE_CHOICES = (
        (CONNECTION_TYPE_PREPAID, 'Prepaid'),
        (CONNECTION_TYPE_POSTPAID, 'Postpaid'),
    )
    mob_number = models.CharField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    connection_type = models.CharField(max_length=20, choices=CONNECTION_TYPE_CHOICES)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, null=True, blank=True)
    profile_name = models.CharField(max_length=20,null=True, blank=True)

class OTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)