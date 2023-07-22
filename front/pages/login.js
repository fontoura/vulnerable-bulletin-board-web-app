import React from 'react'
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import AppContainer from '../components/AppContainer'
import LoginForm from '../components/LoginForm';

const root = createRoot(document.getElementById('root'));
root.render(<AppContainer>
    <LoginForm />
</AppContainer>);
