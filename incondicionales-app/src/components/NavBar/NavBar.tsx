import { Link } from 'react-router-dom';
import logo_incondicionales from '../../assets/logo_incondicionales.png';

const NavBar = () => {
    return(
        <>
        <div className="nav-logo">
            <img src={logo_incondicionales} alt="logo incondicinales"/>
        </div>
        <nav className="nav-bar">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="Miembros">Miembros</Link>
                </li>
                <li className="nav-item">
                    <Link to="Partidos">Partidos</Link>
                </li>
                <li className="nav-item">
                    <Link to="Acceso">Acceso</Link>
                </li>     
            </ul>
        </nav>
        </>
    );
}

export default NavBar;