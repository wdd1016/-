import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MusicDetail({ artist, title }) {

    const [lyrics, setLyrics] = useState("");

    const getLyrics = () => {
        const endpoint = `https://api.lyrics.ovh/v1/${artist}/${title}`;
        axios.get(endpoint)
            .then(response => {
                console.log(response.data);
                setLyrics(response.data.lyrics);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        getLyrics();
    }, []);

    return (
        <div>
            <h1 className="detail">음악 상세</h1>
            <h2 className="info">{artist} - {title}</h2>
            <p className="lyrics">{lyrics}</p>
        </div>
    );
};
