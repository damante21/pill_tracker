from rest_framework import serializers
from .models import UserMedication

class UserMedicationSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = UserMedication
        fields = '__all__'