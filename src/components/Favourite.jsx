import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import axios, { all } from "axios";
// import 'font-awesome/css/font-awesome.min.css';
// import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function Favourite(props) {
  const [favMovies, setFavMovies] = useState(props.fav);
  const [favAllGenres, setFavAllGenres] = useState([]);
  const [currSelectedGenre, setCurrSelectedGenre] = useState("All");
  const [modifiedFavMovies, setModifiedFavMovies] = useState(favMovies);
  const genreList = {
    12: "Adventure",
    14: "Fantasy",
    16: "Animation",
    18: "Drama",
    27: "Horror",
    28: "Action",
    35: "Comedy",
    36: "History",
    37: "Western",
    53: "Thriller",
    80: "Crime",
    99: "Documentary",
    878: "Science Fiction",
    9648: "Mystery",
    10402: "Music",
    10749: "Romance",
    10751: "Family",
    10752: "War",
    10770: "TV Movie",
  };

  useEffect(() => {
    let temp = [];
    favMovies.forEach((movie) => {
      movie.genre_ids.forEach((id) => {
        temp.push(genreList[id]);
      });
    });

    temp = temp.filter((x) => {
      return x != undefined && x.length > 0;
    });
    temp = new Set(temp);

    setFavAllGenres(["All", ...temp]);
  }, []);

  /* --------------------------user defined function--------------------------- */

  // sort ascending order by rating
  const sortRatingAsc = () => {
    let x = [...modifiedFavMovies];
    x.sort((a, b) => a.vote_average - b.vote_average);
    setModifiedFavMovies(x);
  };

  // sort descending order by rating
  const sortRatingDesc = () => {
    let x = [...modifiedFavMovies];
    x.sort((a, b) => b.vote_average - a.vote_average);
    setModifiedFavMovies(x);
  };

  // sort ascending order by pupularity
  const sortPopularityAsc = () => {
    let x = [...modifiedFavMovies];
    x.sort((a, b) => a.popularity - b.popularity);
    setModifiedFavMovies(x);
  };

  // sort descending order by popularity
  const sortPopularityDesc = () => {
    let x = [...modifiedFavMovies];
    x.sort((a, b) => b.popularity - a.popularity);
    setModifiedFavMovies(x);
  };

  // set modifiedmovies based on newly selected genre
  const setModifiedFavMoviesGenre = (genre) => {
    let list = favMovies.filter((movie) => {
      let res = false;
      movie.genre_ids.forEach((id) => {
        res |= genre == genreList[id];
      });
      return res;
    });
    if (genre === "All") list = [...favMovies];
    setModifiedFavMovies(list);
  };

  // set modifiedmovies based on given input
  const setModifiedFavMoviesInput = (txt) => {
    let list = modifiedFavMovies.filter((movie) => {
      if (movie.name !== undefined && movie.name.toLowerCase().includes(txt))
        return true;
      if (movie.title !== undefined && movie.title.toLowerCase().includes(txt))
        return true;
      if (
        movie.original_title !== undefined &&
        movie.original_title.toLowerCase().includes(txt)
      )
        return true;
      return false;
    });
    {
      setModifiedFavMovies(list);
    }
  };

  // deleted fav movie
  const deleteFavMovie = (movie) => {
    let newList = modifiedFavMovies.filter((m) => {
      return m.id !== movie.id;
    });
    setModifiedFavMovies([...newList]);
    props.deleteData(movie);
  };
  return (
    <div>
      {/* filter based on genre */}
      <div className="mt-6 flex space-x-2 justify-center flex-wrap">
        {favAllGenres.map((g) => {
          return (
            <button
              onClick={() => {
                setCurrSelectedGenre(g);
                setModifiedFavMoviesGenre(g);
              }}
              className="bg-gray-700 m-2 py-1 px-2 rounded-lg font-bold text-lg text-white hover:bg-blue-400"
              style={{
                backgroundColor: currSelectedGenre == g ? "#008080" : "gray",
              }}
            >
              {g}
            </button>
          );
        })}
      </div>

      {/* searching boxes */}
      <div className="mt-6 flex justify-center space-x-4">
        <input
          type="text"
          placeholder="search"
          className="border-2 border-gray-300 px-1 py-2 rounded-lg text-center"
          onInput={(e) => {
            setModifiedFavMoviesInput(e.target.value);
          }}
        />
        {/* <input
          type="number"
          className="border-2 border-gray-300 px-1 py-2 rounded-lg text-center"
          value={1}
          onChange={(e) => {
            console.log(e.target);
          }}
        /> */}
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-2 py-4 md:px-6 font-medium text-gray-900"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-2 py-4 md:px-6 font-medium text-gray-900 "
              >
                <div className="flex flex-col text-center justify-center md:flex-row">
                  <div>
                    <FontAwesomeIcon
                      onClick={() => {
                        sortRatingDesc();
                      }}
                      icon={faCaretUp}
                      className="mr-1 hover:cursor-pointer"
                    />
                  </div>
                  <div>Rating</div>
                  <div>
                    <FontAwesomeIcon
                      onClick={() => {
                        sortRatingAsc();
                      }}
                      icon={faCaretDown}
                      className="ml-1 hover:cursor-pointer"
                    />
                  </div>
                </div>
              </th>
              <th
                scope="col"
                className="px-2 py-4 md:px-6 font-medium text-gray-900"
              >
                <div className="flex flex-col text-center md:flex-row justify-center">
                  <FontAwesomeIcon
                    onClick={() => {
                      sortPopularityDesc();
                    }}
                    icon={faCaretUp}
                    className="mr-1 hover:cursor-pointer"
                  />
                  <div>Popularity</div>
                  <FontAwesomeIcon
                    onClick={() => {
                      sortPopularityAsc();
                    }}
                    icon={faCaretDown}
                    className="ml-1 hover:cursor-pointer"
                  />
                </div>
              </th>
              <th
                scope="col"
                className="px-2 py-4 md:px-6 font-medium text-gray-900 hidden md:table-cell"
              >
                Genre
              </th>
              <th
                scope="col"
                className="px-2 py-4 md:px-6 font-medium text-gray-900 text-right"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {modifiedFavMovies.map((movie) => {
              return (
                <tr className="hover:bg-gray-50" key={movie.id}>
                  <th className="flex gap-3 px-2 py-4 md:px-6 font-normal text-gray-900">
                    <img
                      className="md:h-[7rem] md:w-[10rem] md:block  object-fit hidden"
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt=""
                    />
                    <div className="text-sm flex items-center">
                      <div className="font-medium text-gray-700">
                        {movie.name || movie.title || movie.original_title}
                      </div>
                    </div>
                  </th>
                  <td className="px-2 py-4 md:px-6 text-center">
                    {movie.vote_average.toFixed(2)}
                  </td>

                  <td className="px-2 py-4 md:px-6 text-center">
                    {movie.popularity.toFixed(2)}
                  </td>
                  <td className="px-2 py-4 md:px-6 hidden md:table-cell">
                    <div className="flex gap-2 items-center ">
                      {movie.genre_ids.map((genre) => {
                        return (
                          <span
                            className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                            style={{
                              display:
                                genreList[genre] !== undefined &&
                                genreList[genre].length > 0
                                  ? "block"
                                  : "none",
                            }}
                          >
                            {genreList[genre]}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-2 py-4 md:px-6 text-right"> 
                    <div>
                      <FontAwesomeIcon
                        onClick={() => {
                          deleteFavMovie(movie);
                        }}
                        icon={faTrash}
                        className="mr-1 hover:cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <Pagination></Pagination> */}
    </div>
  );
}

export default Favourite;
