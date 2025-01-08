import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchMusic from './SearchMusic';
import './MyMusicList.css';

export default function MyMusicList() {
    const [musicList, setMusicList] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    return (
        <div className="MusicList">
            <h1>내 음악 조회</h1>
            <SearchMusic musicList={musicList} setMusicList={setMusicList} />
            {
                musicList.length === 0 ? isSearch && <p>검색 결과가 없습니다.</p> :
                <ul className="musics">
                    {
                        musicList.map(music => (
                            <li className="music" key={music.title}>
                                <h1 className="title">
                                    <Link to={`/musicdetail/${music.artist}/${music.title}`}>{music.title}</Link>
                                </h1>
                                <h2 className="artist">{music.artist}</h2>
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    );
};