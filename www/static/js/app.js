/*
Code Jquery pour manipulation des informations dans l'application web

Date de création : 8 février 2026
Date de modification : 16 février 2026
*/
import AuthService from './Services/AuthService.js';
///Inclusion du gestionnaire des voitures
import VoitureManager from './Managers/VoitureManager.js';
//Service pour récupérer les ressources multilingues
import RessourcesService from './Services/RessourcesService.js';
//Code Erreur = 404
const codeErreurNotFound = 404;
//Lien par défaut pour l'API
const lienAPI = '/api';
//Enumération des pages possibles (à développées)
const pages = { rendezVous: "rendezVous", voitures: "voitures", technicien: "technicien" };
//Mettre le français par défaut
const lang_defaut = 'fr';
//Pages "Voitures" par défaut
const pagePrincipale = pages.voitures;

//Nom d'utilisateur et mot de passe par défaut
const user = 'app';
const password = 'appWeb';

class App {

    constructor() {
        //Initialise le voitureManager
        this.voitureManager = new VoitureManager(lienAPI);
        this.authService = new AuthService(lienAPI, user, password);
    }
    async chargerPage(hash) {
        $('#tiles-container').empty();
        this.activerBoutonLangue();
        if (window.initialStatusCode == codeErreurNotFound) {
            this.afficherErreur404();

        }
        else {
            switch (hash) {
                case pages.voitures:
                    await this.voitureManager.afficherVoitures();
                    break;
            }
        }

        this.ajusterSelonLangue();
    }

    //Utilisation des classes CSS qui afficher les textes selon la langue sélectionnée
    ajusterSelonLangue() {
        $('#titrePrincipal').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'titrePrincipal'));
        $('#voitures').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'titreVoitures'));
        $('#rendezVous').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'titreRendezVous'));
        $('#technicien').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'titreTechniciens'));
        $('.modifier-voiture').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'boutonModifier'));
        $('.supprimer-voiture').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'boutonSupprimer'));
        $('.bouton-annuler').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'boutonAnnuler'));
        $('.bouton-confirmer').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'boutonConfirmer'));
        $('.marque-voiture').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'marqueVoiture'));
        $('#marqueVoitureInput').attr('placeholder', window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'validationMarque'));
        $('.modele-voiture').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'modeleVoiture'));
        $('#modeleVoitureInput').attr('placeholder', window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'validationModele'));
        $('.annee-voiture').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'anneeVoiture'));
        $('#anneeVoitureInput').attr('placeholder', window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'validationAnnee'));
        $('.couleur-voiture').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'couleurVoiture'));
        $('#couleurVoitureInput').attr('placeholder', window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'validationCouleur'));
        $('#labelVoitureActive').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'voitureActive'));
        $('#modalLabelModificationVoiture').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'modificationVoiture'));
        $('.bouton-ajout-voiture').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'ajoutVoiture'));
        $('.bouton-ajout-technicien').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'ajoutTechnicien'));
        $('.liste-voitures').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'listeVoitures'));
        $('.liste-rendezVous').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'listeRendezVous'));
        $('.liste-techniciens').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'listeTechniciens'));
        $('.bouton-rendre-active').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'rendreActive'));
        $('.bouton-rendre-inactive').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'rendreInactive'));
        $('.label-card-model').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'modeleVoiture'));
        $('.label-card-annee').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'anneeVoiture'));
        $('.label-card-couleur').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'couleurVoiture'));
        $('.label-card-actif').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'actifVoiture'));
        $('.card-actif-actif').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'voitureActive'));
        $('.card-actif-inactif').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'voitureInactive'));

        $('.retour-accueil').text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'pageNonTrouvée')).append
            (
                $('<p>')
                    .append(
                        $('<a>')
                            .attr('href', `/#${pagePrincipale}`)
                            .text(window.ressourcesService.getRessource(sessionStorage.getItem('lang'), 'retourAccueil'))
                    )
            );

    }

    //Mets le bouton de la langue actif, selon la langue sélectionnée
    activerBoutonLangue() {
        let langue = sessionStorage.getItem('lang');
        $('.btn-lang').removeClass('active');
        switch (langue) {
            case 'fr':
                $('.btn-fr').addClass('active')
                break;
            case 'en':
                $('.btn-en').addClass('active')
                break;
            case 'es':
                $('.btn-es').addClass('active')

        }
    }

    //Change la langue de l'application, lors de l'appuie sur un bouton de langue
    changerLangue(langue) {
        sessionStorage.setItem('lang', langue);
        this.activerBoutonLangue();
        this.ajusterSelonLangue();

    }


    afficherErreur404() {
        $('#tiles-container').empty();
        $('#contenuPages').attr('class', 'retour-accueil');
    }

    async generateToken() {
        let token = await this.authService.getToken();
        if (token != undefined)
            sessionStorage.setItem('token', token);
        else
            alert("Impossible de se connecter");
    }

    decodeToken(token) {
        var base64URL = token.split('.')[1];
        if (!base64URL) return null;
        var base64 = base64URL.replace(/-/g, '+').replace(/_/g, '/');
        try {
            return JSON.parse(atob(base64));
        }
        catch (e) {
            return null;
        }
    }

    async getToken() {
        let token = sessionStorage.getItem('token');
        if (token == null) {
            await this.generateToken();
        }
        else {
            var payload = this.decodeToken(token);
            if (!payload || !payload.exp)
                return null;
            var expDate = new Date(payload.exp * 1000);

            if (expDate < new Date()) {
                await this.generateToken();
                var newToken = sessionStorage.getItem('token');
                if (newToken) {
                    console.log(expDate);

                    token = newToken;
                    localStorage.setItem('token', token);
                }
                else
                    return null;
            }
        }
        return token;
    }
}


(async () => {
    //Crée un object APP 
    const app = new App();
    await app.generateToken();
    //Mets APP accessible dans toute l'application, variable globale
    window.app = app;



    //Si la langue n'est pas définie dans la session, on la définie en français par défaut
    if (!sessionStorage.getItem('lang'))
        sessionStorage.setItem('lang', lang_defaut);

    try {
        //Création du service de ressources et stockage des ressources multilingues dans
        //un variable globale
        let ressourcesService = new RessourcesService(lienAPI);
        await ressourcesService.fetchRessources();
        window.ressourcesService = ressourcesService;
    }
    catch (err) {
        //Affiche une erreur, si impossible de lire les ressources linguistiques
        console.error(err);
    }

    // Si aucun hash, on force un hash par défaut
    if (!window.location.hash && window.initialStatusCode != 404)
        window.location.hash = `#${pagePrincipale}`;

    async function updatePage() {
        let hash;
        if (window.initialStatusCode != codeErreurNotFound) {
            hash = window.location.hash.substring(1);
            $('a.pages').removeClass('active');
            $(`#${hash}`).addClass('active');
        }
        await app.chargerPage(hash);
    }

    await updatePage();

    $(window).on('hashchange', updatePage);
})();






