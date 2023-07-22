import React from 'react'
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import AppContainer from '../components/AppContainer'
import Header from '../components/Header'
import EditMessage from '../components/EditMessage';

const root = createRoot(document.getElementById('root'));
root.render(<AppContainer>
    <Header />
    <EditMessage />
</AppContainer>);
