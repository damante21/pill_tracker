from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('nih_api/', views.api_calls, name='nih_api'),
]
