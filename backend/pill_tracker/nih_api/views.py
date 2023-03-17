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
        
        drugs_arr = []
        drug_obj = {}
        
        drug_name = 'lisinopril'
        drug_1 = '207106'
        drug_2 = '152923'
        drug_3 = '656659'
        
        drug_response = requests.get(f'https://rxnav.nlm.nih.gov/REST/drugs.xml?name={drug_name}')
        interaction_response = requests.get(f'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis={drug_1}+{drug_2}+{drug_3}')
        response = interaction_response.json()
 
        for x in response['fullInteractionTypeGroup'][1]['fullInteractionType']:
            # print(x['interactionPair'][0])
            # print(x['minConcept'][0])
            # print(x['minConcept'][1])
            
            pass
     
        # print(response['fullInteractionTypeGroup'])

        if drug_response.status_code == 200 and interaction_response.status_code == 200:
        
            drug_root = ET.fromstring(drug_response.content)
            for rxcui in drug_root.iter('rxcui'):
                drug_obj[rxcui.text] = rxcui.text
                for name in drug_root.iter('name'):
                    drug_obj[rxcui.text] = name.text
                    drugs_arr.append(DrugInfo(rxcui.text, name.text))
            print(drug_obj)
            # interaction_root = ET.fromstring(interaction_response.content)


            # for child in interaction_root.iter('name'):
            #     print(child.text)
            #     drug_interaction_arr.append(interactionPair.tag)
            #     # drug_obj[interactionPair.text] = interactionPair.text
            #     for description in interaction_root.iter('description'):
            #         pass
            #         # drug_obj[interactionPair.text] = drug_interaction_obj[description.text]
                    
            # for x in drug_interaction_arr:
            # for z in drug_obj:
            #     print(z)
            return HttpResponse(response['fullInteractionTypeGroup'][1])

        else:
            print(f'drug_response: {drug_response.status_code}, interaction_response: {interaction_response.status_code}')