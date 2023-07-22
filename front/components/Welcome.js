import React, { useContext } from 'react';
import { AppContext } from './AppContainer';

function WelcomeView({ username }) {
    return (
        <main role='main' className='container'>
            <h1 className='mt-5'>Mural de mensagens</h1>
            <p className='lead'>Bem-vindo(a) <b>{ username }</b>! Use o menu acima para navegar.</p>
        </main>
    )
}

function Welcome() {
	const { sessionData: { username } } = useContext(AppContext);
    

    return <WelcomeView {...{ username }} />;
}

export default Welcome;
