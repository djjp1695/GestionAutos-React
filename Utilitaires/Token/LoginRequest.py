from datetime import timedelta

from pydantic import BaseModel

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
access_token_expires_in = timedelta(minutes=30)
class LoginRequest(BaseModel):
    username: str
    password: str