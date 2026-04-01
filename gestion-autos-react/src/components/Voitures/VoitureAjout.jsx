function VoitureActifInactifSuppression({ onClose, lang, RessourcesService }) {
    return (
        <div id="modal-window-voiture" className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"></h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body"></div>
                    <div className="modal-footer">
                        <button id="boutonConfirmer" type="button" className="btn btn-primary">{RessourcesService.getRessource(lang, 'boutonConfirmer')}</button>
                        <button type="button" className=" btn btn-secondary" onClick={onClose}>{RessourcesService.getRessource(lang, 'boutonAnnuler')}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VoitureActifInactifSuppression;