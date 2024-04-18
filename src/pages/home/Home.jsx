import Carousel from "../../components/carousel/Carousel"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import music from "../../models/music/music"
import React, { useState, useEffect } from "react";
import "./Home.css"

function Home() {

    const [popularSongs, setPopularSongs] = useState([]);
    const [popularAuthors, setPopularAuthors] = useState([]);
    const [popularGenres, setPopularGenres] = useState([]);

    useEffect(() => {

        const randomSongs = getRandomItems(music, 5);
        setPopularSongs(randomSongs);

        const authors = music.map((song) => song.author);
        const uniqueAuthors = [...new Set(authors)];
        const randomAuthors = getRandomItems(uniqueAuthors, 5);
        setPopularAuthors(randomAuthors);


        const genres = music.map((song) => song.genere);
        const uniqueGenres = [...new Set(genres)];
        const randomGenres = getRandomItems(uniqueGenres, 5);
        setPopularGenres(randomGenres);
    }, []);

    const getRandomItems = (list, count) => {
        const shuffled = list.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    return (
        <>
            <Header />
            <div className="home-container">
                <div className="home-container-first">
                    <div className="home-container-carousel">
                        <Carousel />
                    </div>
                </div>
                <div className="home-container-second">
                    <div className="home-column">
                        <h3>Canciones populares</h3>
                        <ul id="home-songs-list">
                            {popularSongs.map((song, index) => (
                                <li key={index}>{song.tittle}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="home-column">
                        <h3>Autores populares</h3>
                        <ul id="home-authors-list">
                            {popularAuthors.map((author, index) => (
                                <li key={index}>{author}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="home-column">
                        <h3>Géneros populares</h3>
                        <ul id="home-generes-list">
                            {popularGenres.map((genre, index) => (
                                <li key={index}>{genre}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}
export default Home
