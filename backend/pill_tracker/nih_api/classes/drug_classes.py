
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