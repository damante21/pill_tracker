from django.contrib import admin
from .models import UserMedication, MedicationIntake

# Register your models here.
admin.site.register(UserMedication)
admin.site.register(MedicationIntake)