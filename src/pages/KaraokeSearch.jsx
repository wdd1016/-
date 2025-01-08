import React, { useState } from "react";
import axios from "axios";
import "./KaraokeSearch.css";

function KaraokeSearch() {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [songData, setSongData] = useState(null);
  const [lyrics, setLyrics] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!artist || !title) {
      setError("가수 이름과 노래 제목을 입력해주세요.");
      return;
    }

    setLoading(true);
    setError("");
    setSongData(null);
    setLyrics(null);

    try {
      // 1. 제목을 기준으로 검색 (가수는 나중에 필터링)
      const response = await axios.get(
        `https://api.manana.kr/karaoke/song/${encodeURIComponent(title)}.json`
      );

      const filteredSongs = response.data.filter(
        (song) => song.title.toLowerCase() === title.toLowerCase()
      );

      // 2. 가사 검색 (제목과 가수명을 기반으로)
      const lyricsResponse = await axios.get(
        `https://api.lyrics.ovh/v1/${encodeURIComponent(
          artist
        )}/${encodeURIComponent(title)}`
      );
      const fetchedLyrics =
        lyricsResponse.data.lyrics || "가사 정보를 찾을 수 없습니다.";

      // 3. 가수명에 맞는 필터링
      const finalFilteredSongs = filteredSongs.filter(
        (song) => song.singer.toLowerCase() === artist.toLowerCase()
      );

      // 4. 데이터 가공 (회사의 번호로 그룹화)
      if (finalFilteredSongs.length === 0) {
        // 번호가 없으면 가사 표시
        setLyrics(fetchedLyrics);
      } else {
        // 번호가 있으면 회사별로 나눠서 표시 - 왜 안됨
        const groupedData = {
          kumyoung: finalFilteredSongs.filter(
            (song) => song.brand === "kumyoung"
          ),
          tj: finalFilteredSongs.filter((song) => song.brand === "tj"),
          joys: finalFilteredSongs.filter((song) => song.brand === "joysound"),
        };
        setSongData(groupedData);
      }
    } catch (err) {
      setError("검색된 결과가 없습니다. 다시 시도해 주세요.");
    }

    setLoading(false);
  };

  return (
    <div className="karaoke-container">
      <h1>노래방 번호 및 가사 검색</h1>

      {/* 검색 폼 */}
      <div className="search-form">
        <input
          type="text"
          placeholder="가수 이름"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <input
          type="text"
          placeholder="노래 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      {/* 오류 메시지 */}
      {error && <p className="error-message">{error}</p>}

      {/* 로딩 표시 */}
      {loading && <p>로딩 중...</p>}

      {/* 검색된 결과 */}
      {songData && !loading && (
        <div className="song-info">
          <h2>노래 제목: {title}</h2>
          <h3>가수: {artist}</h3>

          {/* 노래방 번호가 있을 경우 회사별로 나누어서 표시 */}
          {songData.kumyoung.length > 0 ||
          songData.tj.length > 0 ||
          songData.joys.length > 0 ? (
            <div className="table-container">
              {songData.kumyoung.length > 0 && (
                <div>
                  <h3>Kumyoung</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>노래방 번호</th>
                      </tr>
                    </thead>
                    <tbody>
                      {songData.kumyoung.map((song, index) => (
                        <tr key={index}>
                          <td>{song.no}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {songData.tj.length > 0 && (
                <div>
                  <h3>TJ</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>노래방 번호</th>
                      </tr>
                    </thead>
                    <tbody>
                      {songData.tj.map((song, index) => (
                        <tr key={index}>
                          <td>{song.no}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {songData.joys.length > 0 && (
                <div>
                  <h3>Joysound</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>노래방 번호</th>
                      </tr>
                    </thead>
                    <tbody>
                      {songData.joys.map((song, index) => (
                        <tr key={index}>
                          <td>{song.no}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <p>해당 노래방 번호는 없습니다.</p>
          )}
        </div>
      )}

      {/* 가사 표시 */}
      {lyrics && !loading && (
        <div>
          <h3>가사:</h3>
          <pre>{lyrics}</pre>
        </div>
      )}
    </div>
  );
}

export default KaraokeSearch;
