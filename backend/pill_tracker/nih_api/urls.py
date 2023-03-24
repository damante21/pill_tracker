from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('nih_api/', views.display_drug_info, name='nih_api'),
]
