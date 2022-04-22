import React, { useEffect, useState } from 'react'
import Track from '../../components/Track';
import SearchBar from '../../components/SearchBar';
import { Form } from '../../components/Form';
import Auth from '../auth/index.js'
import {
    BrowserRouter
} from "react-router-dom";
import Navbar from '../../components/Navbar';


function Home() {
    const [accessToken, setAccessToken] = useState('');
    const [isAuthorize, setIsAuthorize] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [selectedTracksUri, setSelectedTracksUri] = useState([]);
    const [isInSearch, setIsInSearch] = useState(false);

    useEffect(() => {
        const accessToken = new URLSearchParams(window.location.hash).get('#access_token');

        setAccessToken(accessToken);
        setIsAuthorize(accessToken !== null);
    }, []);

    useEffect(() => {
        if (!isInSearch) {
            const selectedTracks = filterSelectedTracks();

            setTracks(selectedTracks);
        }
    }, [selectedTracksUri]);



    const filterSelectedTracks = () => {
        return tracks.filter((track) => selectedTracksUri.includes(track.uri));
    }

    const onSuccessSearch = (searchTracks) => {
        setIsInSearch(true);
        const selectedTracks = filterSelectedTracks();
        const searchDistincTracks = searchTracks.filter((track) => !selectedTracksUri.includes(track.uri));

        setTracks([...selectedTracks, ...searchDistincTracks]);
    }


    const clearSearch = () => {
        const selectedTracks = filterSelectedTracks();

        setTracks(selectedTracks);
        setIsInSearch(false);
    }


    const toggleSelect = (track) => {
        const uri = track.uri;

        if (selectedTracksUri.includes(uri)) {
            setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
        } else {
            setSelectedTracksUri([...selectedTracksUri, uri]);
        }
    }

    return (
        <BrowserRouter>
            <Auth />

            {isAuthorize && (
                <main id="home" >
                    <Navbar />

                    <Form
                        accessToken={accessToken}
                        onSuccess={(tracks) => onSuccessSearch(tracks)}
                    />




                    <SearchBar
                        accessToken={accessToken}
                        onSuccess={(tracks) => onSuccessSearch(tracks)}
                        onClearSearch={clearSearch}
                    />

                    <div className="container">
                        {tracks.length === 0 && (
                            <p>No tracks</p>
                        )}

                        <div className="tracks">
                            {tracks.map((track) => (
                                <Track
                                    key={track.id}
                                    imageUrl={track.album.images[0].url}
                                    title={track.name}
                                    artist={track.artists[0].name}
                                    toggleSelect={() => toggleSelect(track)}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            )}

            {/* <Switch>
                <Route path='/' component={Auth} />
                <Route path='/create-playlist' component={SearchBar} />
            </Switch> */}

        </BrowserRouter>
    );
}


export default Home;