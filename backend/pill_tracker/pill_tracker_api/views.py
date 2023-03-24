from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UserMedicationSerializer, MedicationIntakeSerializer, UserSerializer
from .models import UserMedication, MedicationIntake
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.decorators import authentication_classes
from datetime import date

@authentication_classes([TokenAuthentication])
class UserMedicationAPIView(APIView):
    # will get specific med or list of meds with end dates today or in the future (so we don't see past medications)
    def get(self, request, pk=None):
        try:
            user_id = request.user.id
            if pk:
                medication = UserMedication.objects.get(pk=pk)
                serializer = UserMedicationSerializer(medication)
            else:
                medications = UserMedication.objects.filter(user=user_id, refill_date__gte=date.today())
                serializer = UserMedicationSerializer(medications, many=True)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def post(self, request):
        print(request.user)
        serializer = UserMedicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            medication = UserMedication.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserMedicationSerializer(medication, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            medication = UserMedication.objects.get(pk=pk)
            medication.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        

@authentication_classes([TokenAuthentication])
class MedicationIntakeAPIView(APIView):
    def get(self, request, pk=None):
        try:
            user_id = request.user.id
            if pk:
                medication_intake = MedicationIntake.objects.get(pk=pk)
                serializer = MedicationIntakeSerializer(medication_intake)
            elif request.query_params:
                date = request.query_params.get('date')
                medication_intakes = MedicationIntake.objects.filter(medication__user=user_id, date=date).order_by('time')
                serializer = MedicationIntakeSerializer(medication_intakes, many=True)
            else:
                medication_intakes = MedicationIntake.objects.filter(medication__user=user_id)
                serializer = MedicationIntakeSerializer(medication_intakes, many=True)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def put(self, request, pk):
        medication_intake = MedicationIntake.objects.get(pk=pk)
        serializer = MedicationIntakeSerializer(medication_intake, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RegisterAPI(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": serializer.data
            }
        )
    
class UserDetailAPI(APIView):
  authentication_classes = (TokenAuthentication,)
  permission_classes = (AllowAny,)
  
  def get(self,request,*args,**kwargs):
    user = User.objects.get(id=request.user.id)
    serializer = UserSerializer(user)
    return Response(serializer.data)