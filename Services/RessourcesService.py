class RessourceService:
    #Créer une variable avec le chemin et le nom du fichier de ressources
    def __init__(self, ressource_file):
        self.ressource_file = ressource_file

    #Lit le fichier de ressources et le retourne
    #Encodage UTF-8, important pour supporter les caractères accentués francophones
    async def get_ressources(self):
        with open(self.ressource_file, encoding='utf-8') as f:
            return f.read()
