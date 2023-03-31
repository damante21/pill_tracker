from django.shortcuts import render, HttpResponse
import xml.etree.ElementTree as ET
from .classes.drug_classes import *
from .helpers.api_calls import api_calls
    

def display_drug_info(request):
    data = api_calls(request)
    
    return HttpResponse(data)
