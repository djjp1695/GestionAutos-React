import { useState } from "react";
import VoitureModalAjoutModification from "./Modals/VoitureModalAjoutModification";
import VoitureActifInactifSuppression from "./Modals/VoitureActifInactifSuppression";

interface CardVoitureProps {
    voiture: Voiture;
    GetRessource: (key: string) => string;
    Supprimer: (id: number) => Promise<boolean>;
    ModificationActiveInactive: (id: number, status: boolean) => Promise<boolean>;
    ModifierVoiture: (id: number, marque: string, modele: string, annee: number, couleur: string, actif: boolean) => Promise<boolean>;
}

function CardVoiture({ voiture, GetRessource, Supprimer, ModificationActiveInactive, ModifierVoiture }: CardVoitureProps) {
    const [showModalActifInactifSuppression, setShowModalActifInactifSuppression] = useState<boolean>(false);
    const [estSuppression, setEstSuppression] = useState<boolean>(false);
    const [showModalModification, setShowModalModification] = useState<boolean>(false);

    return (
        <>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div className="card voiture-tile h-100 w-100">
                    <div className="card-body">
                        <h5 className="card-title">{voiture.marque}</h5>
                        <p>
                            <label className="label-card-model">{GetRessource('modeleVoiture')} </label>
                            {' '}: {' '}
                            <label id="card-modele">{voiture.modele} </label>
                        </p>
                        <p>
                            <label className="label-card-annee">{GetRessource('anneeVoiture')}</label>
                            {' '}: {' '}
                            <label id="card-annee">{voiture.annee}</label>
                        </p>
                        <p>
                            <label className="label-card-couleur">{GetRessource('couleurVoiture')}</label>
                            {' '}: {' '}
                            <label id="card-couleur">{voiture.couleur}</label>
                        </p>
                        <p>
                            <label className="label-card-actif">{GetRessource('actifVoiture')}</label>
                            {' '}: {' '}
                            <label id="card-actif" className={voiture.actif ? 'card-actif-actif' : 'card-actif-inactif'}>
                                {voiture.actif ? GetRessource('actifVoiture') : GetRessource('voitureInactive')}
                            </label>
                        </p>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setShowModalModification(true)}
                        >
                            {GetRessource('boutonModifier')}
                        </button>
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => { setEstSuppression(false); setShowModalActifInactifSuppression(true); }}
                        >
                            {voiture.actif ? GetRessource('rendreInactive') : GetRessource('rendreActive')}
                        </button>
                        <button
                            type="button"
                            className="supprimer-voiture btn btn-danger"
                            onClick={() => { setEstSuppression(true); setShowModalActifInactifSuppression(true); }}
                        >
                            {GetRessource('boutonSupprimer')}
                        </button>
                    </div>
                </div>
            </div>

            {showModalActifInactifSuppression && (
                <VoitureActifInactifSuppression
                    Voiture={voiture}
                    GetRessource={GetRessource}
                    Suppression={estSuppression}
                    Supprimer={Supprimer}
                    ModificationActiveInactive={ModificationActiveInactive}
                    OnClose={() => setShowModalActifInactifSuppression(false)}
                />
            )}

            {showModalModification && (
                <VoitureModalAjoutModification
                    ModificationVoiture={ModifierVoiture}
                    OnClose={() => setShowModalModification(false)}
                    Voiture={voiture}
                    GetRessource={GetRessource}
                />
            )}
        </>
    );
}

export default CardVoiture;