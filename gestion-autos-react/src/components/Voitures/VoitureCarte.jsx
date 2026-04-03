import { useState } from "react";
import VoitureActifInactifSuppression from './Modals/VoitureActifInactifSuppression'
import VoitureModalAjoutModification from "./Modals/VoitureModalAjoutModification";

function CardVoiture({ voiture, GetRessource, Supprimer, ModificationActiveInactive, ModifierVoiture }) {
    const [showModalActifInactifSuppression, setShowModalActifInactifSuppression] = useState(false);
    const [estSuppression, setEstSuppression] = useState(false);
    const [showModalModification, setShowModalModification] = useState(false);

    return (
        <>
            <div className="card voiture-tile" style={{ width: '18rem' }}>
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
                            {
                                voiture.actif ? GetRessource('actifVoiture') : GetRessource('voitureInactive')
                            }
                        </label>
                    </p>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => { setShowModalModification(true) }}
                    >
                        {GetRessource('boutonModifier')}
                    </button>
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => { setEstSuppression(false); setShowModalActifInactifSuppression(true) }}>
                        {
                            voiture.actif
                                ? GetRessource('rendreInactive')
                                : GetRessource('rendreActive')
                        }
                    </button>
                    <button
                        type="button"
                        className="supprimer-voiture btn btn-danger"
                        onClick={() => { setEstSuppression(true); setShowModalActifInactifSuppression(true) }}
                    >{GetRessource('boutonSupprimer')}</button>
                </div>
            </div >
            {
                showModalActifInactifSuppression &&
                (
                    <VoitureActifInactifSuppression
                        Voiture={voiture}
                        GetRessource={GetRessource}
                        Suppression={estSuppression}
                        Supprimer={Supprimer}
                        ModificationActiveInactive={ModificationActiveInactive}
                        OnClose={() => setShowModalActifInactifSuppression(false)}
                    />
                )
            }
            {
                showModalModification &&
                (
                    <VoitureModalAjoutModification ModificationVoiture={ModifierVoiture} OnClose={() => setShowModalModification(false)} Voiture={voiture} GetRessource={GetRessource} />
                )
            }
        </>
    )
}
export default CardVoiture;