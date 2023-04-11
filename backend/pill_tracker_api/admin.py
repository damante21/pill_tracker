from django.contrib import admin
from .models import UserMedication, MedicationIntake, HealthInformation

# Register your models here.
admin.site.register(UserMedication)
admin.site.register(MedicationIntake)
admin.site.register(HealthInformation)