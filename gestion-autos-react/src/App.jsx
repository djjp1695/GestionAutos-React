import Menu from "./components/menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './style.css'
import { useEffect, useState } from "react";
import { Langue } from "./Constantes";
import AuthService from "./Services/AuthService"
import RessourcesService from "./Services/RessourcesServices"
import VoiturePage from "./components/Voitures/VoiturePage";


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

  return (
    ressourcesService
    &&
    <>
      <Menu ChangerLangue={ChangerLangue} lang={lang} GetRessource={GetRessource} />
      <h1 id={titrePage}>{GetRessource(titrePage)}</h1>
      <VoiturePage authService={authService} lang={lang} GetRessource={GetRessource} lienAPI={lienAPI} GetToken={GetToken} />
    </>)

}
export default App;
