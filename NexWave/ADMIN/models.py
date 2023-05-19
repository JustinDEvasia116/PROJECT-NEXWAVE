# models.py
from django.db import models

class PlanCategory(models.Model):
    name = models.CharField(max_length=255)

class Plan(models.Model):
    name = models.CharField(max_length=255)
    data_limit = models.IntegerField()
    voice_limit = models.IntegerField()
    sms_limit = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(PlanCategory, on_delete=models.CASCADE)

