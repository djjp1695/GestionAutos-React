from http import HTTPStatus

from fastapi import APIRouter, HTTPException, Depends
from starlette.responses import JSONResponse, Response

from Models.Voiture import Voiture, VoitureCreate, VoitureOut
from Services.VoitureService import VoitureService
from Utilitaires.Token.Auth import obtenir_utilisateur_token

# Définition du nom par défaut de controlleur
ROUTER_NAME = "Voitures"


# Création du routeur pour les voitures avec un lien par défaut /api/NomControlleur
class VoitureRouter():
    def __init__(self, voitureService: VoitureService, apilink):
        # Initialisation du service d'interaction avec la BD pour la table Voitures
        self.__voiture_service = voitureService
        self.router = APIRouter(prefix=f"{apilink}/{ROUTER_NAME}",
                                dependencies=[Depends(obtenir_utilisateur_token)])
        # Ajouter les routes au routeur
        self.ajouter_routes();

    def ajouter_routes(self):
        # Fonction get par défaut, retourne toutes les voitures
        @self.router.get("/", response_model=list[VoitureOut])
        async def voitures():
            voitures = await self.__voiture_service.get_all()
            if not voitures:
                raise HTTPException(
                    status_code=HTTPStatus.NOT_FOUND,
                    detail="Aucune voiture présente"
                )
            return voitures

        # Fonction get avec des paramètres de recherche, retourne la voiture si trouvée
        # sinon None
        @self.router.get("/recherche", response_model=VoitureOut)
        async def voiture_marque_annee_modele_couleur(
                marque: str,
                annee: int,
                modele: str,
                couleur: str
        ):
            voiture = await self.__voiture_service.get_by_filtres(
                marque, annee, modele, couleur
            )
            if voiture is None:
                raise HTTPException(
                    status_code=HTTPStatus.NOT_FOUND,
                    detail="Voiture_Models not found"
                )
            return voiture

        # Fonction get avec un ID, retourne la voiture si trouvée
        # sinon None
        @self.router.get("/{id}", response_model=VoitureOut)
        async def voiture_by_id(id: int):
            voiture = await self.__voiture_service.get_by_id(id)
            if not voiture:
                raise HTTPException(
                    status_code=HTTPStatus.NOT_FOUND,
                    detail="Voiture_Models not found"
                )
            return voiture

        # Fonction qui supprime toutes les voitures dans la BD
        @self.router.delete("/all")
        async def delete_all():
            status = await self.__voiture_service.delete_all()
            if status:
                return Response(status_code=HTTPStatus.OK)
            else:
                return JSONResponse(status_code=HTTPStatus.BAD_REQUEST,
                                    content={"message": "Aucunes voitures présentes"})

        # Efface la voiture dont le ID correspond au paramètre saisi
        @self.router.delete("/{id}", response_class=JSONResponse)
        async def delete_voiture(id: int):
            status = await self.__voiture_service.delete_by_id(id)
            if status:
                return Response(status_code=HTTPStatus.OK)
            else:
                return JSONResponse(status_code=HTTPStatus.BAD_REQUEST,
                                    content={"message": "Voiture_Models not present"})

        # Mets à jour la voiture avec le ID fourni
        @self.router.put("/{id}")
        async def update_voiture(id: int, VoitureUpdate: VoitureCreate):
            voiture = await self.__voiture_service.update(id, Voiture(**VoitureUpdate.model_dump()))
            if voiture is None:
                raise HTTPException(
                    status_code=HTTPStatus.NOT_FOUND,
                    detail="Voiture_Models not present"
                )
            return voiture

        # Change le statut de la voiture, trouvée par ID, actif ou inactif
        @self.router.put("/{id}/status", response_model=VoitureOut)
        async def update_status(id: int, actif: bool):
            voiture = await self.__voiture_service.update_status(id, actif)
            if voiture is None:
                raise HTTPException(
                    status_code=HTTPStatus.NOT_FOUND,
                    detail="Voiture_Models not present"
                )
            return voiture

        # Crée une nouvelle voiture, selon les valeurs saisies à l'écran
        # Valide si une voiture avec les même valeurs n'existe pas déjà
        @self.router.post("/", response_model=Voiture)
        async def add_voiture(voitureCreate: VoitureCreate):
            voitureExistante = await self.__voiture_service.get_by_filtres(voitureCreate.marque, voitureCreate.annee,
                                                                           voitureCreate.modele, voitureCreate.couleur)
            if voitureExistante is not None:
                raise HTTPException(status_code=HTTPStatus.CONFLICT, detail="Voiture_Models existante")

            voiture = await (self.__voiture_service.add
                (
                Voiture(**voitureCreate.model_dump())
            ))
            if voiture is None:
                raise HTTPException(
                    status_code=HTTPStatus.BAD_REQUEST,
                    detail="Erreur de création d'une nouvelle voiture"
                )
            return voiture
