import React from "react";

export const About = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="text-center d-mobile">
          <h2>
            Our Story - <span className="subtxt">We’re Bethema Skin</span>
          </h2>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src={props.data ? process.env.PUBLIC_URL + "/" + props.data.image : "loading..."} className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2 className="d-desktop">
                Our Story - <span className="subtxt">We’re Bethema Skin</span>
              </h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              <p>{props.data ? props.data.paragraph1 : "loading..."}</p>
              <p>{props.data ? props.data.paragraph2 : "loading..."}</p>
              {/* <h3>Why Choose Us?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>{props.data ? props.data.Why.map((d, i) => <li key={`${d}-${i}`}>{d}</li>) : "loading"}</ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>{props.data ? props.data.Why2.map((d, i) => <li key={`${d}-${i}`}> {d}</li>) : "loading"}</ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
