import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, Circle, LoaderCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const initialState = {
  from_name: "",
  reply_to: "",
  message: "",
};

export function Contact() {
  const [{ from_name, reply_to, message }, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  // const handleChange1 = (e) => {
  //   const { name, value } = e.target;
  //   setState((prevState) => ({ ...prevState, [name]: value }));
  // };
  // const clearState = () => setState({ ...initialState });

  // const handleSubmit1 = (e) => {
  //   e.preventDefault();
  //   console.log(from_name, reply_to, message);

  //   setState({ ...{ from_name, reply_to, message }, isLoading: true });
  //   emailjs.sendForm("service_fba8wjf", "SEND_MESSAGE_TEMPLATE", e.target, "Mw6qmfKGvgSNgWDxL").then(
  //     (result) => {
  //       console.log(result.text);
  //       clearState();
  //       setState(initialState);
  //       toast.success("Message sent successfully");
  //     },
  //     (error) => {
  //       setState({ ...{ from_name, reply_to, message }, isLoading: false });
  //       console.log(error.text);
  //       toast.error("Something went wrong, please try again");
  //     }
  //   );
  // };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setState({ ...{ from_name, reply_to, message } });
    setIsLoading(true);
    emailjs.sendForm("service_fba8wjf", "SEND_MESSAGE_TEMPLATE", e.target, "Mw6qmfKGvgSNgWDxL").then(
      (result) => {
        console.log(result.text);
        clearState();
        setState(initialState);
        setFormData({ name: "", email: "", message: "" });
        setIsLoading(false);

        toast.success("Message sent successfully");
      },
      (error) => {
        setState({ ...{ from_name, reply_to, message } });
        setIsLoading(false);
        console.log(error.text);
        toast.error("Something went wrong, please try again");
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(isLoading);

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl tracking-wider mb-4">GET IN TOUCH</h2>
            <p className="text-black/60 max-w-2xl mx-auto">Have questions about our products or need skincare advice? We're here to help.</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl tracking-wide mb-6">CONTACT INFORMATION</h3>
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 border border-black/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-black/60 mb-1">EMAIL</p>
                    <a href="mailto:hello@bethemaskin.com" className="hover:text-black/60 transition-colors">
                      hello@bethemaskin.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 border border-black/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-black/60 mb-1">PHONE</p>
                    <a href="tel:+2348039801519" className="hover:text-black/60 transition-colors">
                      +234 803 980 1519
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 border border-black/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-black/60 mb-1">ADDRESS</p>
                    <p>Lagos, surulere, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="tracking-wide mb-4">CONNECT WITH US</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/BethemaSkin/"
                  className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://web.facebook.com/BETHEMASKINCARE"
                  className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                {/* <a
                  href="#"
                  className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a> */}
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <h4 className="tracking-wide mb-4">BUSINESS HOURS</h4>
              <div className="space-y-2 text-sm text-black/60">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm tracking-wide mb-2">
                  NAME *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm tracking-wide mb-2">
                  EMAIL *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* // Subject
              <div>
                <label htmlFor="subject" className="block text-sm tracking-wide mb-2">
                  SUBJECT *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none transition-colors bg-white"
                >
                  <option value="">Select a subject</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="order-status">Order Status</option>
                  <option value="skincare-advice">Skincare Advice</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="other">Other</option>
                </select>
              </div> */}

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm tracking-wide mb-2">
                  MESSAGE *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none transition-colors resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-black text-white tracking-wider hover:bg-black/80 transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <LoaderCircle className={`w-5 h-5 animate-spin`} />
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
