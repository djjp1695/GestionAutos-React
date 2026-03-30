"""
Programme créer avec le framework FastAPI (REST API), qui permet de gérer une BD SQlite
et afficher un front-end en HTML avec Javascript et Jquery

Date de création : 8 février 2026
Date de modification : 16 février 2026
"""
from starlette.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi import FastAPI, HTTPException, Request
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates

from Models.DbContext import DbContext
from Routes.LoginRouter import LoginRouter
from Routes.RessourcesRouter import RessourcesRouter
from Routes.VoitureRouter import VoitureRouter
from Services.RessourcesService import RessourceService
from Services.VoitureService import VoitureService

# Emplacement et nom du fichier SQLLite pour la BD
DB_FILENAME = './Database/db.sqlite'
#Emplacement et nom du fichier de ressources linguistiques
RESSOURCE_FILENAME = 'Ressources/ressources.json'
#Lien par défaut pour accéder à l'API pour les ressources et les fonctions
#de CRUD pour les voitures
API_LINK = "/api"

#Connecteur pour la BD
dbContext = DbContext(DB_FILENAME)
#Initialisation de FastAPI
app = FastAPI()

#Inclusion du router pour les ressources et les voitures
app.include_router(VoitureRouter(VoitureService(dbContext), API_LINK).router)
app.include_router(RessourcesRouter(RessourceService(RESSOURCE_FILENAME), API_LINK).router)
app.include_router(LoginRouter(API_LINK).router)

#Ajout des fichiers "Static" au serveur web Uvicorn
app.mount("/static", StaticFiles(directory="www/static"), name="static")

#Lecture des fichiers HTML
templates = Jinja2Templates(directory="www")


#Retourne index.html pour la fonction GET du root
@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse(request=request, name="index.html")


#Retourne une erreur 404, si la page demandée est inexistante.
#S'il s'agit d'un appel de l'API inexistantant, retourne un message JSON d'erreur à la place
@app.exception_handler(StarletteHTTPException)
async def unicorn_exception_handler(request: Request, exc: StarletteHTTPException):
    if exc.status_code == 404 and API_LINK not in request.url.path:  # pass to frontend
        return templates.TemplateResponse(name="index.html", request=request, context={"initial_status_code": 404},
                                          status_code=404)
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )
