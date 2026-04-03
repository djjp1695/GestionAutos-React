import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css'
const Page404 = ({ GetRessource }) => {
    return (
        <>
            <h1 className="text-center display-4">404</h1>
            <p className="lead text-center"> {GetRessource('pageNonTrouvee')}</p>
            <Link className="text-center nav-link" to='/'>
                <i className="bi bi-house-door-fill"></i>
                {GetRessource('retourAccueil')}
            </Link>
        </>
    )
}

export default Page404;