import React, { useCallback, useContext } from 'react';
import MessageEditor from './MessageEditor';
import { AppContext } from './AppContainer';

import { attemptCreateMessage } from '../api/board';

function CreateMessageView({ message, onSaveCommand, onCancelCommand }) {
    return (
        <div className='container p-2'>
            <MessageEditor {...{ message, onSaveCommand, onCancelCommand }} />
        </div>
    );
}

function CreateMessage() {
	const { sessionData: { userId } } = useContext(AppContext);

    const onSaveCommand = useCallback(message => {
        attemptCreateMessage({ userId, ...message })
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

    return <CreateMessageView {...{ onSaveCommand, onCancelCommand }} />;
}

export default CreateMessage;
