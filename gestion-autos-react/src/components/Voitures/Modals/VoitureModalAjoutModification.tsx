import { useEffect, useState } from "react";

interface VoitureModalAjoutModificationProps {
    GetRessource: (key: string) => string;
    OnClose: () => void;
    Voiture?: Voiture | null;
    AjoutVoiture?: (marque: string, modele: string, annee: number, couleur: string, actif: boolean) => Promise<boolean>;
    ModificationVoiture?: (id: number, marque: string, modele: string, annee: number, couleur: string, actif: boolean) => Promise<boolean>;

}

const VoitureModalAjoutModification = ({ GetRessource, OnClose, Voiture, AjoutVoiture, ModificationVoiture }: VoitureModalAjoutModificationProps) => {
    const [marque, setMarque] = useState<string>('');
    const [modele, setModele] = useState<string>('');
    const [annee, setAnnee] = useState<number>(0);
    const [couleur, setCouleur] = useState<string>('');
    const [actif, setActif] = useState<boolean>(false);

    useEffect(() => {
        if (Voiture) {
            setMarque(Voiture.marque || '');
            setModele(Voiture.modele || '');
            setAnnee(Voiture.annee || 0);
            setCouleur(Voiture.couleur || '');
            setActif(Voiture.actif || false);
        }
    }, [Voiture]);

    return (
        <div id="modal-window-modification-voiture" className="modal fade show d-block" tabIndex={-1} aria-labelledby="modalLabel">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title modification-voiture" id="modalLabelModificationVoiture">
                            {!Voiture ? GetRessource('ajoutVoiture') : GetRessource('modificationVoiture')}
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={OnClose}></button>
                    </div>

                    <form
                        id="updateVoitureForm"
                        onSubmit={
                            async (e) => {
                                e.preventDefault();
                                if (Voiture == null)
                                    await AjoutVoiture(marque, modele, annee, couleur, actif);
                                else
                                    await ModificationVoiture(Voiture.id!, marque, modele, annee, couleur, actif)
                                OnClose();
                            }
                        }
                    >
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="marqueVoitureInput" className="marque-voiture form-label">{GetRessource('marqueVoiture')}</label>
                                <input type="text" className="form-control" id="marqueVoitureInput" required
                                    placeholder={GetRessource('validationMarque')}
                                    value={marque}
                                    onChange={(e) => { setMarque(e.target.value) }}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="modeleVoitureInput" className="modele-voiture form-label">{GetRessource('modeleVoiture')}</label>
                                <input type="text" className="form-control" id="modeleVoitureInput" required
                                    placeholder={GetRessource('validationModele')}
                                    value={modele}
                                    onChange={(e) => { setModele(e.target.value) }} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="anneeVoitureInput" className="annee-voiture form-label">{GetRessource('anneeVoiture')}</label>
                                <input type="number" className="form-control" id="anneeVoitureInput" required
                                    placeholder={GetRessource('validationAnnee')}
                                    value={annee}
                                    onChange={(e) => { setAnnee(Number(e.target.value)) }} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="couleurVoitureInput" className="couleur-voiture form-label">{GetRessource('couleurVoiture')}</label>
                                <input type="text" className="form-control" id="couleurVoitureInput" required
                                    placeholder={GetRessource('validationCouleur')}
                                    value={couleur}
                                    onChange={(e) => { setCouleur(e.target.value) }} />
                            </div>

                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="actifVoiture"
                                    checked={actif}
                                    onChange={(e) => { setActif(e.target.checked) }}
                                />
                                <label className="form-check-label" id="labelVoitureActive" htmlFor="actifVoiture">{GetRessource('voitureActive')}</label>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="submit"
                                id="boutonConfirmer"
                                className="bouton-confirmer btn btn-primary"
                            >{GetRessource('boutonConfirmer')}
                            </button>
                            <button type="button" className="bouton-annuler btn btn-secondary" data-bs-dismiss="modal" onClick={OnClose}>{GetRessource('boutonAnnuler')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default VoitureModalAjoutModification;