# Generated by Django 4.1.9 on 2023-06-18 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ADMIN', '0007_remove_subscription_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscription',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
    ]
