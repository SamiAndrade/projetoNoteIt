import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../styles/home.css'


function Cabecalho() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {
        if (location.pathname === '/login') {
        navigate('/');
        }
    };

    return (
        <div>
             <header>
        <nav>
            <section className="secao_logo">
            <NavLink to={'/'}><img src="./logotipo.jpeg" alt="" /></NavLink>

            </section>
            <ul>
                <section className="lista_ancoras">
                <NavLink
                to={location.pathname === '/principal' ? '/' : '/info'}
                className={({ isActive }) => (isActive ? 'active' : 'ancoras')}
                style={{
                    background: location.pathname === '/principal' ? 'red' : '',
                    color: location.pathname === '/principal' ? 'white' : '',
                    borderBottom: location.pathname === '/principal' ? 'red' : '#adff2f'
                }}
            >
                {location.pathname === '/principal' ? 'Sair' : 'Sobre o site'}
            </NavLink>


                <NavLink to={location.pathname === '/login' ? '/' : '/login'}
                className={({ isActive }) => (isActive ? 'active' : 'ancoras')}
                onClick={handleClick}
                style={{ display: location.pathname === '/principal' ? 'none' : 'inline-block',  
                        borderBottom: location.pathname === '/principal' ? 'red' : '#adff2f', }}
                >
                {location.pathname === '/login' ? 'Home' : 'Login'}
                </NavLink>

                </section>
            </ul>
        </nav>
    </header>
        </div>
    );
} export default Cabecalho;