from django.shortcuts import HttpResponse
import xml.etree.ElementTree as ET
import requests
import json
from ..classes.drug_classes import *
from ..models import *


def get_med_names(request, user_id):
        
    # a = requests.get('http://127.0.0.1:5173/api/med')
    # print(a.content)
    # med_names_arr = []
    med_names_obj = {}
    # print(user_id)
    med_names = UserMedication.objects.filter(user_id=user_id).values()

    for name in med_names:
        # med_names_arr.append(name['medication_name'])
        med_names_obj[name['rxcui']] = name['medication_name']

    return med_names_obj


def fda_api_call(request, user_id):
    
    drug_names_arr = []
    response_arr = []
    
    med_names_arr = get_med_names(request, user_id)
    
    for name in med_names_arr:
        
        drug_names_arr.append(med_names_arr[name].split(' ', 1)[0])
    
    for drug_name in drug_names_arr:
        
        response = requests.get(f'https://api.fda.gov/drug/label.json?search=openfda.brand_name:{drug_name}&limit=10')
        fda_call = response.json()
        try:
            result = fda_call['results'][0]['boxed_warning']
            response_arr.append(DrugSideEffects(drug_name, result))
        except:
            continue
    # print(fda_call['results'][0]['boxed_warning'])
        
        # response_arr.append(DrugSideEffects(drug_name, fda_call))
    
    return response_arr
    # print(fda_call['results'][0]['boxed_warning'])
    # return fda_call['results'][0]['boxed_warning']
    

def interactions_api_call(request, user_id):
    
    fda_call_arr = fda_api_call(request, user_id)

    # arrays for drug info api call(s)
    rxcui_arr = []
    names_arr = []
    med_names_arr = get_med_names(request, user_id)
    
    for info in med_names_arr:
        rxcui_arr.append(info)
        names_arr.append(med_names_arr[info].split(' ', 1)[0])

    # drug_response_arr = []
    # drug_info_arr = []
    drug_interaction_arr = []
    
    description_arr = []
    
    #arrays for drug interaction api call(s)
    interaction_api_call = 'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis='
    interaction_pairs = []
    counter = 0
 
    # for name in names_arr:
    #     drug_name = name
    #     print(name)
        
    #     drug_response = requests.get(f'https://api.fda.gov/drug/label.json?search=openfda.brand_name:{drug_name}&limit=10')
        
    #     # if drug_response.status_code == 200:
    #     print(drug_response.content)
 
 
    # for name in med_names_arr:
        
    #     drug_name = name
    
    #     drug_response = requests.get(f'https://rxnav.nlm.nih.gov/REST/drugs.xml?name={drug_name}')
        
    #     if drug_response.status_code == 200:
            
    #         drug_root = ET.fromstring(drug_response.content)
    #         for rxcui in drug_root.iter('rxcui'):
    #             for name in drug_root.iter('name'):
    #                 if name.text != None and name.text not in names_arr and rxcui.text not in rxcui_arr :
    #                     drug_name = name.text.split(' ', 1)
    #                     if drug_name[0] not in names_arr:
    #                         names_arr.append(drug_name[0])
    #                         rxcui_arr.append(rxcui.text)
    #                         drug_info_arr.append(DrugInfo(rxcui.text, name.text))
    #     else:
    #         print(f'drug_response: {drug_response.status_code}')  
                      
    for rxcui in rxcui_arr:
        
        if counter == 0:
            interaction_api_call += f'{str(rxcui)}'
            counter += 1
        elif counter < 50: 
            interaction_api_call += f'+{str(rxcui)}'
            counter += 1
        else:
            break
    if len(names_arr) > 1:
        
        interaction_response = requests.get(f'{interaction_api_call}')
        response = interaction_response.json()
        
        if interaction_response.status_code == 200:
            try:
                for interaction_group in response['fullInteractionTypeGroup']:
                    for interaction_type in interaction_group['fullInteractionType']:
                        for interaction in interaction_type['interactionPair']:
                            interaction_pairs.append(interaction)

                for pair in interaction_pairs:
                    drug_1 = pair['interactionConcept'][0]['minConceptItem']['rxcui']
                    drug_1_name = pair['interactionConcept'][0]['minConceptItem']['name']
                    drug_2 = pair['interactionConcept'][1]['minConceptItem']['rxcui']
                    drug_2_name = pair['interactionConcept'][1]['minConceptItem']['name']
                    description = pair['description']
                    severity = pair['severity']
                    if description not in description_arr:
                        drug_interaction_arr.append(DrugInteraction(drug_1, drug_1_name, drug_2, drug_2_name, description, severity))
                        description_arr.append(description)
                
                result = json.dumps({'drug_interactions' : drug_interaction_arr,
                                    'drug_side_effects' : fda_call_arr}, default=vars)
                
                return HttpResponse(result)
            
            except:
                return

        else:
            print(f'interaction_response: {interaction_response.status_code}')
    else:
        return json.dumps({'drug_side_effects' : fda_call_arr}, default=vars)
        
# instead of multiple for loops, this may work. need to refactor when there is time.
# a = json.loads(interaction_response.content)

