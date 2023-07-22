import React, { useRef, useState } from 'react';

function MessageEditorView({ messageId, title, text, setTitle, setText, onSave, onCancel, onDelete }) {
    const handleTitleChange = event => {
        setTitle(event.target.value);
    };
    const handleTextChange = event => {
        setText(event.target.value);
    };
    const handleSubmit = event => {
        event.preventDefault();
        if (onSave != null) {
            onSave.call();
        }
    }
    const handleCancel = event => {
        event.preventDefault();
        if (onCancel != null) {
            onCancel.call();
        }
    };
    const handleDelete = event => {
        event.preventDefault();
        if (onDelete != null) {
            onDelete.call();
        }
    };

    return (
        <form onSubmit={ handleSubmit }>
            <div className='form-group'>
                <label>ID</label>
                <input type='text' className='form-control' placeholder='ID' disabled value={ messageId || '-' } />
            </div>
            <div className='form-group'>
                <label>Título</label>
                <input type='text' className='form-control' placeholder='Título' onChange={ handleTitleChange } value={ title } />
            </div>
            <div className='form-group'>
                <label>Texto</label>
                <textarea className='form-control' rows='3' onChange={ handleTextChange } value={ text }></textarea>
            </div>
            <button type='submit' className='btn btn-primary mb-2 m-1'>Salvar</button>
            <button type='button' className='btn btn-warning mb-2 m-1' onClick={ handleCancel }>Cancelar</button>
            <button type='button' className='btn btn-danger mb-2 m-1' onClick={ handleDelete } disabled={ messageId == null }>Apagar</button>
        </form>
    );
}

function MessageEditor({ message, onSaveCommand, onCancelCommand, onDeleteCommand }) {
    const messageRef = useRef(message);

    const messageId = message && message.messageId;
    const [ title, setTitle ] = useState((message && message.title) || '');
    const [ text, setText ] = useState((message && message.text) || '');

    const handleSave = () => {
        const messageId = messageRef.current != null ? messageRef.current.messageId : null;
        if (onSaveCommand != null) {
            onSaveCommand({ messageId, title, text });
        }
    };

    const handleCancel = () => {
        if (onCancelCommand != null) {
            onCancelCommand();
        }
    };

    const handleDelete = () => {
        const messageId = messageRef.current != null ? messageRef.current.messageId : null;
        if (onDeleteCommand != null) {
            onDeleteCommand({ messageId });
        }
    };

    return <MessageEditorView {...{ messageId, title, text, setTitle, setText, onSave: handleSave, onCancel: handleCancel, onDelete: handleDelete }} />;
}

export default MessageEditor;
