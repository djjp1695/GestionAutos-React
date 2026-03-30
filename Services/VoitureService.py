from typing import List

from sqlmodel import select, delete

from Models.Voiture import Voiture


class VoitureService:
    #Utilise le context pour accèss à la BD
    def __init__(self, context):
        self.__context = context

    #Retourne toutes les voitures présentes dans la BD
    async def get_all(self) -> List[Voiture]:
        async with self.__context.get_session() as session:
            return (await session.scalars(
                select(Voiture))).all()

    #Retourne la voiture par son ID ou None
    async def get_by_id(self, id: int) -> Voiture:
        async with self.__context.get_session() as session:
            return await session.get(Voiture, id)
    #Retourne la voiture qui correspond aux valeurs demandées
    async def get_by_filtres(self, marque: str, annee: int, modele: str, couleur: str):
        async with self.__context.get_session() as session:
            return (await session.scalars(
                select(Voiture)
                .where(Voiture.marque.ilike(marque))
                .where(Voiture.annee == annee)
                .where(Voiture.modele.ilike(modele))
                .where(Voiture.couleur.ilike(couleur))
            )).first()
    #Ajoute la voiture dans la BD
    async def add(self, voiture: Voiture) -> Voiture:
        async with self.__context.get_session() as session:
            #Begin car on va "commit" la transaction
            async with session.begin():
                session.add(voiture)
        return voiture

    #Mets à la jour la voiture (active, inactive), selon son ID
    async def update_status(self, id: int, actif: bool) -> Voiture:
        async with self.__context.get_session() as session:
            async with session.begin():
                # Begin car on va "commit" la transaction
                voiture = await session.get(Voiture, id)
                if voiture is None:
                    return None
                voiture.actif = actif
        return voiture

    #Mets à jour les valeurs de la voiture, selon son ID
    async def update(self, id, newVoiture: Voiture) -> Voiture:
        async with self.__context.get_session() as session:
            # Begin car on va "commit" la transaction
            async with session.begin():
                voiture = await session.get(Voiture, id)
                if voiture is None:
                    return None
                voiture.modele = newVoiture.modele
                voiture.couleur = newVoiture.couleur
                voiture.marque = newVoiture.marque
                voiture.annee = newVoiture.annee
                voiture.actif = newVoiture.actif
        return voiture
    #Suppression de la voiture par son ID
    async def delete_by_id(self, id: int) -> dict:
        async with self.__context.get_session() as session:
            # Begin car on va "commit" la transaction
            async with session.begin():
                voiture = await session.get(Voiture, id)
                if voiture is None:
                    return False
                await session.delete(voiture)
                return True
    #Supprime toutes les voitures présentes dans la BD
    async def delete_all(self):
        async with self.__context.get_session() as session:
            async with session.begin():
                return (await session.execute(delete(Voiture))).rowcount > 0
