import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
function Banner() {
  const [bannerMovie, setBannerMovie] = useState("");
  
  useEffect(() => {
    (function () {
      axios
        .get(
          "https://api.themoviedb.org/3/trending/all/week?api_key=0e91e6cabfc35f7f84a3d9a870b308c5"
        )
        .then((res) => {
          setBannerMovie(res.data.results[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  return (
    <>
      {
        bannerMovie === "" ? <Loader/> : 
      <div
        className="h-[40vh] md:h-[60vh] lg:h-[80vh] xl:h-[100vh] bg-cover bg-center flex items-end relative`"
        style={
          {
            backgroundImage: `url(https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path})`
          }
        }
      >
        <div className="text-2xl text-white bg-gray-900 w-full text-center bg-opacity-60 p-5 ">
          {bannerMovie.title || bannerMovie.name}
        </div>
      </div>
      }
    </>
  );
}

export default Banner;
