import { Image } from "./image";
import React from "react";

export const Gallery = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>Explore images of our skincare essentials, real-life results, and behind-the-scenes moments. Get inspired to achieve your own radiant glow</p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {props.data
              ? props.data.map((d, i) => (
                  <div key={`${d.title}-${i}`} className="col-sm-6 col-md-4 col-lg-4">
                    <Image title={d.title} largeImage={process.env.PUBLIC_URL + "/" + d.largeImage} smallImage={process.env.PUBLIC_URL + "/" + d.smallImage} />
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
