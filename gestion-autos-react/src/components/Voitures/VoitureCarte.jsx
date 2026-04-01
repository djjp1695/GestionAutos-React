
function CardVoiture({ voiture, lang, RessourcesService }) {
    return (
        <div className="card voiture-tile" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{voiture.marque}</h5>
                <p>
                    <label className="label-card-model">{RessourcesService.getRessource(lang, 'modeleVoiture')} </label>
                    {' '}: {' '}
                    <label id="card-modele">{voiture.modele} </label>
                </p>
                <p>
                    <label className="label-card-annee">{RessourcesService.getRessource(lang, 'anneeVoiture')}</label>
                    {' '}: {' '}
                    <label id="card-annee">{voiture.annee}</label>
                </p>
                <p>
                    <label className="label-card-couleur">{RessourcesService.getRessource(lang, 'couleurVoiture')}</label>
                    {' '}: {' '}
                    <label id="card-couleur">{voiture.couleur}</label>
                </p>
                <p>
                    <label className="label-card-actif">{RessourcesService.getRessource(lang, 'actifVoiture')}</label>
                    {' '}: {' '}
                    <label id="card-actif" className={voiture.actif ? 'card-actif-actif' : 'card-actif-inactif'}>
                        {
                            voiture.actif ? RessourcesService.getRessource(lang, 'actifVoiture') : RessourcesService.getRessource(lang, 'voitureInactive')
                        }
                    </label>
                </p>
                <button type="button" className="btn btn-primary"  >{RessourcesService.getRessource(lang, 'boutonModifier')}</button>
                <button type="button" className="btn btn-warning">
                    {
                        voiture.actif
                            ? RessourcesService.getRessource(lang, 'rendreInactive')
                            : RessourcesService.getRessource(lang, 'rendreActive')
                    }
                </button>
                <button type="button" className="supprimer-voiture btn btn-danger">{RessourcesService.getRessource(lang, 'boutonSupprimer')}</button>
            </div>
        </div>
    )
}
export default CardVoiture;