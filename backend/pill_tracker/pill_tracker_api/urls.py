from django.urls import path, include
from .views import *
from rest_framework.authtoken import views


urlpatterns = [
    # add med, get list of current meds
    path('med', UserMedicationAPIView.as_view()),
    # get/edit/delete med (also edits intake tracker when frequency/dates are updated)
    path('med/<int:pk>', UserMedicationAPIView.as_view()),
    # GET all tracking instances or for a specific date: api/med_tracker?date=2023-03-14
    # or GET all tracking instances 
    path('med_tracker', MedicationIntakeAPIView.as_view()),
    # GET specific tracking instance for checkbox
    path('med_tracker/<int:pk>/', MedicationIntakeAPIView.as_view()),
    path('register/', RegisterAPI.as_view(), name='register'),
    path('api-token-auth', views.obtain_auth_token),
    path('user_details', UserDetailAPI.as_view()),
]