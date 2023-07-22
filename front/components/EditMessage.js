import React, { useCallback, useContext } from 'react';
import MessageEditor from './MessageEditor';
import { AppContext } from './AppContainer';

import { attemptEditMessage, attemptDeleteMessage } from '../api/board';

function EditMessageView({ message, onSaveCommand, onCancelCommand, onDeleteCommand }) {
    return (
        <div className='container p-2'>
            <MessageEditor {...{ message, onSaveCommand, onCancelCommand, onDeleteCommand }} />
        </div>
    );
}

function EditMessage() {
	const { initialData: message } = useContext(AppContext);

    const onSaveCommand = useCallback(message => {
        attemptEditMessage(message)
            .then(() => {
                window.location = '/board';
            })
            .catch(() => {
                window.alert('Erro!');
            });
    });

    const onCancelCommand = useCallback(() => {
        window.location = '/board';
    });

    const onDeleteCommand = useCallback(message => {
        attemptDeleteMessage(message)
            .then(() => {
                window.location = '/board';
            })
            .catch(() => {
                window.alert('Erro!');
            });
    });

    return <EditMessageView {...{ message, onSaveCommand, onCancelCommand, onDeleteCommand }} />;
}

export default EditMessage;
