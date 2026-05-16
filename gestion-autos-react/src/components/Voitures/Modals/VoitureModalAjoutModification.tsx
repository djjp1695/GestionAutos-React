import { useEffect, useState } from "react";
import { ajouterFonctionEscape } from "../../../Util";
import { createPortal } from "react-dom";

interface VoitureModalAjoutModificationProps {
    GetRessource: (key: string) => string;
    OnClose: () => void;
    Voiture?: Voiture | null;

    AjoutVoiture?: (
        marque: string,
        modele: string,
        annee: number,
        couleur: string,
        actif: boolean
    ) => Promise<boolean>;

    ModificationVoiture?: (
        id: number,
        marque: string,
        modele: string,
        annee: number,
        couleur: string,
        actif: boolean
    ) => Promise<boolean>;
}

const VoitureModalAjoutModification = ({
    GetRessource,
    OnClose,
    Voiture,
    AjoutVoiture,
    ModificationVoiture
}: VoitureModalAjoutModificationProps) => {

    const [marque, setMarque] = useState<string>(Voiture?.marque || '');
    const [modele, setModele] = useState<string>(Voiture?.modele || '');
    const [annee, setAnnee] = useState<number>(Voiture?.annee || 0);
    const [couleur, setCouleur] = useState<string>(Voiture?.couleur || '');
    const [actif, setActif] = useState<boolean>(Voiture?.actif || false);
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
                id="modal-window-modification-voiture"
                className={`modal fade ${show ? 'show' : ''} d-block`}
                tabIndex={-1}
                aria-modal="true"
                role="dialog"
            >
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5
                                className="modal-title modification-voiture"
                            >
                                {
                                    !Voiture
                                        ? GetRessource('ajoutVoiture')
                                        : GetRessource('modificationVoiture')
                                }
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={fermerModal}
                            ></button>
                        </div>

                        <form
                            id="updateVoitureForm"
                            onSubmit={async (e) => {
                                e.preventDefault();

                                if (Voiture == null) {

                                    await AjoutVoiture?.(
                                        marque,
                                        modele,
                                        annee,
                                        couleur,
                                        actif
                                    );

                                } else {

                                    await ModificationVoiture?.(
                                        Voiture.id!,
                                        marque,
                                        modele,
                                        annee,
                                        couleur,
                                        actif
                                    );
                                }

                                fermerModal();
                            }}
                        >

                            <div className="modal-body">

                                <div className="mb-3">

                                    <label
                                        htmlFor="marqueVoitureInput"
                                        className="form-label"
                                    >
                                        {GetRessource('marqueVoiture')}
                                    </label>

                                    <input
                                        id="marqueVoitureInput"
                                        type="text"
                                        className="form-control"
                                        required
                                        placeholder={GetRessource('validationMarque')}
                                        value={marque}
                                        onChange={(e) => {
                                            setMarque(e.target.value);
                                        }}
                                    />

                                </div>

                                <div className="mb-3">

                                    <label
                                        htmlFor="modeleVoitureInput"
                                        className="form-label"
                                    >
                                        {GetRessource('modeleVoiture')}
                                    </label>

                                    <input
                                        id="modeleVoitureInput"
                                        type="text"
                                        className="form-control"
                                        required
                                        placeholder={GetRessource('validationModele')}
                                        value={modele}
                                        onChange={(e) => {
                                            setModele(e.target.value);
                                        }}
                                    />

                                </div>

                                <div className="mb-3">

                                    <label
                                        htmlFor="anneeVoitureInput"
                                        className="form-label"
                                    >
                                        {GetRessource('anneeVoiture')}
                                    </label>

                                    <input
                                        id="anneeVoitureInput"
                                        type="number"
                                        className="form-control"
                                        required
                                        placeholder={GetRessource('validationAnnee')}
                                        value={annee}
                                        onChange={(e) => {
                                            setAnnee(Number(e.target.value));
                                        }}
                                    />

                                </div>

                                <div className="mb-3">

                                    <label
                                        htmlFor="couleurVoitureInput"
                                        className="form-label"
                                    >
                                        {GetRessource('couleurVoiture')}
                                    </label>

                                    <input
                                        id="couleurVoitureInput"
                                        type="text"
                                        className="form-control"
                                        required
                                        placeholder={GetRessource('validationCouleur')}
                                        value={couleur}
                                        onChange={(e) => {
                                            setCouleur(e.target.value);
                                        }}
                                    />

                                </div>

                                <div className="form-check">

                                    <input
                                        id="actifVoiture"
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={actif}
                                        onChange={(e) => {
                                            setActif(e.target.checked);
                                        }}
                                    />

                                    <label
                                        htmlFor="actifVoiture"
                                        className="form-check-label"
                                    >
                                        {GetRessource('voitureActive')}
                                    </label>

                                </div>

                            </div>

                            <div className="modal-footer">

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {GetRessource('boutonConfirmer')}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={fermerModal}
                                >
                                    {GetRessource('boutonAnnuler')}
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            </div>

            {/* Backdrop Bootstrap */}
            <div className={`modal-backdrop fade ${show ? 'show' : ''}`}></div>
        </>,
        document.body
    );
};

export default VoitureModalAjoutModification;