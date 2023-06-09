# Generated by Django 4.1.9 on 2023-06-07 18:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ADMIN', '0004_rechargeplan_validity'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chat_Option',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=255)),
                ('parent_option', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sub_options', to='ADMIN.chat_option')),
            ],
        ),
    ]
