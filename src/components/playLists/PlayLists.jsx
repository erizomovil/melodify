import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import playListService from "../../services/firebase/playList.service";
import music from "../../models/music/music";
import './PlayLists.css'

function PlayLists() {

    const [playLists, setPlayLists] = useState([]);

    const navigate = useNavigate();
    const handleSongClick = (songId) => {
        navigate("/inspect/" + songId, { state: { songId: songId } });
        window.location.reload();
    };
    
    const getAllPlayLists = async () => {
        try {
            const items = await playListService.getPlayLists();
            const playlistsArray = [];
            items.forEach((item) => {
                const key = item.key;
                const data = item.val();
                const songs = data.songs || {};
                const playlist = {
                    id: key,
                    name: data.Name,
                    author: data.author,
                    songs: Object.values(songs)
                };
                playlistsArray.push(playlist);
            });
            setPlayLists(playlistsArray);
        } catch (error) {
            console.error("Error fetching playlists:", error);
        }
    }
    const [searchAuthor, setSearchAuthor] = useState('');

    const handleAuthorClick = (e) => {
        setSearchAuthor(e);
    };

    const filteredplayLists = playLists.filter((playList) => {
        return playList.author.includes(searchAuthor);
      });

    useEffect(() => {
        getAllPlayLists();
    }, [])

    return (
        <>
            <div className="order-play-lists">
                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                        Selecciona creador
                    </button>
                    <ul className="dropdown-menu">
                        {playLists.map((playlist) => (
                            <li><a className="dropdown-item" onClick={() => handleAuthorClick(playlist.author)}>{playlist.author}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="play-list">
                {filteredplayLists.map((playlist, index) => (
                    <div key={index}>
                        <h2>{playlist.name}</h2>
                        <table>
                            {playlist.songs.map((song, songIndex) => {
                                let foundSong = music.find(item => item.songId === song);
                                return (
                                    <tr className='inspect-song-list-song' key={songIndex} onClick={() => handleSongClick(foundSong.songId)} style={{ cursor: 'pointer' }}>
                                        <td><img src={`/assets/images/${foundSong.img}`} alt={foundSong.tittle} className="inspect-table-image" /></td>
                                        <td>{foundSong.tittle}</td>
                                        <td>{foundSong.author}</td>
                                        <td>{foundSong.genere}</td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                ))}
            </div>
        </>
    )
}
export default PlayLists