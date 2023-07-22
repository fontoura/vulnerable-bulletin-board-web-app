import React, { useCallback, useContext, useState } from 'react';
import { AppContext } from './AppContainer';

import { attemptChangePassword } from '../api/auth';

function ChangePasswordView({ onChangeCommand }) {
    const [ passwordVisible, setPasswordVisible ] = useState(false);
    const [ password1, setPassword1 ] = useState('');
    const [ password2, setPassword2 ] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        if (onChangeCommand != null) {
            onChangeCommand({ password1, password2 });
        }
    };

    return (
        <div className='container p-2'>
            <form onSubmit={ handleSubmit }>
                <div className='form-group'>
                    <label>Nova senha</label>
                    <input type={ passwordVisible ? 'text' : 'password' } className='form-control' placeholder='Senha nova' onChange={ e => setPassword1(e.target.value) } value={ password1 } />
                </div>
                <div className='form-group'>
                    <label>Repita a nova senha</label>
                    <input type={ passwordVisible ? 'text' : 'password' } className='form-control' placeholder='Senha nova' onChange={ e => setPassword2(e.target.value) } value={ password2 } />
                </div>
                <div className='col-12 my-3'>
                    <input className='form-check-input mx-1' type='checkbox' checked={ passwordVisible } onChange={ () => setPasswordVisible(!passwordVisible) }/>
                    <label className='form-check-label'>
                        Mostrar senha
                    </label>
                </div>
                <button type='submit' className='btn btn-primary mb-2 m-1'>Salvar</button>
            </form>
        </div>
    );
}

function ChangePassword() {
	const { sessionData: { username } } = useContext(AppContext);

    const onChangeCommand = useCallback(({ password1, password2 }) => {
        if (password1 != password2) {
            window.alert('No match!');
            return;
        }
        attemptChangePassword({ username, newPassword: password1 })
            .then(() => {
                window.location = '/board';
            })
            .catch(() => {
                window.alert('Erro!');
            });
    });

    return <ChangePasswordView {...{ onChangeCommand }} />;
}

export default ChangePassword;
