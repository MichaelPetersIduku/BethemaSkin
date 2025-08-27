import { Carousel } from "primereact/carousel";
import { Image } from "./image";
import React from "react";

export const Gallery = (props) => {
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const itemTemplate = (imageSrc) => {
    console.log("itemTemplate", imageSrc);
    return <img className="cen" src={process.env.PUBLIC_URL + imageSrc} />;
  };
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
                largeImage={process.env.PUBLIC_URL + "/" + "img/portfolio/girldrop.jpeg"}
                smallImage={process.env.PUBLIC_URL + "/" + "img/portfolio/girldrop.jpeg"}
              />
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3 hg-text">
              {/* <Image title="dummy" largeImage={process.env.PUBLIC_URL + "/" + d.largeImage} smallImage={process.env.PUBLIC_URL + "/" + d.smallImage} /> */}
              <div className="xs">
                <img src={process.env.PUBLIC_URL + "/" + "img/leaf.svg"} />
              </div>
              <h5>Born from Real Skin Stories</h5>
              <p>
                Bethema Skin was born from a real struggle with acne, so we know the frustration behind every breakout and the search for skincare that works
                without breaking the bank
              </p>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              <Image
                className="hg"
                title={"Bethema"}
                largeImage={process.env.PUBLIC_URL + "/" + "img/portfolio/brownskin.jpeg"}
                smallImage={process.env.PUBLIC_URL + "/" + "img/portfolio/brownskin.jpeg"}
              />
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3 hg-text">
              {/* <Image title="dummy" largeImage={process.env.PUBLIC_URL + "/" + d.largeImage} smallImage={process.env.PUBLIC_URL + "/" + d.smallImage} /> */}
              <div className="xs">
                <img src={process.env.PUBLIC_URL + "/" + "img/ppe.svg"} />
              </div>
              <h5>Science Meets Affordability</h5>
              <p>Every product is crafted to target real concerns—like acne, hyperpigmentation, and sensitivity—while staying within reach</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="portfolio-items">
            <div className="col-sm-3 col-md-3 col-lg-3 hg-text">
              {/* <Image title="dummy" largeImage={process.env.PUBLIC_URL + "/" + d.largeImage} smallImage={process.env.PUBLIC_URL + "/" + d.smallImage} /> */}
              <div className="xs">
                <img src={process.env.PUBLIC_URL + "/" + "img/com.svg"} />
              </div>
              <h5>Joyful Care, Everyday Confidence</h5>
              <p>At Bethema Skin, we believe skincare is more than products— it’s a ritual of joy, healing, and confidence.</p>
            </div>

            <div className="col-sm-3 col-md-3 col-lg-3">
              <Image
                className="hg"
                title={"Jessica"}
                largeImage={process.env.PUBLIC_URL + "/" + "img/portfolio/gill.jpeg"}
                smallImage={process.env.PUBLIC_URL + "/" + "img/portfolio/gill.jpeg"}
              />
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3 hg-text">
              {/* <Image title="dummy" largeImage={process.env.PUBLIC_URL + "/" + d.largeImage} smallImage={process.env.PUBLIC_URL + "/" + d.smallImage} /> */}
              <div className="xs">
                <img src={process.env.PUBLIC_URL + "/" + "img/afro.svg"} />
              </div>
              <h5>Real Skin. Real Results</h5>
              <p>We keep it simple—no exaggerated claims, no unrealistic beauty ideals</p>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              <Image
                className="hg"
                title={"Vitamin C Serum"}
                largeImage={process.env.PUBLIC_URL + "/" + "img/portfolio/black.jpeg"}
                smallImage={process.env.PUBLIC_URL + "/" + "img/portfolio/black.jpeg"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex-center mt-10">
        <Carousel
          value={["/img/portfolio/Glow.png", "/img/portfolio/Acne.png"]}
          numVisible={1}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={itemTemplate}
          circular
          autoplayInterval={7000}
          showIndicators={false}
          showNavigators={false}
        />

        {/* <img className="cen" src={process.env.PUBLIC_URL + "/" + "img/portfolio/Glow.png"} /> */}
      </div>
      <div className="row sticky-bottom">
        <div className="stn-custom marquee">
          <h6>
            {" "}
            New Product: Pore Balance Multifunctional Serum &emsp;&emsp; New Product: Pore Balance Multifunctional Serum &emsp;&emsp; New Product: Pore Balance
            Multifunctional Serum &emsp;&emsp;New Product: Pore Balance Multifunctional Serum &emsp;&emsp;New Product: Pore Balance Multifunctional Serum
            &emsp;&emsp; New Product: Pore Balance Multifunctional Serum New Product: Pore Balance Multifunctional Serum &emsp;&emsp;New Product: Pore Balance
            Multifunctional Serum &emsp;&emsp;New Product: Pore Balance Multifunctional Serum &emsp;&emsp;New Product: Pore Balance Multifunctional Serum
            &emsp;&emsp;New Product: Pore Balance Multifunctional Serum &emsp;&emsp;{" "}
          </h6>
        </div>
      </div>
    </div>
  );
};
