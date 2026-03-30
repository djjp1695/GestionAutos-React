from pydantic import BaseModel
from sqlmodel import SQLModel, Field


#Modèle des objets Voiture en provenance de la BD
class Voiture(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    marque: str
    modele: str
    annee: int
    couleur: str
    actif: bool = Field(default=True)

#Retourne l'objet Voiture converti en BaseModel, pour validation pour Pydantic
class VoitureOut(BaseModel):
    id: int
    marque: str
    modele: str
    annee: int
    couleur: str
    actif: bool

#Retourne l'objet Voiture avec les propriétés nécessaires lors de la création d'une nouvelle voiture
class VoitureCreate(BaseModel):
    marque: str
    modele: str
    annee: int
    couleur: str
    actif: bool = True
