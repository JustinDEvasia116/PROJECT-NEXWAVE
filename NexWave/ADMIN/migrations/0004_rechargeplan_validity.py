# Generated by Django 4.1.9 on 2023-06-05 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ADMIN', '0003_rename_plan_rechargeplan_subscription'),
    ]

    operations = [
        migrations.AddField(
            model_name='rechargeplan',
            name='validity',
            field=models.IntegerField(null=True),
        ),
    ]
