import React, { useState, useRef } from "react";
import { Card } from "primereact/card";

import styled from "styled-components";

import "../css/features.css";

const DisplayText = ({ className, text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const handleToggle = () => {
    setIsTruncated(!isTruncated);
  };

  const getDisplayedText = () => {
    if (isTruncated && text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <p className={className}>
      {getDisplayedText()}
      {text.length > maxLength && (
        <span onClick={handleToggle} style={{ color: "#a06711", cursor: "pointer" }}>
          {isTruncated ? " view more" : " view less"}
        </span>
      )}
    </p>
  );
};

export const Categories = (props) => {
  console.log("props", props.data);
  return (
    <div id="categories" className="text-center">
      <div className="">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Categories</h2>
        </div>
        <div style={{ marginBottom: "70px" }} className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div
                  className="col-md-6 bg-div"
                  style={{ background: `url(${d.image}) center center no-repeat`, backgroundSize: "cover" }}
                  key={`${d.title}-${i}`}
                >
                  <div class="overlay-div" style={{ backgroundColor: d.bgOverlay }}></div>
                  <div className="text-div">
                    <h3>{d.title}</h3>
                    {/* <DisplayText className="m-0" text={d.text} maxLength={200} /> */}
                    <a href={d.url} className="btn btn-custom btn-lg page-scroll my-button">
                      Buy now
                    </a>
                  </div>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
