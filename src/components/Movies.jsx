import React, { useState, useEffect } from "react";
import Image from "../assets/image.jpg";
import axios from "axios";
import Loader from "./Loader";
import Pagination from "./Pagination";
import { useQuery } from "react-query";

function Movies(props) {
  // state variables
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hover, setHover] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [favouritesMovies, setFavouritesMovies] = useState(props.fav);
  
  useEffect(() => {
    (function () {
      // func();
      axios
        .get(
          `https://api.themoviedb.org/3/trending/all/week?api_key=0e91e6cabfc35f7f84a3d9a870b308c5&page=${page}`
        )
        .then((res) => {
          setMovies(res.data.results);
          console.log(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, [page]);

  /*user defined functions*/

  // pagination handlers
  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({top: window.screen.width >= 640 ? 800 : 0, behavior: "smooth"});
    }
  };
  const next = () => {
    setPage(page + 1);
    window.scrollTo({top: window.screen.width >= 640 ? 800 : 0, behavior: "smooth"});
    // console.log("page", page);
  };

  // show and hide emoji functions
  const showEmoji = (id) => {
    setHover(id);
  };
  const hideEmoji = () => {
    setHover("");
  };

  // add and remove from favourites
  const addFav = (movie) => {
    const newList = [...favouritesMovies, movie];
    // console.log("movieee", movie);
    setFavouritesMovies(newList);
    props.addMov(movie);
  };

  const removeFav = (movie) => {
    let filteredt_list = favouritesMovies.filter((i) => {
      return i.id != movie.id;
    });
    setFavouritesMovies(filteredt_list);
    // props.setData(favourites);
    props.deleteData(movie);
  };

  // return result
  return (
    <div className="mt-8">
      <div className="mb-8 font-bold text-2xl text-center">Trending Movies</div>
      <div className="flex flex-wrap justify-center">
        {movies.length === 0 ? (
          <Loader />
        ) : (
          movies.map((movie) => {
            return (
              // starting of single box
              <div
                onMouseOver={() => {
                  showEmoji(movie.id);
                }}
                onMouseLeave={() => {
                  hideEmoji();
                }}
                key={movie.id}
                className="bg-center bg-cover w-[160px] h-[30vh] md:h-[40vh] md:w-[180px] m-4 rounded-xl hover:scale-110 duration-300 flex items-end  relative"
                style={{
                  backgroundImage: `url(${`https://image.tmdb.org/t/p/original${movie.poster_path}`})`,
                }}
              >
                {/* Emoji showing part */}
                <div
                  className="absolute top-2 right-2 bg-gray-900 p-2 rounded-xl"
                  style={{
                    display: hover === movie.id ? "block" : "none",
                  }}
                >
                  {
                  favouritesMovies.reduce((fv, cv)=>{return fv|=(cv.id===movie.id)}, false)
                  ? (
                    <div className="text-2xl" onClick={() => removeFav(movie)}>
                      ❌
                    </div>
                  ) : (
                    <div className="text-2xl" onClick={() => addFav(movie)}>
                      ❤️
                    </div>
                  )}
                </div>

                {/* Movie Name Showing Part at bottom */}
                <div className="font-bold text-white bg-gray-900 bg-opacity-60 p-2 text-center w-full rounded-b-xl">
                  {movie.name || movie.title || movie.original_title || "movie"}
                </div>
              </div>

            );
          })
        )}
      </div>
      <Pagination page={page} next={next} prev={prev}></Pagination>
    </div>
  );
}

export default Movies;

// https://youtu.be/f3JLRIQSaJQ?list=PL05sYGJyIXMp9a1a8fqYhUpdgcCAD8SJd&t=4838
