import music from "../../models/music/music";
import { useNavigate } from 'react-router-dom';
import './List.css'
function List() {
    const navigate = useNavigate();

    const handleSongClick = (songId) => {
        console.log("Song ID:", songId);
        console.log("Navigate:", navigate);
        navigate("/inspect/"+songId, { state: { songId: songId } });
    };

    return (
    
        <div className="discovery-grid-container">
            {music.map((song,id) => (
                <div className="discovery-grid-container-div" key={id} onClick={() => handleSongClick(song.songId)} style={{ cursor: 'pointer' }}>
                    <img src={`../../../public/assets/images/${song.img}`} alt={song.title}/>
                    <div>{song.tittle}</div>
                    <div>{song.author}</div>
                    <div>{song.genere}</div>
                </div>
            ))}
        </div>
    );
};

export default List;