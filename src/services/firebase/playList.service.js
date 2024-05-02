import { get, ref } from "firebase/database";
import db from "./firebase.config"

const refPlayLists = ref(db, "/Playlists");

const getPlayLists = () => {
    return get(refPlayLists)
}

export default {getPlayLists};