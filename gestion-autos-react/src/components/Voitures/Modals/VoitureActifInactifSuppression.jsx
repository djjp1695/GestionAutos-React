import { useState } from "react";
function VoitureActifInactifSuppression({ Suppression, Voiture, GetRessource, Supprimer, OnClose, ModificationActiveInactive }) {
    const [erreur, setErreur] = useState("");
    return (
        <div id="modal-window-voiture" className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {
                                Suppression
                                    ? GetRessource('suppresionVoiture')
                                    : GetRessource('rendreVoiture') + ' ' +
                                    (Voiture.actif ? GetRessource('voitureInactive') : GetRessource('voitureActive')).toLowerCase()
                            }

                        </h5>
                        <button type="button" className="btn-close" onClick={OnClose}></button>
                    </div>
                    {!erreur ?
                        <div className="modal-body">
                            <p>
                                {GetRessource('marqueVoiture') + ' : ' + Voiture.marque}
                            </p>
                            <p>
                                {GetRessource('modeleVoiture') + ' : ' + Voiture.modele}
                            </p>
                            <p>
                                {GetRessource('anneeVoiture') + ' : ' + Voiture.annee}
                            </p>
                            <p>
                                {GetRessource('couleurVoiture') + ' : ' + Voiture.couleur}
                            </p>
                        </div>
                        :
                        <div className="modal-body">
                            <p>{erreur}</p>
                        </div>
                    }
                    <div className="modal-footer">
                        {!erreur && (
                            <button id="boutonConfirmer"
                                type="button"
                                className="btn btn-primary"
                                onClick={async () => {
                                    Suppression
                                        ? !(await Supprimer(Voiture.id)) ? setErreur("Erreur lors de la suppression") : OnClose()
                                        : !(await ModificationActiveInactive(Voiture.id, !Voiture.actif)) ? setErreur("Erreur lors du changement de statut") : OnClose()
                                }}>
                                {GetRessource('boutonConfirmer')}
                            </button>
                        )}
                        <button type="button" className=" btn btn-secondary" onClick={OnClose}>{!erreur ? GetRessource('boutonAnnuler') : 'Ok'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VoitureActifInactifSuppression;