import React, { useCallback, useState } from 'react';
import useRootClass from '../hooks/useRootClass';
import usePulse from '../hooks/usePulse';

import './SignInForm.css';

import { attemptSignIn } from '../api/auth';

function SignInFormView({ formData, handleChange, loading, warningActive, warningMessage, handleSubmit }) {
    useRootClass('d-flex align-items-center py-4 bg-body-tertiary');

    const [ passwordVisible, setPasswordVisible ] = useState(false);

    return (
        <main className='m-auto'>
            <div className='container'>
                <form>
                    <div className='row'>
                        <div className='col-12'>
                            <label className='form-label'>Username</label>
                            <input type='text' className='form-control' name='username' placeholder='Username' value={ formData.username } onChange={ handleChange } disabled={ loading } />
                        </div>

                        <div className='col-12'>
                            <label className='form-label'>Senha</label>
                            <input type={ passwordVisible ? 'text' : 'password' } className='form-control' name='password' placeholder='***' value={ formData.password } onChange={ handleChange } disabled={ loading } />
                        </div>
                    
                        <div className='col-12 my-3'>
                            <input className='form-check-input mx-1' type='checkbox' checked={ passwordVisible } onChange={ () => setPasswordVisible(!passwordVisible) }/>
                            <label className='form-check-label'>
                                Mostrar senha
                            </label>
                        </div>
                    </div>
                    <button className='btn btn-primary w-100 py-2 my-2' type='submit' onClick={ handleSubmit }>Registrar</button>
                </form>
                <div className='alert alert-danger my-2' role='alert' style={{ visibility: warningActive ? 'visible' : 'hidden'}}>{ warningMessage }</div>
            </div>
        </main>
    )
}

function SignInForm(props) {
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

    const handleSubmit = useCallback(event => {
        event.preventDefault();
        const { username, password } = formData;
        setLoading(true);
        attemptSignIn({ username, password })
            .then(signedIn => {
                setLoading(false);
                if (signedIn) {
                    const searchParams = new URLSearchParams(document.location.search)
                    window.location = searchParams.get('returnTo') || '/';
                } else {
                    setWarningMessage('Dados inválidos!');
                    showWarning(5000);
                }
            })
            .catch(error => {
                setLoading(false);
                setWarningMessage('Erro interno!');
                showWarning(5000);
            })
    });

    return <SignInFormView {...{ formData, handleChange, handleSubmit, loading, warningActive, warningMessage }} />;
}

export default SignInForm;
