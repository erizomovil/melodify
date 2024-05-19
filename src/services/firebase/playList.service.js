import { db } from "./firebase.config"
import { get, ref, set, remove } from "firebase/database";

const refPlayLists = ref(db, "/Playlists");

const getPlayLists = () => {
  return get(refPlayLists)
}

const addPlayList = async (playName, authorName, songArray) => {
  const playlistsRef = ref(db, 'Playlists');

  const snapshot = await get(playlistsRef);

  let newId = 1;
  if (snapshot.exists()) {
    const data = snapshot.val();
    newId = Object.keys(data).length + 1;
  }

  const songs = arrayToSongsObject(songArray);

  const newPlaylistRef = ref(db, `Playlists/${newId}`);
  await set(newPlaylistRef, {
    Name: playName,
    author: authorName,
    songs: songs,
  });
}

function arrayToSongsObject(array) {
  const songs = {};
  array.forEach((song, index) => {
    songs[`song${index + 1}`] = song;
  });
  return songs;
}

function deletePlayList(playlistId) {
  const playlistRef = ref(db, `Playlists/${playlistId}`);
  remove(playlistRef)
}

async function deleteSongOfPlayList(song, playlistId) {
  const playlistRef = ref(db, `Playlists/${playlistId}/songs`);

  const snapshot = await get(playlistRef);

  let songKey;
  snapshot.forEach(child => {
    if (child.val() === song) {
      songKey = child.key;
    }
  });

  if (songKey) {
    const songRef = ref(db, `Playlists/${playlistId}/songs/${songKey}`);
    await remove(songRef);
  } else {
    console.log(`No se encontró ninguna canción con el valor ${song} en la lista de reproducción con ID ${playlistId}.`);
  }
}

async function addSongToPlayList(song, playlistId) {
  const playlistsRef = ref(db, `Playlists/${playlistId}/songs`);
  const playlistSnapshot = await get(playlistsRef);
  const playlistData = playlistSnapshot.val();
  const songCount = Object.keys(playlistData).length; // Obteniendo el número de canciones
  const nextSongName = `song${songCount + 1}`;

  await set(ref(db, `Playlists/${playlistId}/songs/${nextSongName}`), song);
}

function changePlayListName(name,playlistId) {
  const playlistsRef = ref(db, `Playlists/${playlistId}/Name`);
  set(playlistsRef,name)
}

export default { getPlayLists, addPlayList, deletePlayList, deleteSongOfPlayList, addSongToPlayList, changePlayListName };