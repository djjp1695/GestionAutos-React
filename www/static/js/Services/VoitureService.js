//Toutes les fonctions de ce service respecte les normes REST
export default class VoitureService {

    //Passage du lien de l'API par défaut
    constructor(lienAPI) {
        this.lienAPI = lienAPI;
    }

    //Retourne une liste de toutes les voitures
    async getAll() {
        try {
            const response = await fetch(`${this.lienAPI}/Voitures`,
                {
                    headers: {
                        "Authorization": `Bearer ${await window.app.getToken()}`
                    }
                }
            )
            if (!response.ok)
                console.error(response.status);
            const data = await response.json();
            return data;
        }
        catch (err) {
            console.error(err);
        }
    }

    //Mets la voiture actif, inactif, selon son ID
    async updateVoitureStatus(id, actif) {
        try {
            const response = await fetch(`${this.lienAPI}/Voitures/${id}/status?actif=${actif}`,
                {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Bearer ${await window.app.getToken()}`
                    }
                })
            if (!response.ok)
                console.error(response.status);
            else {
                const data = await response.json();
                return data;
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    //Mets à jour les valeurs de la voiture, selon son ID
    async updateVoiture(id, marque, modele, annee, couleur, actif) {
        try {
            const response = await fetch(`${this.lienAPI}/Voitures/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${await window.app.getToken()}`
                    },
                    body: JSON.stringify({
                        marque: marque,
                        modele: modele,
                        annee: annee,
                        couleur: couleur,
                        actif: actif
                    })
                });
            if (!response.ok)
                console.error(response.status);
            else {
                const data = await response.json();
                return data;
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    //Ajoute une nouvelle voiture avec les valeurs saisies
    async ajouterVoiture(marque, modele, annee, couleur, actif) {
        try {
            const response = await fetch(`${this.lienAPI}/Voitures/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${await window.app.getToken()}`
                    },
                    body: JSON.stringify({
                        marque: marque,
                        modele: modele,
                        annee: annee,
                        couleur: couleur,
                        actif: actif
                    })
                });
            if (!response.ok)
                console.error(response.status);
            else {
                const data = await response.json();
                return data;
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    //Supprime un voiture selon son ID
    async supprimerVoiture(id) {
        try {
            const response = await fetch(`${this.lienAPI}/Voitures/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${await window.app.getToken()}`
                    }
                });
            if (!response.ok)
                console.error(response.status);
            else {
                const data = response.status;
                return data;
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}