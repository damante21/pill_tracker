from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserMedication

class UserMedicationSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = UserMedication
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','password')
        extra_kwargs = {'password': {'write_only':True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
        return user