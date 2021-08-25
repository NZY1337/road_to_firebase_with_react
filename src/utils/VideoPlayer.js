import React from "react";

export default function VideoPlayer({ url }) {
  const renderVideoIfExists = () => {
    if (url && url.includes(".mp4")) {
      return (
        <video style={{ objectFit: "cover", width: "100%", height: "100%" }} autoPlay>
          <source src={url} type="video/mp4" />
        </video>
      );
    } else {
      return null;
    }
  };

  return <>{renderVideoIfExists()}</>;
}
