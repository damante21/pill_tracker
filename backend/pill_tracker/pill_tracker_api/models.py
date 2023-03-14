from django.db import models
from django.conf import settings

class UserMedication(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    medication_name = models.CharField(max_length=50)
    dosage = models.CharField(max_length=20)
    rx_number = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    times_per_day = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        return f"{self.user}'s {self.medication_name}"