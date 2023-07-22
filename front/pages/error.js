import React from 'react'
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import AppContainer from '../components/AppContainer'

const root = createRoot(document.getElementById('root'));
root.render(<AppContainer>
    <main role='main' className='container'>
        <h1 className='mt-5'>Erro!</h1>
        <p className='lead'>Houve um erro! Clique <a href='/'>aqui</a> para retornar à tela inicial.</p>
    </main>
</AppContainer>);
