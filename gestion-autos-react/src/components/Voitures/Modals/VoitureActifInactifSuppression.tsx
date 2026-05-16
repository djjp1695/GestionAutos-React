import { useEffect, useState } from "react";
import { ajouterFonctionEscape } from "../../../Util";
import { createPortal } from "react-dom";

interface VoitureActifInactifSuppressionProps {
    Suppression: boolean;
    Voiture: Voiture;
    GetRessource: (ressource: string) => string;
    Supprimer: (id: number) => Promise<boolean>;
    OnClose: () => void;
    ModificationActiveInactive: (id: number, status: boolean) => Promise<boolean>;
}

function VoitureActifInactifSuppression({
    Suppression,
    Voiture,
    GetRessource,
    Supprimer,
    OnClose,
    ModificationActiveInactive
}: VoitureActifInactifSuppressionProps) {

    const [erreur, setErreur] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);

    // Fade IN Bootstrap
    useEffect(() => {
        requestAnimationFrame(() => {
            setShow(true);
        });
    }, []);

    // ESC clavier
    useEffect(() => {
        ajouterFonctionEscape(fermerModal);
    }, []);

    // Fade OUT Bootstrap
    const fermerModal = () => {
        setShow(false);

        setTimeout(() => {
            OnClose();
        }, 300);
    };

    return createPortal(
        <>
            <div
                id="modal-window-voiture"
                className={`modal fade ${show ? 'show' : ''} d-block`}
                tabIndex={-1}
                aria-modal="true"
                role="dialog"
            >
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title">
                                {
                                    Suppression
                                        ? GetRessource('suppresionVoiture')
                                        : GetRessource('rendreVoiture') + ' ' +
                                        (
                                            Voiture.actif
                                                ? GetRessource('voitureInactive')
                                                : GetRessource('voitureActive')
                                        ).toLowerCase()
                                }
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={fermerModal}
                            ></button>

                        </div>

                        {
                            !erreur ? (
                                <div className="modal-body">

                                    <p>
                                        {GetRessource('marqueVoiture')} : {Voiture.marque}
                                    </p>

                                    <p>
                                        {GetRessource('modeleVoiture')} : {Voiture.modele}
                                    </p>

                                    <p>
                                        {GetRessource('anneeVoiture')} : {Voiture.annee}
                                    </p>

                                    <p>
                                        {GetRessource('couleurVoiture')} : {Voiture.couleur}
                                    </p>

                                </div>
                            ) : (
                                <div className="modal-body">
                                    <p>{erreur}</p>
                                </div>
                            )
                        }

                        <div className="modal-footer">

                            {
                                !erreur && (
                                    <button
                                        id="boutonConfirmer"
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={async () => {

                                            if (Suppression) {

                                                const success = await Supprimer(Voiture.id!);

                                                if (!success) {
                                                    setErreur("Erreur lors de la suppression");
                                                } else {
                                                    fermerModal();
                                                }

                                            } else {

                                                const success =
                                                    await ModificationActiveInactive(
                                                        Voiture.id!,
                                                        !Voiture.actif
                                                    );

                                                if (!success) {
                                                    setErreur("Erreur lors du changement de statut");
                                                } else {
                                                    fermerModal();
                                                }
                                            }
                                        }}
                                    >
                                        {GetRessource('boutonConfirmer')}
                                    </button>
                                )
                            }

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={fermerModal}
                            >
                                {
                                    !erreur
                                        ? GetRessource('boutonAnnuler')
                                        : 'Ok'
                                }
                            </button>

                        </div>

                    </div>
                </div>
            </div>

            {/* Backdrop Bootstrap */}
            <div className={`modal-backdrop fade ${show ? 'show' : ''}`}></div>
        </>,
        document.body
    );
}
export default VoitureActifInactifSuppression;