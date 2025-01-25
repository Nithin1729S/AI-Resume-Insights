'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function handleRefresh() {
    try {
        const refreshToken = await getRefreshToken();

        const token = await fetch('http://localhost:8001/api/auth/token/refresh/', {
            method: 'POST',
            body: JSON.stringify({
                refresh: refreshToken
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(async (json) => {
                console.log('Response - Refresh:', json);

                if (json.access) {
                    const cookieStore = await cookies();
                    cookieStore.set('session_access_token', json.access, {
                        httpOnly: true,
                        secure: false,
                        maxAge: 60 * 60, // 60 minutes
                        path: '/'
                    });

                    return json.access;
                } else {
                    await resetAuthCookies();
                    redirect('/login');
                }
            });

        return token;
    } catch (error) {
        console.log('error', error);
        await resetAuthCookies();
        redirect('/login');
    }
}

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();
    cookieStore.set('session_userid', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV==='production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });

    cookieStore.set('session_access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV==='production',
        maxAge: 60 * 60, // 60 minutes
        path: '/'
    });

    cookieStore.set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV==='production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });
}

export async function resetAuthCookies() {
    const cookieStore = await cookies(); // Keep await here
    cookieStore.delete('session_userid');
    cookieStore.delete('session_access_token');
    cookieStore.delete('session_refresh_token');
    redirect('/login');
}

//
// Get data

export async function getUserId() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('session_userid')?.value;
    return userId ? userId : null;
}

export async function getAccessToken() {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get('session_access_token')?.value;

    if (!accessToken) {
        accessToken = await handleRefresh();
    }

    return accessToken;
}

export async function getRefreshToken() {
    const cookieStore = await cookies();
    let refreshToken = cookieStore.get('session_refresh_token')?.value;

    return refreshToken;
}