from datetime import timedelta, datetime, timezone
import jwt

from Utilitaires.Token.LoginRequest import access_token_expires_in, SECRET_KEY, ALGORITHM

fake_users_db = [
    {
        "username": "app",
        "password": "appWeb"
    }
]


class AuthentificationService:
    def authentificate(self, username, password):
        for user in fake_users_db:
            if user["username"] == username and user["password"] == password:
                return user
        return None

    def generate_token(self, user):
        token = self.__create_access_token(
            data={"sub": user}, expires_delta=access_token_expires_in)
        if token:
            return token
        return None

    def __create_access_token(self, data: dict, expires_delta: timedelta | None = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
