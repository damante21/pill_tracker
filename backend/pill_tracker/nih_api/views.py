from django.shortcuts import render, HttpResponse
import requests 
import json
import xmltodict
import xml.etree.ElementTree as ET
from copy import copy


# def nih_api_call(request):
    
class DrugInfo():
    
    def __init__(self, rxcui, name, description, severity):
        self.rxcui = rxcui
        self.name = name
        self.description = description
        self.severity = severity
        
    def __str__(self):
        return f'{self.rxcui}, {self.name}, {self.description}, {self.severity}'

    def api_calls(request):
        
        drug_obj = {}
        drug_interaction_obj = {}
        
        drug_name = 'lisinopril'
        
        drug_response = requests.get(f'https://rxnav.nlm.nih.gov/REST/drugs.xml?name={drug_name}')
        interaction_response = requests.get('https://rxnav.nlm.nih.gov/REST/interaction/list.xml?rxcuis=207106+152923+656659')

        if drug_response.status_code == 200 and interaction_response.status_code == 200:
        
            # drug_root = ET.fromstring(drug_response.content)
            # for rxcui in drug_root.iter('rxcui'):
            #     drug_obj[rxcui.text] = {}
            #     for name in drug_root.iter('name'):
            #         drug_obj[rxcui.text]['name'] = name.text
        
            # interaction_root = ET.fromstring(interaction_response.content)
            # for interactionPair in interaction_root.iter('name'):
            #     drug_obj[interactionPair.text] = interactionPair.text
            #     for description in interaction_root.iter('description'):
            #         drug_obj[interactionPair.text] = drug_interaction_obj[description.text]
                    
            a = DrugInfo(152923, 'simvastatin 40 MG Oral Tablet [Zocor]', 'The metabolism of Simvastatin can be decreased when combined with Fluconazole.', 'N/A')

            print(a)
            
            return HttpResponse(interaction_response.content)

        else:
            print(f'drug_response: {drug_response.status_code}, interaction_response: {interaction_response.status_code}')
            

a = DrugInfo(152923, 'simvastatin 40 MG Oral Tablet [Zocor]', 'The metabolism of Simvastatin can be decreased when combined with Fluconazole.', 'N/A')

print(a)