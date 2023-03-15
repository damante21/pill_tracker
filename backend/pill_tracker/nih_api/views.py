from django.shortcuts import render, HttpResponse
import requests 
import json
import xmltodict


def nih_api_call(request):
    
    drug_name = 'lisinopril'
    
    response = requests.get(f'https://rxnav.nlm.nih.gov/REST/drugs.xml?name={drug_name}')
    
    if response.status_code == 200:
        xml = response.content
        xml_data = xmltodict.parse(xml)
        json_data = json.dumps(xml_data)
        # for i in json_data:
        #     print(i)
        return HttpResponse(json_data['rxnormdata'['drugGroup'][1]])
    # else:
    #     print(response.status_code)

print(nih_api_call('lisinopril'))