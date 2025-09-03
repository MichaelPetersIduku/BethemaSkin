import React from "react";
import "../css/ads.css";

export const Ads = (props) => {
  return (
    <div className="ads-video-background">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="ads-video-foreground"
        src="https://res.cloudinary.com/dbezwd2bu/video/upload/v1756460657/IMG_5933_h6wxls.mov"
        type="video/mp4"
      />
    </div>
  );
};
