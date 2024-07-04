import React from "react";
import { Carousel } from "primereact/carousel";

export const Header = (props) => {
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

  const itemTemplate = (carouselItem) => {
    return (
      <div id="introCarousel" className={carouselItem.imageClass}>
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {carouselItem.text}
                  <span></span>
                </h1>
                <p>{carouselItem.subtext}</p>
                <a href="https://bethemaskin.bumpa.shop/" className="btn btn-custom btn-lg page-scroll">
                  Shop now
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header id="header">
      <Carousel
        value={props.data ? props.data.carousel : []}
        numVisible={1}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        itemTemplate={itemTemplate}
        circular
        autoplayInterval={3000}
        showIndicators={false}
        showNavigators={false}
      />
    </header>
  );
};
