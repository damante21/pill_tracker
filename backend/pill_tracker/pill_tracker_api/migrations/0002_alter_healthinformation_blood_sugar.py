# Generated by Django 4.1.5 on 2023-03-27 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pill_tracker_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='healthinformation',
            name='blood_sugar',
            field=models.IntegerField(default=70),
        ),
    ]