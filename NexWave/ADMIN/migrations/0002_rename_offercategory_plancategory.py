# Generated by Django 4.2 on 2023-05-16 06:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ADMIN', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='OfferCategory',
            new_name='PlanCategory',
        ),
    ]
