from django.db import models
from django.conf import settings
from django.core.validators import  MinValueValidator

class UserMedication(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    medication_name = models.CharField(max_length=50)
    medication_notes = models.CharField(max_length=255, null=True, blank=True)
    dosage = models.CharField(max_length=20)
    intake_quantity = models.CharField(max_length=50)
    start_date = models.DateField()
    refill_date = models.DateField() # took out null/blank=true because intake instances are created in chunks based on this refill/end date
    times_per_day = models.PositiveSmallIntegerField(default=1)
    time_of_first_med = models.TimeField()
    number_of_pills  = models.IntegerField( validators=[MinValueValidator(0)])
    rxcui = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.user}'s {self.medication_name}"
    
class MedicationIntake(models.Model):
    medication = models.ForeignKey(UserMedication, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    taken = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.medication} on {self.date} at {self.time}"
    

class HealthInformation(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    heart_rate = models.IntegerField()
    blood_pressure = models.CharField(max_length=255, null=True, blank=True)
    height = models.CharField(max_length=20)
    weight = models.CharField(max_length=50)
    blood_sugar = models.IntegerField()

    def __str__(self):
        return f"{self.user}'s health info"