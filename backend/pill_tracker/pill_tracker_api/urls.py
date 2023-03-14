from django.urls import path, include
from . import views

urlpatterns = [
    path('med', views.UserMedicationAPIView.as_view()),
    path('med/<int:pk>', views.UserMedicationAPIView.as_view()),
]