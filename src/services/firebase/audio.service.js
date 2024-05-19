import { storage } from "./firebase.config"
import { getDownloadURL, ref } from 'firebase/storage';


const getAudioURL = async (audioPath) => {
    const audioRef = ref(storage, audioPath);
    try {
      const downloadURL = await getDownloadURL(audioRef);
      return downloadURL;
    } catch (error) {
      console.error("Error al obtener la URL del audio:", error);
      return null;
    }
};

export default {getAudioURL};