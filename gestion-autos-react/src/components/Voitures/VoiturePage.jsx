import VoitureService from '../../Services/VoitureService'
import VoitureCarte from './VoitureCarte';
import VoitureModalAjoutModification from '../Voitures/Modals/VoitureModalAjoutModification'
import { useEffect, useState } from "react";

function VoiturePage({ authService, GetRessource, lienAPI }) {
    const [voitures, setVoitures] = useState([]);
    const [voitureService, setVoitureService] = useState(null);
    const [showAjoutModification, setShowAjoutModification] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const voitureService = new VoitureService(lienAPI, authService);
            setVoitureService(voitureService);
            const data = await voitureService.getAll();
            setVoitures(data);
        }
        fetchData();
    }, []);

    const supprimerVoiture = async (id) => {
        const result = await voitureService.supprimerVoiture(id);
        if (result)
            setVoitures(voitures.filter(v => v.id !== id));
        return result != undefined;
    }

    const modifierActiveInactive = async (id, status) => {
        const result = await voitureService.updateVoitureStatus(id, status);
        if (result) {
            let voituresModifiees = voitures.map(v => {
                if (v.id == id)
                    v.actif = status;
                return v;
            });
            setVoitures(voituresModifiees); // Update the state with the modified list of cars
        }
        return result !== undefined;
    }

    const modifierVoiture = async (id, marque, modele, annee, couleur, actif) => {
        const result = await voitureService.updateVoiture(id, marque, modele, annee, couleur, actif);
        if (result) {
            let voituresModifiees = voitures.map(v => {
                if (v.id == id) {
                    v.marque = marque;
                    v.modele = modele;
                    v.annee = annee;
                    v.couleur = couleur;
                    v.actif = actif;
                }
                return v;
            });
            setVoitures(voituresModifiees);
            return result !== undefined;
        }
    }

    const ajouterVoiture = async (marque, modele, annee, couleur, actif) => {
        console.log(voitureService);
        const result = await voitureService.ajouterVoiture(marque, modele, annee, couleur, actif);
        if (result) {
            setVoitures(voitures => [...voitures, result]); // Update the state with the modified list of cars
            setShowAjoutModification(false);
        }
        return result !== undefined;
    }

    return voitureService && (
        <>
            <h2 className="liste-voitures">{GetRessource('listeVoitures')}</h2>
            <div id="content" className='container'>
                <div id="tiles-container" className='row'>
                    <button
                        onClick={() => { setShowAjoutModification(true) }} >
                        {GetRessource('ajoutVoiture')}
                    </button>
                    {voitures.length > 0 ? voitures.map((v) => (
                        <VoitureCarte
                            key={v.id}
                            voiture={v}
                            GetRessource={GetRessource}
                            Supprimer={supprimerVoiture}
                            ModificationActiveInactive={modifierActiveInactive}
                            ModifierVoiture={modifierVoiture}
                        />
                    )) : <h3 style={{ color: 'red' }}>{GetRessource('erreurRechercheVoitures')}</h3>}
                </div>
            </div >
            {
                showAjoutModification &&
                <VoitureModalAjoutModification AjoutVoiture={ajouterVoiture} GetRessource={GetRessource} OnClose={() => { setShowAjoutModification(false) }} />
            }
        </>
    )
}
export default VoiturePage;