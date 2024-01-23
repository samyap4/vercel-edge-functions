import * as jose from 'jose'

export function checkIsJwtExpired(jwt: string) {
    const decoded = jose.decodeJwt(jwt);
    if (decoded?.exp) {
        return decoded.exp < (Date.now() / 1000);
    }
}

export function checkAudience(jwt: string, audience: string) {
    const decoded = jose.decodeJwt(jwt);
    return decoded.aud === audience;
}

export async function renewFGAJWT() {
    const res = await fetch(
        `https://fga.us.auth0.com/oauth/token`,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ 
                client_id: process.env.FGA_CLIENT_ID, 
                client_secret: process.env.FGA_CLIENT_SECRET, 
                audience: 'https://api.us1.fga.dev/', 
                grant_type: 'client_credentials' 
            }),
        }
    );
    const data = await res.json();
    return data.access_token;
}