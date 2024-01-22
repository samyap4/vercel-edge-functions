import { jwtDecode } from "jwt-decode";

export function checkIsJwtExpired(jwt: string) {
    const decoded = jwtDecode(jwt);
    if (decoded?.exp) {
        return decoded.exp < Date.now();
    }
}

export function renewFGAJWT(): string {
    fetch('https://fga.us.auth0.com/oauth/token', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ 
                client_id: process.env.FGA_CLIENT_ID, 
                client_secret: process.env.FGA_CLIENT_SECRET, 
                audience: 'https://api.us1.fga.dev/', 
                grant_type: 'client_credentials' }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data.access_token.toString();
        })
    .catch((error) => {
            console.error(error);
            return '';
    });
    return '';
}