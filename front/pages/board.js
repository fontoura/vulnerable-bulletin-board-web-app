import React from 'react'
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import AppContainer from '../components/AppContainer'
import Header from '../components/Header'
import MessageBoard from '../components/MessageBoard'

const root = createRoot(document.getElementById('root'));
root.render(<AppContainer>
    <Header />
    <MessageBoard />
</AppContainer>);
