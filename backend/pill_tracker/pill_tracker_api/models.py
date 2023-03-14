from django.db import models
from django.conf import settings

class UserMedication(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    medication_name = models.CharField(max_length=50)
    medication_notes = models.CharField(max_length=255, null=True, blank=True)
    dosage = models.CharField(max_length=20)
    rx_number = models.CharField(max_length=50)
    start_date = models.DateField()
    refill_date = models.DateField(null=True, blank=True)
    times_per_day = models.PositiveSmallIntegerField(default=1)
    time_of_first_med = models.TimeField()

    def __str__(self):
        return f"{self.user}'s {self.medication_name}"
    
class MedicationIntake(models.Model):
    medication = models.ForeignKey(UserMedication, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    taken = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.medication} on {self.date} at {self.time}"