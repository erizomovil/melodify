import { useLocation, useNavigate } from 'react-router-dom';
import './Inspect.css'
import Header from "../../components/header/Header"
import music from "../../models/music/music";
import Footer from "../../components/footer/Footer";
import { useEffect } from 'react';

function Inspect() {
    const location = useLocation();
    const { state } = location || {};
    const songId = state && state.songId;

    const song = songId ? music.find(song => song.songId === songId) : null;

    const navigate = useNavigate();

    const handleSongClick = (songId) => {
        navigate("/inspect/" + songId, { state: { songId: songId } });
        window.location.reload();
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />

            <div className="inspect-container">
                <div className="inspect-container-card-1">
                    <div className="inspect-container-card">
                        <div className="inspect-container-card-image">
                            <img src={song ? `/assets/images/${song.img}` : 'N/A'} alt={song ? song.tittle : 'N/A'} className="inspect-image" />
                        </div>
                        <div className="inspect-container-card-content">
                            <div className="inspect-container-card-text">
                                <div>canción: {song ? song.tittle : 'N/A'}</div>
                                <div>autor: {song ? song.author : 'N/A'}</div>
                                <div>género: {song ? song.genere : 'N/A'}</div>
                            </div>
                            <div className="inspect-container-card-audio">
                                {song && (
                                    <audio controls autoPlay>
                                        <source src={`/assets/music/${song.src}`} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inspect-song-list">
                    <table>
                        {music.map((song, id) => (
                            <tr className='inspect-song-list-song' key={id} onClick={() => handleSongClick(song.songId)} style={{ cursor: 'pointer' }}>
                                <td><img src={`/assets/images/${song.img}`} alt={song.tittle} className="inspect-table-image" /></td>
                                <td>{song.tittle}</td>
                                <td>{song.author}</td>
                                <td>{song.genere}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Inspect