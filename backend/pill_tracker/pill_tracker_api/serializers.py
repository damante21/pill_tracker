from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserMedication, MedicationIntake
from datetime import timedelta, datetime

class UserMedicationSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = UserMedication
        fields = '__all__'

    #this works when adding meds through DRF API - auto creates "checkboxes" for medication tracking based on start/stop date and number of times to take per day
    def create_intakes_for_medication(self, user_medication):
        start_date = user_medication.start_date
        refill_date = user_medication.refill_date or start_date
        days = (refill_date - start_date).days + 1
        intakes_per_day = user_medication.times_per_day
        delta = timedelta(days=1 / intakes_per_day)

        time_parts = (user_medication.time_of_first_med.hour, user_medication.time_of_first_med.minute)
        start_datetime = datetime.combine(start_date, datetime.min.time())
        start_datetime += timedelta(hours=int(time_parts[0]), minutes=int(time_parts[1]))

        for i in range(days):
            date = start_datetime.date()
            for j in range(intakes_per_day):
                time = start_datetime.time()
                MedicationIntake.objects.create(medication=user_medication, date=date, time=time)
                start_datetime += delta

    def create(self, validated_data):
        instance = super().create(validated_data)
        self.create_intakes_for_medication(instance)
        return instance
    
    def update(self, instance, validated_data):
        # First, update the UserMedication instance
        instance.medication_name = validated_data.get('medication_name', instance.medication_name)
        validated_data.get('medication_notes', instance.medication_notes)
        instance.dosage = validated_data.get('dosage', instance.dosage)
        instance.rx_number = validated_data.get('rx_number', instance.rx_number)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.refill_date = validated_data.get('refill_date', instance.refill_date)
        instance.times_per_day = validated_data.get('times_per_day', instance.times_per_day)
        instance.number_of_pills = validated_data.get('number_of_pills', instance.number_of_pills)
        instance.save()

        # Next, update the MedicationIntake instances if necessary - changing dates and frequency
        if 'times_per_day' in validated_data or 'time_of_first_med' in validated_data:
            # change to delete and create only from today forward
            MedicationIntake.objects.filter(medication=instance).delete()
            self.create_intakes_for_medication(instance)
        return instance
    

class MedicationIntakeSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = MedicationIntake
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','password')
        extra_kwargs = {'password': {'write_only':True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
        return user