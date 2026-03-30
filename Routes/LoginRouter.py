from fastapi import APIRouter
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.testing.pickleable import User
from starlette.exceptions import HTTPException

from Utilitaires.Token.LoginRequest import LoginRequest
from Services.AuthentificationService import AuthentificationService

ROUTER_NAME = "Login"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class LoginRouter:
    def __init__(self, apiLink: str):
        self.router = APIRouter(prefix=f"{apiLink}/Login")
        self.authentificationService = AuthentificationService()
        self.ajouter_routes()

    def ajouter_routes(self):
        @self.router.post("/")
        def login(loginRequest: LoginRequest):
            if self.authentificationService.authentificate(loginRequest.username, loginRequest.password):
                token = self.authentificationService.generate_token(loginRequest.username)
                if token:
                    return {"token": token}
                else:
                    raise HTTPException(status_code=400, detail="Incorrect username or password")

            else:
                raise HTTPException(status_code=400, detail="Incorrect username or password")
