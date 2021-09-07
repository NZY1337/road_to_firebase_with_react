import React from "react";
 
export default function VideoPlayer({ url, autoPlay, controls, location, imgCoverName }) {
  const renderVideoIfExists = () => {
    if (url && typeof url === "string") {
      if (url.includes(".mp4")) {
        return (
          <video style={{ objectFit: "cover", width: "100%", height: "100%" }} autoPlay={autoPlay} controls={controls}>
            <source src={url} type="video/mp4" />
          </video>
        );
      } else {
        if (location === "editor") {
          return <img src={url} style={{ height: "300px", objectFit: "cover" }} />;
        }
      }
    }
  };

  return <>{renderVideoIfExists()}</>;
}
