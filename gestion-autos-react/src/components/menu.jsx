import { Pages, Langue } from "../Constantes";

function Menu({ ChangerLangue, lang, GetRessource }) {
    return (<nav className="navbar navbar-expand-lg bg-success" data-bs-theme="dark">
        <div className="container-fluid" id="liens">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link pages" id={Pages.VOITURES} href="/#voitures">{GetRessource(Pages.VOITURES)}</a>
                </li>
            </ul>
            <div className="d-flex ms-auto">
                <button className={`btn-lang btn-en btn btn-outline-light me-2 ${lang === Langue.EN ? 'active' : ''}`} onClick={() => ChangerLangue(Langue.EN)}>EN</button>
                <button className={`btn-lang btn-en btn btn-outline-light me-2 ${lang === Langue.FR ? 'active' : ''}`} onClick={() => ChangerLangue(Langue.FR)}>FR</button>
                <button className={`btn-lang btn-en btn btn-outline-light me-2 ${lang === Langue.ES ? 'active' : ''}`} onClick={() => ChangerLangue(Langue.ES)}>ES</button>
            </div>
        </div>
    </nav>)
}
export default Menu;