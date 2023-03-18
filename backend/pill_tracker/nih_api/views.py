from django.shortcuts import render, HttpResponse
import requests 
import xml.etree.ElementTree as ET

    
class DrugInfo():
    
    def __init__(self, rxcui, name):
        self.rxcui = rxcui
        self.name = name
        
    def __str__(self):
        return f'{self.rxcui}, {self.name}'
            

class DrugInteraction():
    
    def __init__(self, drug_1, drug_2, description, severity):
        self.drug_1 = drug_1
        self.drug_2 = drug_2
        self.description = description
        self.severity = severity
        
    def __str__(self):
        return f'{self.drug_1}, {self.drug_2}, {self.description}, {self.severity}'
    

def api_calls(request):
        
        drug_info_arr = []
        drug_interaction_arr = []
        
        drug_name = 'lisinopril'
        drug_1 = '207106'
        drug_2 = '152923'
        drug_3 = '656659'
        
        drug_response = requests.get(f'https://rxnav.nlm.nih.gov/REST/drugs.xml?name={drug_name}')
        interaction_response = requests.get(f'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis={drug_1}+{drug_2}+{drug_3}')
        response = interaction_response.json()
 
        for x in response['fullInteractionTypeGroup'][1]['fullInteractionType']:
            # print(x)
            drug_1 = x['minConcept'][0]['rxcui']
            drug_2 = x['minConcept'][1]['rxcui']
            description = x['interactionPair'][0]['description']
            severity = x['interactionPair'][0]['severity']
            drug_interaction_arr.append(DrugInteraction(drug_1, drug_2, description, severity))
            # print(f"interactionPair: {x['interactionPair'][0]['description']}")
            # print(f"minConcept: {x['minConcept'][0]}")
            # print(f"minConcept: {x['minConcept'][1]}")
 
     
        print(response)
        # print(response['fullInteractionTypeGroup'])
        # print(drug_interaction_arr[10])

        if drug_response.status_code == 200 and interaction_response.status_code == 200:
        
            drug_root = ET.fromstring(drug_response.content)
            for rxcui in drug_root.iter('rxcui'):
                for name in drug_root.iter('name'):
                    drug_info_arr.append(DrugInfo(rxcui.text, name.text))

            return HttpResponse(response['fullInteractionTypeGroup'])

        else:
            print(f'drug_response: {drug_response.status_code}, interaction_response: {interaction_response.status_code}')