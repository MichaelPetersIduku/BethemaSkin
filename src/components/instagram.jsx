import React from "react";
import { InstagramEmbed } from "react-social-media-embed";

const InstagramCarousel = () => {
  return (
    <div className="instagram-container padding-bottom-70">
      <InstagramEmbed className="instagram-embed" url="https://www.instagram.com/reel/DN6CAaQjdIx/?igsh=MTB0NG95dGV3bjhwbQ==" width={328} height={608} />
      <InstagramEmbed className="instagram-embed" url="https://www.instagram.com/p/DL-W3VWouIh/?igsh=MXhvemFzMXV1ang5aQ==" width={328} height={608} />
      <InstagramEmbed className="instagram-embed" url="https://www.instagram.com/reel/DCE31-fO72k/?igsh=anZxanUxdnpuOGJk" width={328} height={608} />
      <InstagramEmbed className="instagram-embed" url="https://www.instagram.com/reel/DJ4KGjLI5Z-/?igsh=cnlodWo3MHg5cndi" width={328} height={608} />
    </div>
  );
};

export default InstagramCarousel;
