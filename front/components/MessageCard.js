import React, { useCallback } from 'react';

import strftime from 'strftime';

function MessageCardView({ messageId, title, text, creationDate, handleEditCommand, handleDeleteCommand }) {
    const formattedDate = creationDate ? strftime('%d/%m/%y %H:%M:%S', new Date(Date.parse(creationDate))) : null;
    return (
        <div className='col-sm-12 col-md-6 col-xl-4 my-2'>
            <div className='card'>
                <div className='card-header small'>
                    <strong>#{ messageId }</strong>
                </div>
                <div className='card-body'>
                    <h5 className='card-title'>{ title }</h5>
                    <p className='card-text' dangerouslySetInnerHTML={{__html: text }} />
                    <a href='#' className='btn btn-primary m-1' onClick={ handleEditCommand }>Editar</a>
                    <a href='#' className='btn btn-danger m-1' onClick={ handleDeleteCommand }>Apagar</a>
                </div>
                <div className='card-footer small'>
                    Criado em: { formattedDate }
                </div>
            </div>
        </div>
    )
}

function MessageCard({ message, handleEditMessage, handleDeleteMessage }) {
    const { messageId, title, text, creationDate } = message;

    const handleEditCommand = useCallback(() => {
        handleEditMessage(message);
    }, [ message, handleEditMessage ]);

    const handleDeleteCommand = useCallback(() => {
        handleDeleteMessage(message);
    }, [ message, handleDeleteMessage ]);

    return <MessageCardView {...{ messageId, title, text, creationDate, handleEditCommand, handleDeleteCommand }} />;
}

export default MessageCard;
