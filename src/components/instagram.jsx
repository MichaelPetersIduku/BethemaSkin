import React from "react";
import { InstagramEmbed } from "react-social-media-embed";

const InstagramCarousel = () => {
  return (
    <div className="instagram-container">
      <InstagramEmbed
        className="instagram-embed"
        url="https://www.instagram.com/reel/C6UEe-rM0gc/?utm_source=ig_embed&amp;utm_campaign=loading"
        width={328}
        height={608}
      />
      <InstagramEmbed
        className="instagram-embed"
        url="https://www.instagram.com/reel/C5WQRb_oMTH/?utm_source=ig_embed&amp;utm_campaign=loading"
        width={328}
        height={608}
      />
      <InstagramEmbed
        className="instagram-embed"
        url="https://www.instagram.com/reel/C4upcQZINI5/?utm_source=ig_embed&amp;utm_campaign=loading"
        width={328}
        height={608}
      />
      <InstagramEmbed
        className="instagram-embed"
        url="https://www.instagram.com/reel/C5ZLNQmML2a/?utm_source=ig_embed&amp;utm_campaign=loading"
        width={328}
        height={608}
      />
    </div>
  );
};

export default InstagramCarousel;
