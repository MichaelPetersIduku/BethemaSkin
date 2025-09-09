import React, { useEffect, useState } from "react";
import "../css/ads.css";

export const Ads = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="ads-video-background">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="ads-video-foreground"
        src={
          isMobile
            ? "https://res.cloudinary.com/dbezwd2bu/video/upload/v1756910667/IMG_5972_bn8i9y.mp4"
            : "https://res.cloudinary.com/dbezwd2bu/video/upload/v1756460657/IMG_5933_h6wxls.mov"
        }
        type="video/mp4"
      />
    </div>
  );
};
