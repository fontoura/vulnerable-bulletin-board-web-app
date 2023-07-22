import React, { useCallback, useContext } from 'react';
import MessageCard from './MessageCard';
import { AppContext } from './AppContainer';

import { attemptDeleteMessage } from '../api/board';

function MessageBoardView({ messages, handleCreateMessage, handleEditMessage, handleDeleteMessage }) {
    return (
        <>
            <div className='container'>
                <a href='#' className='btn btn-success m-1' onClick={ handleCreateMessage }>Criar</a>
            </div>
            <div className='container'>
                <div className='row'>
                    { messages.map(message => <MessageCard key={ message.messageId } {...{ message, handleEditMessage, handleDeleteMessage }} />)}
                </div>
            </div>
        </>
    );
}

function MessageBoard() {
	const { initialData: messages } = useContext(AppContext);

    const handleCreateMessage = useCallback(message => {
        window.location = '/board/create';
    });

    const handleEditMessage = useCallback(message => {
        window.location = '/board/' + message.messageId + '/edit';
    });

    const handleDeleteMessage = useCallback(message => {
        attemptDeleteMessage(message)
            .then(() => {
                window.location = '/board';
            })
            .catch(() => {
                window.alert('Erro!');
            });
    });

    return <MessageBoardView {...{ messages, handleCreateMessage, handleEditMessage, handleDeleteMessage }} />;
}

export default MessageBoard;
