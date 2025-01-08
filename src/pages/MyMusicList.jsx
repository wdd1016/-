import React, { useState } from 'react';
import SearchMusic from './SearchMusic';
import './MyMusicList.css';
import MusicDetail from './MusicDetail';

export default function MyMusicList() {
    const [musicList, setMusicList] = useState([]);
    const [visibleDetail, setVisibleDetail] = useState(null);

    const toggleDetail = (title) => {
        setVisibleDetail(visibleDetail === title ? null : title);
    };

    return (
        <div className="MusicList">
            <SearchMusic musicList={musicList} setMusicList={setMusicList} />
            <ul className="musics">
                { musicList.length !== 0 && <h2 className="playlist">내 플레이리스트</h2> }
                {musicList.map((music) => (
                    <li className="music" key={music.title}>
                        <h2 className="title">{music.title}</h2>
                        <h2 className="artist">{music.artist}</h2>
                        <button
                            className="detail"
                            onClick={() => toggleDetail(music.title)}
                        >
                            상세 정보
                        </button>
                        {visibleDetail === music.title && (
                            <MusicDetail artist={music.artist} title={music.title} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
