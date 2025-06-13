import { Image } from "./image";
import React from "react";

export const Gallery = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Proven Formulas for Melanin Rich Skin</h2>
          <p>Your Real is Worthy of Being Seen</p>
        </div>
        {/* <div className="portfolio-items">

                  {props.data
                    ? props.data.map((d, i) => (
                      <div key={`${d.title}-${i}`} className="col-sm-6 col-md-4 col-lg-4">
                        <Image title={d.title} largeImage={process.env.PUBLIC_URL + "/" + d.largeImage} smallImage={process.env.PUBLIC_URL + "/" + d.smallImage} />
                        <div className="section-title">
                          <h2>Rooted in africa, powered by science</h2>
                          <p>We merge world-class formulations and global best practices with the healing benefits of African botanicals to give your skin the nourishment it deserves and to deliver products clinically proven to work on melanated skin</p>
                        </div>
                      </div>
                    ))
                    : "Loading..."}

                </div>
              </div> */}
        <div className="row">
          <div className="portfolio-items">
            <div className="col-sm-3 col-md-3 col-lg-3">
              <Image
                className="hg"
                title={"Bethema"}
                largeImage={process.env.PUBLIC_URL + "/" + "img/portfolio/13.jpg"}
                smallImage={process.env.PUBLIC_URL + "/" + "img/portfolio/13.jpg"}
              />
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3 hg-text">
              {/* <Image title="dummy" largeImage={process.env.PUBLIC_URL + "/" + d.largeImage} smallImage={process.env.PUBLIC_URL + "/" + d.smallImage} /> */}
              <div className="xs">
                <img src={process.env.PUBLIC_URL + "/" + "img/leaf.svg"} />
              </div>
              <h5>K-Made For Us, Made By Us</h5>
              <p>
                We’re building a space where melanated women are celebrated and empowered to take control of their skincare journey. Our products are tested and
                approved by melanated women whose voices have historically been sidelined in beauty and health conversations worldwide.
              </p>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              <Image
                className="hg"
                title={"Bethema"}
                largeImage={process.env.PUBLIC_URL + "/" + "img/portfolio/16.jpg"}
                smallImage={process.env.PUBLIC_URL + "/" + "img/portfolio/16.jpg"}
              />
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3 hg-text">
              {/* <Image title="dummy" largeImage={process.env.PUBLIC_URL + "/" + d.largeImage} smallImage={process.env.PUBLIC_URL + "/" + d.smallImage} /> */}
              <div className="xs">
                <img src={process.env.PUBLIC_URL + "/" + "img/ppe.svg"} />
              </div>
              <h5>Rooted in Africa, Powered by Science</h5>
              <p>
                We merge world-class formulations and global best practices with the healing benefits of African botanicals to give your skin the nourishment it
                deserves and to deliver products clinically proven to work on melanated skin
              </p>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="portfolio-items">
            <div className="col-sm-3 col-md-3 col-lg-3 hg-text">
              {/* <Image title="dummy" largeImage={process.env.PUBLIC_URL + "/" + d.largeImage} smallImage={process.env.PUBLIC_URL + "/" + d.smallImage} /> */}
              <div className="xs">
                <img src={process.env.PUBLIC_URL + "/" + "img/com.svg"} />
              </div>
              <h5>Unapologetic Jo</h5>
              <p>
                WHarnessing the power of affirmations, bold packaging, and compelling yet honest stories from our community, we redefine your daily routine into
                a joyous and inspiring ceremony.
              </p>
            </div>

            <div className="col-sm-3 col-md-3 col-lg-3">
              <Image
                className="hg"
                title={"Jessica"}
                largeImage={process.env.PUBLIC_URL + "/" + "img/portfolio/15.jpg"}
                smallImage={process.env.PUBLIC_URL + "/" + "img/portfolio/15.jpg"}
              />
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3 hg-text">
              {/* <Image title="dummy" largeImage={process.env.PUBLIC_URL + "/" + d.largeImage} smallImage={process.env.PUBLIC_URL + "/" + d.smallImage} /> */}
              <div className="xs">
                <img src={process.env.PUBLIC_URL + "/" + "img/afro.svg"} />
              </div>
              <h5>Real is Revolutionary</h5>
              <p>
                We refuse to airbrush our models or uphold antiquated ideals. We’re here to inspire confidence and encourage growth by loving and celebrating
                what’s real.
              </p>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              <Image
                className="hg"
                title={"Vitamin C Serum"}
                largeImage={process.env.PUBLIC_URL + "/" + "img/portfolio/14.jpg"}
                smallImage={process.env.PUBLIC_URL + "/" + "img/portfolio/14.jpg"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row sticky-bottom">
        <div className="stn-custom marquee">
          <h6>
            {" "}
            I AM RESTORED / I AM RESTORED / I AM RESTORED / I AM RESTORED / I AM RESTORED / I AM RESTORED / I AM RESTORED / I AM RESTORED / I AM RESTORED / I AM
            RESTORED / I AM RESTORED / I AM RESTORED / I AM RESTORED / I AM RESTORED /{" "}
          </h6>
        </div>
      </div>
    </div>
  );
};
