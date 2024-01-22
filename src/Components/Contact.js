import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { Fade, Slide } from "react-reveal";

const Contact = (props) => {
  const form = useRef();
  const [result, setResult] = useState("");
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs.sendForm('service_fjl07151997', 'template_fjl07151997', form.current, 'DQgUOYc2Jp-I3qeKX')
      .then((result) => {
        document.getElementById("contact-form").reset();
        setResult("success");
        setSending(false);
      }, (error) => {
        setResult("error");
        document.getElementById("contact-form").reset();
        setSending(false);
      });
  };

  if (!props.data) return null;

  const { name, phone, contactmessage } = props.data;
  const { street, city, state, zip } = props.data.address;

  return (
    <section id="contact">
      <Fade bottom duration={1000}>
        <div className="row section-head">
          <div className="two columns header-col">
            <h1>
              <span>Get In Touch.</span>
            </h1>
          </div>

          <div className="ten columns">
            <p className="lead">{contactmessage}</p>
          </div>
        </div>
      </Fade>

      <div className="row">
        <Slide left duration={1000}>
          <div className="eight columns">
            <form id="contact-form" ref={ form }  onSubmit={ sendEmail }>
              <fieldset>
                <div>
                  <label htmlFor="contactName">
                    Name <span className="required">*</span>
                  </label>
                  <input type="text" defaultValue="" size="35" id="contactName" name="from_name" required />
                </div>

                <div>
                  <label htmlFor="contactEmail">
                    Email <span className="required">*</span>
                  </label>
                  <input type="text" defaultValue="" size="35" id="contactEmail" name="user_email" required />
                </div>

                <div>
                  <label htmlFor="contactSubject">Subject</label>
                  <input type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" />
                </div>

                <div>
                  <label htmlFor="contactMessage">
                    Message <span className="required">*</span>
                  </label>
                  <textarea cols="50" rows="15" id="contactMessage" name="message" required></textarea>
                </div>

                <div>
                  <button className="submit" disabled={sending}>Submit</button>
                  {
                    sending && 
                    <span id="image-loader">
                      <img alt="" src="images/loader.gif" />
                    </span>
                  }
                </div>
              </fieldset>
            </form>

            {
              result === "error" && <div id="message-warning"> Error sending your email! Please try again later</div>
            }

            {
              result === "success" &&
              <div id="message-success">
                <i className="fa fa-check"></i>Your message was sent, thank you!
                <br />
              </div>
            }
            
          </div>
        </Slide>

        <Slide right duration={1000}>
          <aside className="four columns footer-widgets">
            <div className="widget widget_contact">
              <h4>Address and Phone</h4>
              <p className="address">
                {name}
                <br />
                {street} <br />
                {city}, {state} {zip}
                <br />
                <span>{phone}</span>
              </p>
            </div>
          </aside>
        </Slide>
      </div>
    </section>
  );
}

export default Contact;