import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Pagination from "./components/Pagination";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favourite from "./components/Favourite";
import Pagenotfound from "./components/Pagenotfound";
import Loader from "./components/Loader";
function App() {
  const tempMovies = [
    {
      adult: false,
      backdrop_path: "/ovM06PdF3M8wvKb06i4sjW3xoww.jpg",
      id: 76600,
      title: "Avatar: The Way of Water",
      original_language: "en",
      original_title: "Avatar: The Way of Water",
      overview: "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
      poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
      media_type: "movie",
      genre_ids: [
        878,
        12,
        28
      ],
      popularity: 6789.789,
      release_date: "2022-12-14",
      video: false,
      vote_average: 7.737,
      vote_count: 6124
    },
    {
      adult: false,
      backdrop_path: "/i8dshLvq4LE3s0v8PrkDdUyb1ae.jpg",
      id: 603692,
      title: "John Wick: Chapter 4",
      original_language: "en",
      original_title: "John Wick: Chapter 4",
      overview: "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
      poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
      media_type: "movie",
      genre_ids: [
        28,
        53,
        80
      ],
      popularity: 2803.482,
      release_date: "2023-03-22",
      video: false,
      vote_average: 8.163,
      vote_count: 486
    },
    {
      adult: false,
      backdrop_path: "/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
      id: 100088,
      name: "The Last of Us",
      original_language: "en",
      original_name: "The Last of Us",
      overview: "Twenty years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone. What starts as a small job soon becomes a brutal, heartbreaking journey, as they both must traverse the United States and depend on each other for survival.",
      poster_path: "/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
      media_type: "tv",
      genre_ids: [
        18
      ],
      popularity: 1849.192,
      first_air_date: "2023-01-15",
      vote_average: 8.767,
      vote_count: 2996,
      origin_country: [
        "US"
      ]
    },
    {
      adult: false,
      backdrop_path: "/6Lw54zxm6BAEKJeGlabyzzR5Juu.jpg",
      id: 82856,
      name: "The Mandalorian",
      original_language: "en",
      original_name: "The Mandalorian",
      overview: "After the fall of the Galactic Empire, lawlessness has spread throughout the galaxy. A lone gunfighter makes his way through the outer reaches, earning his keep as a bounty hunter.",
      poster_path: "/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg",
      media_type: "tv",
      genre_ids: [
        10765,
        10759,
        18
      ],
      popularity: 1671.798,
      first_air_date: "2019-11-12",
      vote_average: 8.487,
      vote_count: 8678,
      origin_country: [
        "US"
      ]
    }
  ];
  const [fav, setFav] = useState(tempMovies);
  const addMov = (mov) => {
    setFav([...fav, mov]);
  };
  const deleteData = (movie) => {
    const newList = fav.filter((m)=>{
      return movie.id!==m.id;
    })
    setFav([...newList]);
  };
  
  return (

    <>
      <BrowserRouter>
        {/* hello react */}
        {/* 
      - NavBar
      - Banner
      - Movies
      - Pagination 
      */}
        <Navbar></Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner></Banner>
                <Movies fav={fav} addMov={addMov} deleteData={deleteData}></Movies>
              </>
            }
          ></Route>
          <Route
            path="/fav"
            element={<Favourite fav={fav} deleteData={deleteData}></Favourite>}
          ></Route>
          <Route path="*" element={<Pagenotfound></Pagenotfound>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
