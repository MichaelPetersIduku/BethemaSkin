import { useState, useRef } from "react";
// import emailjs from "emailjs-com";
import emailjs from "@emailjs/browser";
import React from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { InstagramEmbed } from "react-social-media-embed";
import InstagramCarousel from "./instagram";
import { Toast } from "primereact/toast";

import { Oval } from "react-loader-spinner";

// import data from "../data/data.json";

// const images = data.Contact.images;

const initialState = {
  from_name: "",
  reply_to: "",
  message: "",
  isLoading: false,
};
export const Contact = (props) => {
  const [{ from_name, reply_to, message, isLoading }, setState] = useState(initialState);
  const toast = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(from_name, reply_to, message);

    setState({ isLoading: true });
    emailjs.sendForm("service_fba8wjf", "SEND_MESSAGE_TEMPLATE", e.target, "Mw6qmfKGvgSNgWDxL").then(
      (result) => {
        console.log(result.text);
        clearState();
        document.getElementById("mform").reset();
        toast.current.show({ severity: "success", detail: "Message sent successfully", life: 5000 });
      },
      (error) => {
        setState({ isLoading: false });
        console.log(error.text);
        toast.current.show({ severity: "error", detail: "Something went wrong, please try again" });
      }
    );
  };

  return (
    <div>
      <Toast ref={toast} position="top-right" />
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
              <form name="sentMessage" id="mform" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" id="from_name" name="from_name" className="form-control" placeholder="Name" required onChange={handleChange} />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="email" id="reply_to" name="reply_to" className="form-control" placeholder="Email" required onChange={handleChange} />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea name="message" id="message" className="form-control" rows="4" placeholder="Message" required onChange={handleChange}></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button style={{ width: "198px", height: "52px", display: "flex", justifyContent: "center" }} type="submit" className="btn btn-custom btn-lg">
                  {!isLoading ? (
                    "Send Message"
                  ) : (
                    <Oval visible={isLoading} height="25" width="50" color="#663d00e6" ariaLabel="oval-loading" wrapperStyle={{}} wrapperClass="" />
                  )}
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
