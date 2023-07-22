async function attemptCreateMessage({ userId, title, text }) {
    const response = await fetch('/api/board/create', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, title, text }),
    });

    const body = await response.json();

    if (response.status == 200 && body.status == 'CREATED') {
        return true;
    }
    return false;
}

async function attemptEditMessage({ messageId, title, text }) {
    const response = await fetch('/api/board/update/' + messageId, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, text }),
    });

    const body = await response.json();

    if (response.status == 200 && body.status == 'UPDATED') {
        return true;
    }
    return false;
}

async function attemptDeleteMessage({ messageId }) {
    const response = await fetch('/api/board/delete/' + messageId, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const body = await response.json();

    if (response.status == 200 && body.status == 'DELETED') {
        return true;
    }
    return false;
}

export { attemptCreateMessage, attemptEditMessage, attemptDeleteMessage };
