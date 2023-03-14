from django.db import models
from django.conf import settings

class UserMedication(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    medication_name = models.CharField(max_length=50)
    dosage = models.CharField(max_length=20)
    # add total pill count for refill tracking? ie. 30, 60, 90
    # add num of pills/med taken each intake
    rx_number = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True) # maybe change to refill date
    times_per_day = models.PositiveSmallIntegerField(default=1)
    time_of_first_med = models.TimeField()

    def __str__(self):
        return f"{self.user}'s {self.medication_name}"
    
class MedicationIntake(models.Model):
    medication = models.ForeignKey(UserMedication, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    taken = models.BooleanField(default=False)
    # add way to keep track of current pillcount left

    def __str__(self):
        return f"{self.medication} on {self.date} at {self.time}"