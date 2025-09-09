import React, { useState, useRef } from "react";
import { Card } from "primereact/card";

import styled from "styled-components";

import "../css/features.css";

const Button = styled.button`
  background-color: blue;
  color: white;
`;

function MyButton() {
  return <StyledButton>Click Me</StyledButton>;
}

const StyledButton = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkblue;
  }
`;

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

export const Features = (props) => {
  console.log("props", props.data);
  return (
    <div id="features" className="text-center padding-top-70">
      <div className="">
        <div style={{ marginBottom: "40px" }} className="col-md-10 col-md-offset-1 section-title">
          <h2>Best Sellers</h2>
        </div>
        {/* <div className="row">
          <div className="col-md-6 bg-div">
            <h3>Vitamin C</h3>
            <p>
              Discover our top-selling products that have captured the hearts of our customers. Each item is crafted with care and designed to meet your needs.
            </p>
          </div>
          <div className="col-md-6 bg-div">
            <h3>Vitamin D</h3>
            <p>
              Discover our top-selling products that have captured the hearts of our customers. Each item is crafted with care and designed to meet your needs.
            </p>
          </div>
        </div> */}
        <div style={{}} className="row">
          {props.data
            ? [].map((d, i) => (
                <div
                  className="col-md-4 bg-div"
                  style={{ background: `url(${process.env.PUBLIC_URL + "/" + d.image}) center center no-repeat`, backgroundSize: "cover" }}
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
                // <div style={{ marginBottom: "25px" }} key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
                //   {" "}
                //   <div className="card flex justify-content-center">
                //     <Card
                //       title={d.title}
                //       // subTitle="Card subtitle"
                //       footer={
                //         <a href={d.url} className="btn btn-custom btn-lg page-scroll">
                //           Buy now
                //         </a>
                //       }
                //       header={<img alt="Card" src={props.data ? process.env.PUBLIC_URL + "/" + d.image : ""} />}
                //       className="md:w-25rem"
                //     >
                //       <DisplayText className="m-0" text={d.text} maxLength={200} />
                //     </Card>
                //   </div>
                // </div>
              ))
            : "Loading..."}
        </div>
      </div>

      <div style={{ marginBottom: "70px" }} className="features-row">
        {props.data
          ? props.data.map((d, i) => (
              <div key={`${d.title}-${i}`} className="feature-card">
                <div style={{ height: "fit-content" }} className="card flex justify-content-center">
                  <Card
                    title={d.title}
                    footer={
                      <a href={d.url} className="btn btn-custom btn-lg page-scroll">
                        Buy now
                      </a>
                    }
                    header={
                      <img
                        alt="Card"
                        style={{ width: "100%", height: "220px", objectFit: "cover" }}
                        src={props.data ? process.env.PUBLIC_URL + "/" + d.image : ""}
                      />
                    }
                    className="md:w-25rem"
                    style={{ width: "100%", height: "100%" }} // <-- Added to fill available width and height
                  >
                    <DisplayText className="m-0 text-md h-44px" text={d.text} maxLength={200} />
                    <DisplayText className="m-0 text-bold" text={d.price ? `${d.price}` : ""} maxLength={200} />
                  </Card>
                </div>
              </div>
            ))
          : "Loading..."}
      </div>
    </div>
  );
};
