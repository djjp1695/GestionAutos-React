//Toutes les fonctions de ce service respecte les normes REST


export default class RessourcesService {
    private lienAPI: string;
    private getToken: () => Promise<string | null>;
    private ressources: any = {};
    //Passage du lien de l'API par défaut
    constructor(lienAPI: string, getToken: () => Promise<string | null>) {
        this.lienAPI = lienAPI;
        this.getToken = getToken;
    }

    //Récupére les ressources multilingues depuis l'API rest
    async fetchRessources() {
        try {
            const response = await fetch(`${this.lienAPI}/Ressources/`,
                {
                    headers: {
                        "Authorization": `Bearer ${await this.getToken()!}`
                    }
                }
            )
            if (!response.ok) {
                console.error(response.status);
                throw new Error(`Failed to fetch resources: ${response.status}`);
            }

            const data = await response.json();
            this.ressources = data;
        }
        catch (err) {
            console.error(err);
        }
    }

    //Retourne la valeur de la ressource 
    // selon le nom de ressource et la langue de l'application
    getRessource(lang: string, ressource: string) {
        return this.ressources[lang][0][ressource];
    }


}