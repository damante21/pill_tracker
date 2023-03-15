from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('nih_api/', views.nih_api_call, name='nih_api'),
]
