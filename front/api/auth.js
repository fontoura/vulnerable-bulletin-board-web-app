async function attemptLogin({ username, password }) {
    const response = await fetch('/api/session/login', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const body = await response.json();

    if (response.status == 200 && body.status == 'LOGGED_IN') {
        return true;
    }
    return false;
}

async function attemptSignIn({ username, password }) {
    const response = await fetch('/api/session/signin', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const body = await response.json();

    if (response.status == 200 && body.status == 'SIGNED_IN') {
        return true;
    }
    return false;
}

async function attemptChangePassword({ username, newPassword }) {
    const response = await fetch('/api/session/change', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, newPassword }),
    });

    const body = await response.json();

    if (response.status == 200 && body.status == 'CHANGED') {
        return true;
    }
    return false;
}

async function attemptLogout() {
    const response = await fetch('/api/session/logout', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const body = await response.json();

    if (response.status == 200 && body.status == 'LOGGED_OUT') {
        return true;
    }
    return false;
}

export { attemptLogin, attemptSignIn, attemptChangePassword, attemptLogout };

