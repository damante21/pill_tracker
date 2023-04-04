# Generated by Django 4.1.5 on 2023-04-04 13:45

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pill_tracker_api', '0003_merge_20230403_1334'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermedication',
            name='intake_quantity',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]
