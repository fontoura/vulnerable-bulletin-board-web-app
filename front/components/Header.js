import React, { useState, useCallback } from 'react';

import { attemptLogout } from '../api/auth';

function HeaderView({ handleLogout }) {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = useCallback(() => setIsNavCollapsed(!isNavCollapsed), [isNavCollapsed]);

    return (
        <header>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-4'>
                <a className='navbar-brand font-weight-bolder ml-2' href='/'>
                    <span className=''>Mural</span>
                </a>
                <button className='custom-toggler navbar-toggler' type='button' data-toggle='collapse' data-target='#novbar' aria-controls='novbar' aria-expanded={!isNavCollapsed ? true : false} aria-label='Toggle navigation' onClick={handleNavCollapse}>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id='novbar'>
                    <ul className='navbar-nav'>
                        <li className='nav-item active'>
                            <a className='nav-link' href='/'>Home</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/board'>Mensagens</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/change-password'>Mudar senha</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='#' onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

function Header(props) {
    const handleLogout = useCallback(() => {
        attemptLogout()
            .then(loggedOut => {
                window.location = '/login';
            });

    });

    return <HeaderView {...{ handleLogout }} />
}

export default Header;