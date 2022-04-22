import Button from '../../components/Button';
import React, { useEffect, useState } from 'react'
import config from '../../lib/config.js';

function Auth() {
    const [accessToken, setAccessToken] = useState('');
    const [isAuthorize, setIsAuthorize] = useState(false);
    useEffect(() => {
        const accessToken = new URLSearchParams(window.location.hash).get('#access_token');

        setAccessToken(accessToken);
        setIsAuthorize(accessToken !== null);
    }, []);
    const getSpotifyLinkAuthorize = () => {
        const state = Date.now().toString();
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;


        return 'https://accounts.spotify.com/authorize?' +
            `client_id=${clientId}` +
            '&response_type=token' +
            `&redirect_uri=${config.HOST}` +
            `&state=${state}` +
            `&scope=${config.SPOTIFY_SCOPE}`;

    }

    return (
        <>
            {!isAuthorize && (
                <main className="center">
                    <p>Login for next step...</p>
                    <Button href={getSpotifyLinkAuthorize()}>Authorize</Button>
                </main>
            )}

        </>
    )
}

export default Auth;
