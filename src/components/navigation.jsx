import React from "react";

export const Navigation = (props) => {
  window.addEventListener("scroll", function () {
    var navbar = document.getElementById("menu");
    if (window.scrollY > 0) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            {" "}
            <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            Bethema Skin
          </a>{" "}
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="https://shop.bethemaskin.com/" className="page-scroll">
                Shop
              </a>
            </li>
            {/* <li>
              <a href="#features" className="page-scroll">
                Products
              </a>
            </li> */}
            <li>
              <a href="#features" className="page-scroll">
                Best Sellers
              </a>
            </li>
            {/* <li>
              <a href="#services" className="page-scroll">
                Services
              </a>
            </li> */}
            <li>
              <a href="#categories" className="page-scroll">
                Categories
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li>
            {/* <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li> */}
            <li>
              <a href="#contact" className="page-scroll">
                Contact us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
