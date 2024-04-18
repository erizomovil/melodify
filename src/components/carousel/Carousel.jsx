import './Carousel.css'
import { Link, useNavigate } from 'react-router-dom';
import music from "../../models/music/music";

function Carousel() {
    const navigate = useNavigate();

    const handleSongClick = (songId) => {
        console.log("Song ID:", songId);
        console.log("Navigate:", navigate);
        navigate("/inspect/" + songId, { state: { songId: songId } });
    };

    const song1 = music.find(song => song.songId == 1);
    const song2 = music.find(song => song.songId == 2);
    const song3 = music.find(song => song.songId == 3);
    return (
        <>
            <div id="demo" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={`../../../public/assets/images/${song1.img}`} alt="SoundWave1" className="d-block w-100" />
                        <div className="carousel-caption">
                            <div>
                                <h3>{song1.tittle}</h3>
                                <p>From: {song1.author}</p>
                                <p>Genere: {song1.genere}</p>
                            </div>
                            <i onClick={() => handleSongClick(song1.songId)} className="bi bi-play-circle-fill"></i>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={`../../../public/assets/images/${song2.img}`} alt="SoundWave2" className="d-block w-100" />
                        <div className="carousel-caption">
                            <div>
                                <h3>{song2.tittle}</h3>
                                <p>From: {song2.author}</p>
                                <p>Genere: {song2.genere}</p>
                            </div>
                            <i onClick={() => handleSongClick(song2.songId)} className="bi bi-play-circle-fill"></i>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={`../../../public/assets/images/${song3.img}`} alt="SoundWave3" className="d-block w-100" />
                        <div className="carousel-caption">
                            <div>
                                <h3>{song3.tittle}</h3>
                                <p>From: {song3.author}</p>
                                <p>Genere: {song3.genere}</p>
                            </div>
                            <i onClick={() => handleSongClick(song3.songId)} className="bi bi-play-circle-fill"></i>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev" />
                    <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next" />
                </div>
            </div>
        </>
    )
}
export default Carousel