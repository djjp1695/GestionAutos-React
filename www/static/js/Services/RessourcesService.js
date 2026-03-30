//Toutes les fonctions de ce service respecte les normes REST

export default class RessourcesService {
    //Passage du lien de l'API par défaut
    constructor(lienAPI) {
        this.lienAPI = lienAPI;
    }

    //Récupére les ressources multilingues depuis l'API rest
    async fetchRessources() {
        try {
            const response = await fetch(`${this.lienAPI}/Ressources`,
                {
                    headers: {
                        "Authorization": `Bearer ${await window.app.getToken()}`
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
    getRessource(lang, ressource) {
        return this.ressources[lang][0][ressource];
    }


}