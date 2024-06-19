import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import React from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { InstagramEmbed } from "react-social-media-embed";
import InstagramCarousel from "./instagram";
// import data from "../data/data.json";

// const images = data.Contact.images;

const initialState = {
  name: "",
  email: "",
  message: "",
};
export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);

    {
      /* replace below with your own Service ID, Template ID and Public Key from your EmailJS account */
    }

    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_PUBLIC_KEY").then(
      (result) => {
        console.log(result.text);
        clearState();
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  // useEffect(() => {
  //   setProducts([
  //     {
  //       id: "1000",
  //       code: "f230fh0g3",
  //       name: "Bamboo Watch",
  //       description: "Product Description",
  //       image: "img/portfolio/IMG_1258.jpg",
  //       price: 65,
  //       category: "Accessories",
  //       quantity: 24,
  //       inventoryStatus: "INSTOCK",
  //       rating: 5,
  //     },
  //     {
  //       id: "1000",
  //       code: "f230fh0g3",
  //       name: "Bamboo Watch",
  //       description: "Product Description",
  //       image: "img/portfolio/IMG_1258.jpg",
  //       price: 65,
  //       category: "Accessories",
  //       quantity: 24,
  //       inventoryStatus: "INSTOCK",
  //       rating: 5,
  //     },
  //     {
  //       id: "1000",
  //       code: "f230fh0g3",
  //       name: "Bamboo Watch",
  //       description: "Product Description",
  //       image: "img/portfolio/IMG_1258.jpg",
  //       price: 65,
  //       category: "Accessories",
  //       quantity: 24,
  //       inventoryStatus: "INSTOCK",
  //       rating: 5,
  //     },
  //     {
  //       id: "1000",
  //       code: "f230fh0g3",
  //       name: "Bamboo Watch",
  //       description: "Product Description",
  //       image: "img/portfolio/IMG_1258.jpg",
  //       price: 65,
  //       category: "Accessories",
  //       quantity: 24,
  //       inventoryStatus: "INSTOCK",
  //       rating: 5,
  //     },
  //     {
  //       id: "1000",
  //       code: "f230fh0g3",
  //       name: "Bamboo Watch",
  //       description: "Product Description",
  //       image: "img/portfolio/IMG_1258.jpg",
  //       price: 65,
  //       category: "Accessories",
  //       quantity: 24,
  //       inventoryStatus: "INSTOCK",
  //       rating: 5,
  //     },
  //     {
  //       id: "1000",
  //       code: "f230fh0g3",
  //       name: "Bamboo Watch",
  //       description: "Product Description",
  //       image: "img/portfolio/IMG_1258.jpg",
  //       price: 65,
  //       category: "Accessories",
  //       quantity: 24,
  //       inventoryStatus: "INSTOCK",
  //       rating: 5,
  //     },
  //     {
  //       id: "1000",
  //       code: "f230fh0g3",
  //       name: "Bamboo Watch",
  //       description: "Product Description",
  //       image: "img/portfolio/IMG_1258.jpg",
  //       price: 65,
  //       category: "Accessories",
  //       quantity: 24,
  //       inventoryStatus: "INSTOCK",
  //       rating: 5,
  //     },
  //     {
  //       id: "1000",
  //       code: "f230fh0g3",
  //       name: "Bamboo Watch",
  //       description: "Product Description",
  //       image: "img/portfolio/IMG_1258.jpg",
  //       price: 65,
  //       category: "Accessories",
  //       quantity: 24,
  //       inventoryStatus: "INSTOCK",
  //       rating: 5,
  //     },
  //   ]);
  //   // ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 9)));
  // }, []);

  const productTemplate = (product) => {
    // return (
    // <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
    //   <div className="mb-3">
    //     <img
    //       style={{ cursor: "pointer" }}
    //       onClick={() => (window.location.href = "https://www.instagram.com/bethemaskin")}
    //       src={product.image}
    //       alt={product.name}
    //       className="w-6 shadow-2"
    //     />
    //   </div>
    {
      /* <div>
          <h4 className="mb-1">{product.name}</h4>
          <h6 className="mt-0 mb-3">${product.price}</h6>
          <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
            <Button icon="pi pi-search" rounded />
            <Button icon="pi pi-star-fill" rounded severity="success" />
          </div>
        </div> */
    }
    // </div>
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <InstagramEmbed url="https://www.instagram.com/reel/C4soc4jo6_6/?utm_source=ig_embed&amp;utm_campaign=loading" width={328} captioned />
      </div>
    );
  };

  return (
    <div>
      <div className="section-title padding-top-70">
        <h2 className="text-center">Follow us on instagram</h2>
        <p className="text-center">
          <a href="https://www.instagram.com/bethemaskin">@Bethemaskin</a>
        </p>
      </div>
      <InstagramCarousel />
      <div id="contact" className="bethema-bg">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Get In Touch</h2>
                <p>Please fill out the form below to send us an email and we will get back to you as soon as possible.</p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" id="name" name="name" className="form-control" placeholder="Name" required onChange={handleChange} />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="email" id="email" name="email" className="form-control" placeholder="Email" required onChange={handleChange} />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea name="message" id="message" className="form-control" rows="4" placeholder="Message" required onChange={handleChange}></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Address
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : "/"}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.twitter : "/"}>
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.instagram : "/"}>
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2023 Issaaf Kattan React Land Page Template. Design by{" "}
            <a href="http://www.templatewire.com" rel="nofollow">
              TemplateWire
            </a>
          </p>
        </div>
      </div> */}
    </div>
  );
};
