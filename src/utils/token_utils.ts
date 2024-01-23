import * as jose from 'jose'
import { kv } from '@vercel/kv';

export function checkIsJwtExpired(jwt: string) {
    const decoded = jose.decodeJwt(jwt);
    if (decoded?.exp) {
        return decoded.exp < (Date.now() / 1000);
    }
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

export async function verifyJWT(jwt: string) {
    let cached_jwks = await kv.get('jwks');
    console.log('cached jwks', cached_jwks);
    if (cached_jwks) {
        let formattedKeys = JSON.parse(JSON.stringify(cached_jwks));
        console.log('formatted jwks', formattedKeys);
    }
    

    // if (!cached_jwks) {
    //     JWKS = jose.createRemoteJWKSet(new URL('https://samyapkowitz.us.auth0.com/.well-known/jwks.json'))
    // } else {
    //     let jwks = cached_jwks as jose.JSONWebKeySet;
    //     JWKS = jose.createLocalJWKSet(jwks);
    // }

    
    const JWKS = jose.createLocalJWKSet({"keys":[{"kty":"RSA","use":"sig","n":"zTQjguKsFF8EiJh_pfP9XgNwnJDFXfRzForhGR82s8-SfkO78QE-qre2t4hRR-LMrFJJtWQaYqx-VrSwLps9HRZK3Y8dYGX-1sGRpgspkeZ8JAQrR9VfPlghU27tsbv_1MjtB9I3NRg3b2e3eSgkZYON84nwcfMSlvci7n5taVYCUBR66t7i9Na2QGnqXiN0a7XibD0CgrjBTyo15nCzOXWkJvaHVHeSHeNcRx3I87LTQdbP-o-zIiKx8zdI0-95bpZJG13NH5lyBGi2EFG-w_2lVn3lSFrQ_t9f_FeZJvbfVIVSw3XbsEsQ63rHQNijFBfnm4ePMk4mSLGONCUf_w","e":"AQAB","kid":"9at3f910x1BzcRlo_MeDA","x5t":"j83IO-JcQBD1Tn5cZttl7_5VN0Y","x5c":["MIIDDTCCAfWgAwIBAgIJP6uex4KAvBYaMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNVBAMTGXNhbXlhcGtvd2l0ei51cy5hdXRoMC5jb20wHhcNMjIwMjI4MjEzNDIxWhcNMzUxMTA3MjEzNDIxWjAkMSIwIAYDVQQDExlzYW15YXBrb3dpdHoudXMuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzTQjguKsFF8EiJh/pfP9XgNwnJDFXfRzForhGR82s8+SfkO78QE+qre2t4hRR+LMrFJJtWQaYqx+VrSwLps9HRZK3Y8dYGX+1sGRpgspkeZ8JAQrR9VfPlghU27tsbv/1MjtB9I3NRg3b2e3eSgkZYON84nwcfMSlvci7n5taVYCUBR66t7i9Na2QGnqXiN0a7XibD0CgrjBTyo15nCzOXWkJvaHVHeSHeNcRx3I87LTQdbP+o+zIiKx8zdI0+95bpZJG13NH5lyBGi2EFG+w/2lVn3lSFrQ/t9f/FeZJvbfVIVSw3XbsEsQ63rHQNijFBfnm4ePMk4mSLGONCUf/wIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQsP4HkM9eaTfppk5myyzxph2/aEzAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAIfkwjd7Dirton6UdGx9RzUguHs0+JhyCin6tbnIpMOCqO/RFM5KQkNfjTgzpkC74ecjRZ7r8Ru+gmBjP2fAsJGD496fNllB5fk8NVC/FZFd+9UDnyPU+ElFN5jS1MlWYRUn0q14qZ7GXoflx9mh21HsI/ifTY2xtok4ZEaI8sp19k8T2pjgjedb9efzyY6gym5+dn96pK2wVAHPS6h4VUP9i/7whXch5ILj2Jx7m+AVtaIPDKuM/B3UXOACFVcaitXfGVhnv7yekg95aCwM/Ot8dgT9T+NFAqz9l6Cyx8fwzKD3hnK5GXN+nAxcqZrYYNyb4eLO/NeI7BeFH9gOqXM="],"alg":"RS256"},{"kty":"RSA","use":"sig","n":"3C8kWWXdfFDD8ygXwKdpuGhia9bgOFH6AjP4G_8R5ycEWrXdQsYkLVAdsMY7dngS4UhXUkDhVJ8kB-3gSmB2GXJhVMLwurDkepqZ5yGd4E-Yq6bH8YG1iuD-HbBAvXG0JtiQxmxqb0uLp9UbqpEs75UwXV1kE3lnnSvgR-uTU2ySf95Wip1LZpCoGkTY64bGmU9rmFzEFczh6h7PX4JZ9Sdb_y8vDlxO7guFZ97-eel37ZrNodSKH6l06qy9AjT-rRDmhr9j_8TR4ZEvP766j_3R2EWwgcWm-y5ZqDnUez46D2OcxNvzeiDrIQZxQruU3jWn7q83BF-wFc3kKycs2w","e":"AQAB","kid":"k2lvdQ1DYafluMPZ-yDiJ","x5t":"pockG9EwiaQOcXnf9BYIKLVevW8","x5c":["MIIDDTCCAfWgAwIBAgIJXzO96HcEf52VMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNVBAMTGXNhbXlhcGtvd2l0ei51cy5hdXRoMC5jb20wHhcNMjIwMjI4MjEzNDIxWhcNMzUxMTA3MjEzNDIxWjAkMSIwIAYDVQQDExlzYW15YXBrb3dpdHoudXMuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3C8kWWXdfFDD8ygXwKdpuGhia9bgOFH6AjP4G/8R5ycEWrXdQsYkLVAdsMY7dngS4UhXUkDhVJ8kB+3gSmB2GXJhVMLwurDkepqZ5yGd4E+Yq6bH8YG1iuD+HbBAvXG0JtiQxmxqb0uLp9UbqpEs75UwXV1kE3lnnSvgR+uTU2ySf95Wip1LZpCoGkTY64bGmU9rmFzEFczh6h7PX4JZ9Sdb/y8vDlxO7guFZ97+eel37ZrNodSKH6l06qy9AjT+rRDmhr9j/8TR4ZEvP766j/3R2EWwgcWm+y5ZqDnUez46D2OcxNvzeiDrIQZxQruU3jWn7q83BF+wFc3kKycs2wIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBSnhzWVZsFAA08gS77ZKJKrwe6NVzAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAC87S7MeXgkHUR9ricYPrLHWDVgQBwSJ+wBZRT/lPri79ZY3pUUW77erv35rvaOrC3zgvrNrrn0z9H7hlx31b+UGblpxXSQkMbN5p2t11jFoM3wNovCULVmdXA1NG0JbgUHL6d5ZnMtcJbC4W3IllkznIxr9BEyxHt769VSCtIczaDCpittKQJuqn1DseRCIU+CywodAJSWGnNGJOmimt/hteK5OoTWEDtrL8tQcUvtvOOOMl8zDxSc/kiUEMz477FoTG6vJJgZe+r4dXLQ+y3H3edPoEw/AAz98ZuuF2hxcG9vMfLNw8oYxrsFfCXCWlmIXfGrTasZdV4CoIIoA8UU="],"alg":"RS256"}]});
    
    const { payload } = await jose.jwtVerify(jwt, JWKS, {
        issuer: 'https://auth.samyap.dev/',
        audience: [
            "http://localhost:8080",
            "https://samyapkowitz.us.auth0.com/userinfo"
        ],
    });

    return !!payload;
}