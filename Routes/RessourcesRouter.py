import json
from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse

from Utilitaires.Token.Auth import obtenir_utilisateur_token
from Services.RessourcesService import RessourceService

# Définition du nom par défaut de controlleur
ROUTER_NAME = 'Ressources'


# Création du routeur pour les ressources avec un lien par défaut /api/NomControlleur
class RessourcesRouter:
    def __init__(self, ressources_service: RessourceService, apiLink: str):
        self.router = APIRouter(prefix=f"{apiLink}/{ROUTER_NAME}", dependencies=[Depends(obtenir_utilisateur_token)])
        # Initialisation du service de lecture des ressources
        self.__ressources_service = ressources_service
        # Ajouter les routes au routeur
        self.ajouter_routes()

    def ajouter_routes(self):
        # Route get par défaut, retourne le fichier des ressources sous format JSON
        @self.router.get("/", response_class=JSONResponse)
        async def index(current_user: str = Depends(obtenir_utilisateur_token)):
            return json.loads(await  self.__ressources_service.get_ressources())
