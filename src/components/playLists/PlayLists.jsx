import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import playListService from "../../services/firebase/playList.service";
import music from "../../models/music/music";
import './PlayLists.css'

function PlayLists() {

    const [playLists, setPlayLists] = useState([]);
    const [searchAuthor, setSearchAuthor] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [playlistName, setPlaylistName] = useState('');
    const [currentPlaylist, setCurrentPlaylist] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [songIds, setSongIds] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [oldSongArray, setOldSongArray] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [playName, setPlayName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [songArray, setSongArray] = useState([]);

    const navigate = useNavigate();
    const handleSongClick = (songId) => {
        if (!isEditing) {
            navigate("/inspect/" + songId, { state: { songId: songId } });
            window.location.reload();
        }
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

    const handleAuthorClick = (e) => {
        setSearchAuthor(e);
    };

    const getUniqueAuthors = (playLists) => {
        return [...new Set(playLists.map((playlist) => playlist.author))];
    };

    const filteredplayLists = playLists.filter((playList) => {
        if (!searchAuthor) {
            return playList;
        }
        return playList.author.includes(searchAuthor);
    });

    const handleDeletePlaylist = (e) => {
        playListService.deletePlayList(e.id);
        location.reload();
    }

    const handleEdit = (index) => {
        setIsEditing(true);
        setEditingIndex(index);
        setPlaylistName(filteredplayLists[index].name);
    };

    const handleSave = () => {
        setIsEditing(false);
        setEditingIndex(null);
        location.reload();
    };

    const handleChange = (e, playlist) => {
        setPlaylistName(e.target.value);
        playListService.changePlayListName(e.target.value, playlist.id);
    };

    const handleRemoveSong = async (s, e) => {
        await playListService.deleteSongOfPlayList(s.songId, e.id);
    }

    const handleAddSongToPlaylist = (e) => {
        setCurrentPlaylist(e);
        setSearchQuery('');
    }

    const addSongToOldPlayList = (s) => {
        setOldSongArray([...oldSongArray, s]);
    }

    const addSongToNewPlayList = (song) => {
        setSongIds([...songIds, song.songId]);
        setSongArray([...songArray, song]);
        setSelectedSongs([...selectedSongs, song]);
    };

    const filteredSongs = music.filter(
        (song) =>
            song.tittle &&
            song.tittle.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !selectedSongs.some((selectedSong) => selectedSong.songId === song.songId)
    );

    const filteredOldSongs = music.filter(song => {
        const songTitleExists = song.tittle && song.tittle.toLowerCase().includes(searchQuery.toLowerCase());
        const songNotInCurrentPlaylist = currentPlaylist && Array.isArray(currentPlaylist.songs) && !currentPlaylist.songs.includes(song.songId);
        const songNotInOldSongArray = Array.isArray(oldSongArray) && !oldSongArray.map(s => s.songId).includes(song.songId);
        return songTitleExists && songNotInCurrentPlaylist && songNotInOldSongArray;
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (playName != "" && authorName != "" && songIds.length != 0) {
            await playListService.addPlayList(playName, authorName, songIds);
        }
        emptyPlaylist();
    };

    function emptyPlaylist() {
        setPlayName('');
        setAuthorName('');
        setSongIds([]);
        setSongArray([]);
        setSearchQuery('');
        setSelectedSongs([]);
    }

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
                        <li><a className="dropdown-item" onClick={() => handleAuthorClick(null)}>Todos</a></li>
                        {getUniqueAuthors(playLists).map((author) => (
                            <li><a className="dropdown-item" onClick={() => handleAuthorClick(author)}>{author}</a></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newPLaylistModal">Añadir</button>
                </div>
            </div>
            <div className="play-list">
                {filteredplayLists.map((playlist, index) => (
                    <div key={index} className="playlist-containers">
                        <div className="playlist-header">
                            {isEditing && editingIndex === index ? (
                                <input
                                    type="text"
                                    className="playlist-name"
                                    value={playlistName}
                                    onChange={(e) => handleChange(e, playlist)}
                                />
                            ) : (
                                <h2 className="playlist-name">{playlist.name}</h2>
                            )}
                            <div className="playlist-buttons">
                                {!isEditing && (
                                    <button className="edit-button" onClick={() => handleEdit(index)}>
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                )}
                                {isEditing && editingIndex === index && (
                                    <button className="save-button" onClick={() => handleSave()}>
                                        Save
                                    </button>
                                )}
                                <button className="delete-button" onClick={() => handleDeletePlaylist(playlist)}>
                                    <i className="bi bi-trash3-fill"></i>
                                </button>
                            </div>
                        </div>
                        <ul className="inspect-playlist-song-list">
                            {playlist.songs.map((song, songIndex) => {
                                let foundSong = music.find(item => item.songId === song);
                                return (
                                    <li className='inspect-song-list-song' key={songIndex} onClick={() => handleSongClick(foundSong.songId)}>
                                        <div className="song-item-container">
                                            <img src={`/assets/images/${foundSong.img}`} alt={foundSong.tittle} className="inspect-list-image" />
                                            <div className="song-details">
                                                <div className="song-title">{foundSong.tittle}</div>
                                                <div className="song-author">{foundSong.author}</div>
                                                <div className="song-genre">{foundSong.genere}</div>
                                            </div>
                                            {isEditing && editingIndex === index && (
                                                <button className="remove-song-button" onClick={() => handleRemoveSong(foundSong, playlist)}>
                                                    <i className="bi bi-x"></i>
                                                </button>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                            {isEditing && editingIndex === index && (
                                <li className="add-song-button" onClick={() => handleAddSongToPlaylist(playlist)}>
                                    <button className="add-song-button" data-bs-toggle="modal" data-bs-target="#AddSongModal">Agregar Canción</button>
                                </li>
                            )}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="modal" id="AddSongModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Añadir canción</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"><i class="bi bi-x-lg"></i></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Buscar canción..."
                            />
                            <ul className="song-list">
                                {searchQuery.trim() !== '' &&
                                    filteredOldSongs.map(song => (
                                        <li key={song.songId}>
                                            <span>{song.tittle}</span>
                                            <button type="button" className="btn-add" onClick={() => addSongToOldPlayList(song)}>Añadir</button>
                                        </li>
                                    ))
                                }
                            </ul>
                            <label>
                                Canciones seleccionadas:
                                <ul className="song-list">
                                    {oldSongArray.map((song) => (
                                        <li key={song.songId}>{song.tittle}</li>
                                    ))}
                                </ul>
                            </label>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    console.log(currentPlaylist.id);
                                    oldSongArray.forEach(song => playListService.addSongToPlayList(song.songId, currentPlaylist.id));
                                    setOldSongArray([]);
                                }}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" id="newPLaylistModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Añadir Playlist</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => emptyPlaylist()}><i class="bi bi-x-lg"></i></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Nombre de la lista de reproducción:
                                    <input
                                        type="text"
                                        value={playName}
                                        onChange={(e) => setPlayName(e.target.value)}
                                    />
                                </label>
                                <br />
                                <label>
                                    Nombre del autor:
                                    <input
                                        type="text"
                                        value={authorName}
                                        onChange={(e) => setAuthorName(e.target.value)}
                                    />
                                </label>
                                <br />
                                <label>
                                    Buscar canción:
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Buscar canción..."
                                    />
                                </label>
                                <ul className="song-list">
                                    {searchQuery.trim() !== '' &&
                                        filteredSongs.map((song) => (
                                            <li key={song.songId}>
                                                <span>{song.tittle}</span>
                                                <button type="button" className="btn-add" onClick={() => addSongToNewPlayList(song)}>Añadir</button>
                                            </li>
                                        ))}
                                </ul>
                                <label>
                                    Canciones seleccionadas:
                                    <ul className="song-list">
                                        {songArray.map((song) => (
                                            <li key={song.songId}>{song.tittle}</li>
                                        ))}
                                    </ul>
                                </label>
                                <br />
                                <button type="submit" className="btn-submit" data-bs-dismiss="modal" onClick={() => location.reload()}>Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PlayLists