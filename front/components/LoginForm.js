import React, { useCallback, useState } from 'react';
import useRootClass from '../hooks/useRootClass';
import usePulse from '../hooks/usePulse';

import './LoginForm.css';

import { attemptLogin } from '../api/auth';

function LoginFormView({ formData, handleChange, handleSubmit, loading, warningActive, warningMessage, handleCreateAccount }) {
    useRootClass('d-flex align-items-center py-4 bg-body-tertiary');

    const [ passwordVisible, setPasswordVisible ] = useState(false);

    return (
        <main className='form-signin w-100 m-auto'>
            <form onSubmit={ handleSubmit }>
                <h1 className='h3 mb-3 fw-normal'>Login</h1>

                <div className='form-floating'>
                    <input type='text' className='form-control' placeholder='Nome de usuário' name='username' value={ formData.username } onChange={ handleChange } disabled={ loading } />
                    <label>Nome de usuário</label>
                </div>
                <div className='form-floating'>
                    <input type={ passwordVisible ? 'text' : 'password' } className='form-control' placeholder='Senha' name='password' value={ formData.password } onChange={ handleChange } disabled={ loading } />
                    <label>Senha</label>
                </div>

                <div className='form-check text-start my-3'>
                    <input className='form-check-input' type='checkbox' checked={ passwordVisible } onChange={ () => setPasswordVisible(!passwordVisible) }/>
                    <label className='form-check-label'>
                        Mostrar senha
                    </label>
                </div>

                <input className='btn btn-primary w-100 py-2' type='submit' value='Logar' disabled={ loading } />

                <p className='my-3'><button className='btn btn-link' onClick={ handleCreateAccount } disabled={ loading }>Criar conta</button></p>
            </form>
            <div className='alert alert-danger my-2' role='alert' style={{ visibility: warningActive ? 'visible' : 'hidden'}}>{ warningMessage }</div>
        </main>
    )
}

function LoginForm() {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    
    const [warningActive, showWarning] = usePulse();
    const [warningMessage, setWarningMessage] = useState('!');

	const handleChange = useCallback(event => {
        setFormData({
           ...formData, 
           [event.target.name]: event.target.value
        })
    }, [ formData ]);

    const handleCreateAccount = useCallback(() => {
        event.preventDefault();
        document.location = 'sign-in';
    });

    const handleSubmit = useCallback(event => {
        event.preventDefault();
        const { username, password } = formData;
        setLoading(true);
        attemptLogin({ username, password })
            .then(loggedIn => {
                setLoading(false);
                if (loggedIn) {
                    const searchParams = new URLSearchParams(document.location.search)
                    window.location = searchParams.get('returnTo') || '/';
                } else {
                    setWarningMessage('Credenciais inválidas!');
                    showWarning(5000);
                }
            })
            .catch(() => {
                setLoading(false);
                setWarningMessage('Erro interno!');
                showWarning(5000);
            })
    });

    return <LoginFormView {...{ formData, handleChange, handleSubmit, handleCreateAccount, loading, warningActive, warningMessage }} />;
}

export default LoginForm;
