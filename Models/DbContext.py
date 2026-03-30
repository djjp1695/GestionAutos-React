from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel.ext.asyncio.session import AsyncSession


#Création de l'engin pour connecter avec la BD SQLite
#Création d'un objet d'accèss aux sessions
class DbContext:
    def __init__(self, filename):
        connection_string = f"sqlite+aiosqlite:///{filename}";
        self.__engine = create_async_engine(connection_string, echo=True)
        self.__sessionMaker = sessionmaker(bind=self.__engine, class_=AsyncSession, expire_on_commit=False)

    #Retourne une session d'accèss à l'engin de la BD
    def get_session(self) -> AsyncSession:
        return self.__sessionMaker()
