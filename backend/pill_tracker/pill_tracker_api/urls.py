from django.urls import path, include
from . import views

urlpatterns = [
    # add med
    path('med', views.UserMedicationAPIView.as_view()),
    # edit/delete med (also edits intake tracker when frequency/dates are updated)
    path('med/<int:pk>', views.UserMedicationAPIView.as_view()),
    # GET all tracking instances or for a specific date: api/med_tracker?date=2023-03-14
    # or GET all tracking instances 
    path('med_tracker', views.MedicationIntakeAPIView.as_view()),
    # GET specific tracking instance for checkbox
    path('med_tracker/<int:pk>/', views.MedicationIntakeAPIView.as_view()),
]