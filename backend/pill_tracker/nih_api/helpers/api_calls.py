from django.shortcuts import HttpResponse
from rest_framework.response import Response
import xml.etree.ElementTree as ET
import requests
import json
from ..classes.drug_classes import *


def api_calls(request):
        
    drug_info_arr = []
    drug_interaction_arr = []
    interaction_pairs = []
    
    drug_name = 'lisinopril'
    drug_1 = '207106'
    drug_2 = '152923'
    drug_3 = '656659'
    
    drug_response = requests.get(f'https://rxnav.nlm.nih.gov/REST/drugs.xml?name={drug_name}')
    interaction_response = requests.get(f'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis={drug_1}+{drug_2}+{drug_3}')
    response = interaction_response.json()
    
    if drug_response.status_code == 200 and interaction_response.status_code == 200:
        
        # a = json.loads(interaction_response.content)
        # print(a['fullInteractionTypeGroup'][0]['fullInteractionType'][1]['interactionPair'])
        
        drug_root = ET.fromstring(drug_response.content)
        
        for rxcui in drug_root.iter('rxcui'):
            for name in drug_root.iter('name'):
                drug_info_arr.append(DrugInfo(rxcui.text, name.text))

        for interaction_group in response['fullInteractionTypeGroup']:
            for interaction_type in interaction_group['fullInteractionType']:
                for interaction in interaction_type['interactionPair']:
                    interaction_pairs.append(interaction)

        for pair in interaction_pairs:
            drug_1 = pair['interactionConcept'][0]['minConceptItem']['rxcui']
            drug_2 = pair['interactionConcept'][1]['minConceptItem']['rxcui']
            description = pair['description']
            severity = pair['severity']
            drug_interaction_arr.append(DrugInteraction(drug_1, drug_2, description, severity))
        
        result = json.dumps({'drug_info' : drug_info_arr,
                             'drug_interactions' : drug_interaction_arr}, default=vars)

        return HttpResponse(result)

    else:
        print(f'drug_response: {drug_response.status_code}, interaction_response: {interaction_response.status_code}')
        