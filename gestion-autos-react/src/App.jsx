import Menu from "./components/menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './style.css'
import { useEffect, useState } from "react";
import { Langue, Pages } from "./Constantes";
import AuthService from "./Services/AuthService"
import RessourcesService from "./Services/RessourcesServices"
import VoiturePage from "./components/Voitures/VoiturePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page404 from "./components/404";


const App = () => {
  const titrePage = 'titrePrincipal';
  const lienAPI = import.meta.env.VITE_API;
  const user = import.meta.env.VITE_API_USER;
  const password = import.meta.env.VITE_API_PASSWORD;

  //Langue par défaut = Français
  const [lang, setLang] = useState(Langue.FR);
  const [ressourcesService, setRessourcesServices] = useState(null);
  const [authService, setAuthService] = useState(null);

  useEffect(() => {
    const loadApp = async () => {
      const authService = new AuthService(lienAPI, user, password);
      await authService.getToken();
      setAuthService(authService);

      const ressources = new RessourcesService(lienAPI, authService);
      await ressources.fetchRessources();
      setRessourcesServices(ressources);
    }
    loadApp();
  }, []);

  const ChangerLangue = (nouvelleLangue) => {
    setLang(nouvelleLangue);
  }

  const GetToken = async () => {
    return await authService.getToken();
  }
  const GetRessource = (ressource) => {
    return ressourcesService.getRessource(lang, ressource);
  }

  const pageVoitures = (
    <VoiturePage
      authService={authService}
      lang={lang}
      GetRessource={GetRessource}
      lienAPI={lienAPI}
      GetToken={GetToken}
    />
  );
  
  return (
    ressourcesService
    &&
    <>
      <BrowserRouter>
        <Menu ChangerLangue={ChangerLangue} lang={lang} GetRessource={GetRessource} />
        <h1 id={titrePage}>{GetRessource(titrePage)}</h1>
        <Routes>
          <Route path='/' element={pageVoitures} />
          <Route path='*' element={<Page404 GetRessource={GetRessource} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App;
