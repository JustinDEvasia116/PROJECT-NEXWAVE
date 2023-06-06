# models.py
from django.db import models

from USER.models import User
# User = get_user_model()

class PlanCategory(models.Model):
    name = models.CharField(max_length=255)

class RechargePlan(models.Model):
    name = models.CharField(max_length=255)
    data_limit = models.IntegerField()
    voice_limit = models.IntegerField()
    sms_limit = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    validity = models.IntegerField(null=True)
    category = models.ForeignKey(PlanCategory, on_delete=models.CASCADE)

class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    plan = models.ForeignKey(RechargePlan, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=False)
    billing_info = models.CharField(max_length=255)
