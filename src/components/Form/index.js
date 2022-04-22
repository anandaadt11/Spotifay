
import React, { useState } from 'react';

import Button from '../Button';
import config from '../../lib/config.js';

// const { useState } = require("react");




const Form = ({ accessToken, onSuccess }) => {
    const [tittle, setTittle] = useState("");
    const [desc, setDesc] = useState("");



    const handleTittle = (e) => {
        setTittle(e.target.value);
    };

    const handleDesc = (e) => {
        setDesc(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestOptions = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${tittle}`, requestOptions)
                .then((data) => data.json());

            const tracks = response.tracks.items;
            onSuccess(tracks);

        } catch (e) {
            alert(e);
        }
    }


    return (
        <div className="container">
            <h2>Create Playlist</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="tittle" className='form-label'>Tittle : </label>
                    <input
                        id="tittle"
                        type="text"
                        name="tittle"
                        value={tittle}
                        onChange={handleTittle}
                        required
                        className='form-control'
                    />
                </div>

                <div style={{ margin: '0px 0px 20px 0px' }}>
                    <label htmlFor="desc" className='form-label'>Description : </label>
                    <textarea
                        id="desc"
                        type="text"
                        name="desc"
                        value={desc}
                        onChange={handleDesc}
                        required
                        className='form-control'
                    />
                </div>

                <Button type="submit" >Search</Button>
            </form>
        </div>
    );
};

export { Form };
