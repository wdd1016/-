import React, { useState } from 'react';
import axios from 'axios';
import './SearchMusic.css';

export default function SearchMusic({ musicList, setMusicList }) {
    const [artist, setArtists] = useState('');
    const [title, setTitle] = useState('');
    const [musics, setMusics] = useState({});
    const [isSearch, setIsSearch] = useState(false);

    localStorage.setItem('musics', JSON.stringify([]));

    const searchMusics = () => {
        setIsSearch(true);
        const endpoint = `https://api.lyrics.ovh/v1/${artist}/${title}`;
        axios.get(endpoint)
            .then(response => {
                console.log(response.data);
                setMusics({lyrics: response.data.lyrics, title, artist});
            })
            .catch(error => {
                console.error(error);
            });
    };

    const addMusic = () => {
        setMusicList([...musicList, musics]);
        setIsSearch(false);
    }

    return (
        <div className="MusicList">
            <h1>음악 조회</h1>
            <div className="search">
                <input type="text" placeholder="음악 제목을 입력하세요" value={title} onChange={e => setTitle(e.target.value)} />
                <input type="text" placeholder="가수를 입력하세요" value={artist} onChange={e => setArtists(e.target.value)} />
                <button onClick={searchMusics}>검색</button>
            </div>
            {
                musics.length === 0 ? isSearch && <p>검색 결과가 없습니다.</p> :
                isSearch &&
                <>
                    <ul className="musics">
                        <h1 className="title">{musics.title}</h1>
                        <h2 className="artist">{musics.artist}</h2>
                        <p className="lyrics">{musics.lyrics}</p>
                    </ul>
                    <button onClick={addMusic}>내 음악 추가</button>
                </>
            }
        </div>
    );
};