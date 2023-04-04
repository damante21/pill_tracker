
class DrugInfo():
    
    def __init__(self, rxcui, name):
        self.rxcui = rxcui
        self.name = name
        
    def __str__(self):
        return f'{self.rxcui}, {self.name}'
            

class DrugInteraction():
    
    def __init__(self, drug_1, drug_1_name, drug_2, drug_2_name, description, severity):
        self.drug_1 = drug_1
        self.drug_1_name =  drug_1_name
        self.drug_2 = drug_2
        self.drug_2_name =  drug_2_name
        self.description = description
        self.severity = severity
        
    def __str__(self):
        return f'{self.drug_1}, {self.drug_2}, {self.description}, {self.severity}'
    
    
class DrugSideEffects():
    def __init__(self, drug_name, side_effects):
        self.drug_name = drug_name
        self.side_effects = side_effects
    
    def __str__(self):
        return f'{self.drug_name}, {self.side_effects}'