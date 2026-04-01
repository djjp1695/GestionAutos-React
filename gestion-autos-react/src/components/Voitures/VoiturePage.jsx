import VoitureService from '../../Services/VoitureService'
import VoitureCarte from './VoitureCarte';
import VoitureActifInactifSuppression from './VoitureAjout'
import { useEffect, useState } from "react";


function VoiturePage({ lang, RessourcesService, lienAPI, GetToken }) {
    const [voitures, setVoitures] = useState([]);
    const [showAjout, setShowAjout] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const token = await GetToken();
            const voitureService = new VoitureService(lienAPI, token);
            const data = await voitureService.getAll();
            setVoitures(data);
        }
        fetchData();

    }, [GetToken]);

    return (
        <>
            <h2 className="liste-voitures">{RessourcesService.getRessource(lang, 'listeVoitures')}</h2>
            <div id="content" className='container'>
                <div id="tiles-container" className='row'>
                    <button onClick={() => setShowAjout(true)}>
                        {RessourcesService.getRessource(lang, 'ajoutVoiture')}
                    </button>
                    {showAjout && (
                        <>
                            <VoitureActifInactifSuppression lang={lang} RessourcesService ={RessourcesService} onClose={() => setShowAjout(false)} />
                        </>
                    )}
                    {voitures.map((v) => (
                        <VoitureCarte key={v.id} voiture={v} lang={lang} RessourcesService={RessourcesService} />
                    ))}
                </div>
            </div >
        </>
    )
}
export default VoiturePage;