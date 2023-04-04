
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('pill_tracker_api.urls')),
    # path('nih_api/', include('nih_api.urls')),
]
