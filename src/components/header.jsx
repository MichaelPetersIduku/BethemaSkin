import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";

export const Header = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div className="video-background">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="video-foreground"
          src="https://res.cloudinary.com/dbezwd2bu/video/upload/v1756855969/IMG_5953_tanjlw.mp4"
          type="video/mp4"
        />
      </div>
      // <div style={{ cursor: "pointer" }} onClick={() => window.open("https://shop.bethemaskin.com/")} id="introCarousel" className={carouselItem.imageClass}>
      //   <div className="overlay">
      //     <div className="container">
      //       <div className="row">
      //         <div className="col-md-8 col-md-offset-2 intro-text">
      //           <h1>
      //             {carouselItem.text}
      //             <span></span>
      //           </h1>
      //           <p>{carouselItem.subtext}</p>
      //           {!!carouselItem.text ? (
      //             <a href="https://shop.bethemaskin.com/" className="btn btn-custom btn-lg page-scroll">
      //               Shop now
      //             </a>
      //           ) : (
      //             ""
      //           )}
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  };

  return (
    <header id="header overlay">
      {isMobile ? (
        <div className="video-background">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="video-foreground"
            src="https://res.cloudinary.com/dbezwd2bu/video/upload/v1756855053/IMG_5951_vju8ek.mov"
            type="video/mp4"
          />
        </div>
      ) : (
        <Carousel
          value={props.data ? props.data.carousel : []}
          numVisible={1}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={itemTemplate}
          // circular
          // autoplayInterval={3000}
          showIndicators={false}
          showNavigators={false}
        />
      )}
    </header>
  );
};
