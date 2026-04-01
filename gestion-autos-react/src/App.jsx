import Menu from "./components/menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './style.css'
import { useEffect, useState } from "react";
import { Langue } from "./Constantes";
import AuthService from "./Services/AuthService"
import RessourcesService from "./Services/RessourcesServices"
import VoiturePage from "./components/Voitures/VoiturePage";


function App() {
  const titrePage = 'titrePrincipal';
  const lienAPI = "http://localhost:8000/api";
  const user = 'app';
  const password = 'appWeb';

  //Langue par défaut = Français
  const [lang, setLang] = useState(Langue.FR);
  const [ressourcesService, setRessourcesServices] = useState(null);
  const [authService, setAuthService] = useState(null);

  useEffect(() => {
    async function loadApp() {
      const authService = new AuthService(lienAPI, user, password);
      await authService.getToken();
      setAuthService(authService);

      const ressources = new RessourcesService(lienAPI, authService);
      await ressources.fetchRessources();
      setRessourcesServices(ressources);
    }
    loadApp();
  }, []);

  function ChangerLangue(nouvelleLangue) {
    setLang(nouvelleLangue);
  }

  async function GetToken() {
    return await authService.getToken();
  }

  return (
    ressourcesService
    &&
    <>
      <Menu ChangerLangue={ChangerLangue} lang={lang} RessourcesService={ressourcesService} />
      <h1 id={titrePage}>{ressourcesService.getRessource(lang, titrePage)}</h1>
      <VoiturePage lang={lang} RessourcesService={ressourcesService} lienAPI={lienAPI} GetToken={GetToken} />
    </>)

}
export default App;
