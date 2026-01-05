const API_URL = "http://localhost:8000/api";

export async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(JSON.stringify(await response.json()));
    }

    return response.json();
}

export async function register(name, email, password) {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
        throw new Error(JSON.stringify(await response.json()));
    }

    return response.json();
}

export async function logout(token) {
    const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Logout failed');
    }

    localStorage.removeItem("tikit_token");
    localStorage.removeItem("user");

    return response.json();
}

export const setAuth = (token, user) => {
    localStorage.setItem("tikit_token", token);
    localStorage.setItem("user", JSON.stringify(user));
}

export const getToken = () => {
    return localStorage.getItem("tikit_token");
}

export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

