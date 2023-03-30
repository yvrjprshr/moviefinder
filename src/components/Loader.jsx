import React from "react";
import { CirclesWithBar } from "react-loader-spinner";

function Loader() {
  return (
    <div className="flex justify-center h-[60vh] items-center">
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    </div>
  );
}

export default Loader;
