import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MusicDetail() {
    const params = useParams();
    const artist = params.artist;
    const title = params.title;

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
            <h1>음악 상세</h1>
            <h2>{artist} - {title}</h2>
            <p>{lyrics}</p>
        </div>
    );
};
