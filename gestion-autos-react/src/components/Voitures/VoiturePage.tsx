import VoitureService from '../../Services/VoitureService'
import VoitureCarte from './VoitureCarte';
import { useEffect, useState } from "react";
import VoitureModalAjoutModification from './Modals/VoitureModalAjoutModification';

interface VoiturePageProps {
    GetToken: () => Promise<string | null>,
    GetRessource: (ressource: string) => string,
    lienAPI: string
}

function VoiturePage({ GetToken, GetRessource, lienAPI }: VoiturePageProps) {
    const [voitures, setVoitures] = useState<Voiture[]>([]);
    const [voitureService, setVoitureService] = useState<VoitureService | null>(null);
    const [showAjoutModification, setShowAjoutModification] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            const voitureService = new VoitureService(lienAPI, GetToken);
            setVoitureService(voitureService);
            const data = await voitureService.getAll();
            setVoitures(data);
        }
        fetchData();
    }, []);

    const supprimerVoiture = async (id: number): Promise<boolean> => {
        const result = await voitureService!.supprimerVoiture(id);
        if (result)
            setVoitures(voitures.filter(v => v.id !== id));
        return result != undefined;
    }

    const modifierActiveInactive = async (id: number, status: boolean): Promise<boolean> => {
        const result = await voitureService!.updateVoitureStatus(id, status);
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

    const modifierVoiture = async (id: number, marque: string, modele: string, annee: number, couleur: string, actif: boolean): Promise<boolean> => {
        const result = await voitureService!.updateVoiture(id, marque, modele, annee, couleur, actif);
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
        }
        return result !== undefined;
    }

    const ajouterVoiture = async (marque: string, modele: string, annee: number, couleur: string, actif: boolean): Promise<boolean> => {
        console.log(voitureService);
        const result = await voitureService!.ajouterVoiture(marque, modele, annee, couleur, actif);
        if (result) {
            setVoitures(voitures => [...voitures, result]); // Update the state with the modified list of cars
            setShowAjoutModification(false);
        }
        return result !== undefined;
    }

    return voitureService && (
        <>
            <h2 className="liste-voitures">{GetRessource('listeVoitures')}</h2>
            <div id="content" className='container-fluid'>
                <div id="tiles-container" className='row'>
                    <div>
                        <button
                            className="w-100"
                            onClick={() => { setShowAjoutModification(true) }} >
                            {GetRessource('ajoutVoiture')}
                        </button>
                    </div>
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