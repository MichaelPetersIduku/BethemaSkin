import React, { useState, useRef } from "react";
import { Card } from "primereact/card";

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
  // const footer = (
  //   <>
  //     <a href="https://flutterwave.com/store/bethemaskin" className="btn btn-custom btn-lg page-scroll">
  //       Buy now
  //     </a>{" "}
  //   </>
  // );
  return (
    <div id="features" className="text-center padding-top-70">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Best Sellers</h2>
        </div>
        <div style={{ marginBottom: "70px" }} className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div style={{ marginBottom: "25px" }} key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
                  {" "}
                  <div className="card flex justify-content-center">
                    <Card
                      title={d.title}
                      // subTitle="Card subtitle"
                      footer={
                        <a href={d.url} className="btn btn-custom btn-lg page-scroll">
                          Buy now
                        </a>
                      }
                      header={<img alt="Card" src={props.data ? process.env.PUBLIC_URL + "/" + d.image : ""} />}
                      className="md:w-25rem"
                    >
                      {/* <p className="m-0">{d.text}</p> */}
                      <DisplayText className="m-0" text={d.text} maxLength={200} />
                    </Card>
                  </div>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
