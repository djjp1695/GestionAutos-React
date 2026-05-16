import Menu from "./components/menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './style.css'
import {useEffect, useMemo, useState} from "react";
import {Langue} from "./Constantes";
import AuthService from "./Services/AuthService"
import RessourcesService from "./Services/RessourcesServices"
import VoiturePage from "./components/Voitures/VoiturePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Page404 from "./components/404";


const App = () => {
    const titrePage = 'titrePrincipal';
    const lienAPI = import.meta.env.VITE_API;
    const user = import.meta.env.VITE_API_USER;
    const password = import.meta.env.VITE_API_PASSWORD;

    //Langue par défaut = Français
    const [lang, setLang] = useState<Langue>(Langue.FR);
    const authService = useMemo(() => new AuthService(lienAPI, user, password), [lienAPI, user, password]);
    const [ressourcesService, setRessourcesServices] = useState<RessourcesService | null>(null);

    const GetToken = async (): Promise<string | null> => {
        return await authService.getToken();
    }
    useEffect(() => {
        const loadApp = async () => {
            await authService.getToken();

            const ressources = new RessourcesService(lienAPI, GetToken);
            await ressources.fetchRessources();
            setRessourcesServices(ressources);
        }
        loadApp();
    }, []);
    ;

    const ChangerLangue = (nouvelleLangue: Langue): void => {
        setLang(nouvelleLangue);
    }


    const GetRessource = (ressource: string): string => {
        return ressourcesService!.getRessource(lang, ressource);
    }

    const pageVoitures = (
        <VoiturePage
            GetToken={GetToken}
            GetRessource={GetRessource}
            lienAPI={lienAPI}
        />
    );

    return (
        ressourcesService
        &&
        <>
            <BrowserRouter>
                <Menu ChangerLangue={ChangerLangue} lang={lang} GetRessource={GetRessource}/>
                <h1 id={titrePage}>{GetRessource(titrePage)}</h1>
                <Routes>
                    <Route path='/' element={pageVoitures}/>
                    <Route path='*' element={<Page404 GetRessource={GetRessource}/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App;
