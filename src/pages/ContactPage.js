// src/pages/ContactPage.js
import React from 'react';
import ContactForm from '../components/ContactForm'; // Import the contact form component
import './ContactPage.css'; // Import page-specific styles
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // Importing icons

function ContactPage() {
  return (
    <div className="contact-page">
      <h1>Φόρμα επικοινωνίας</h1>
      <ContactForm />

      {/* Contact Information Section */}
      <div className="contact-info">
        <h2>Στοιχεία επικοινωνίας</h2>
        <div className="contact-details-container">
          <div className="contact-details">
            <div className="contact-item">
              <FaMapMarkerAlt 
                className="contact-icon" 
                onClick={() => window.open("https://www.google.com/maps/place/%CE%A4%CE%95%CE%A7%CE%9D%CE%99%CE%9A%CE%9F+%CE%93%CE%A1%CE%91%CE%A6%CE%95%CE%99%CE%9F+%CE%9A%CE%91%CE%96%CE%91%CE%9D%CE%91%CE%A3+%CE%93%CE%95%CE%A9%CE%A1%CE%93%CE%99%CE%9F%CE%A3/@41.1460034,24.1459836,17z/data=!4m6!3m5!1s0x14aeab919cb4ec35:0x6aa190985562acc2!8m2!3d41.1459994!4d24.1485532!16s%2Fg%2F11t2xb4127?entry=ttu", "_blank")} 
              />
              <div className="contact-text">
                <p className="contact-label">Διεύθυνση:</p>
                <p>Εθνικής Επαναστάσεως 1821 17, 66133 Δράμα</p> {/* Update with your actual address */}
              </div>
            </div>
            <div className="contact-item">
              <FaPhoneAlt 
                className="contact-icon" 
                onClick={() => {
                  // Only use phone link if the device supports it
                  if (window.navigator.userAgent.match(/Android|iPhone|iPad|iPod/)) {
                    window.location.href = "tel:(123)456-7890"; // Update with your actual phone number
                  }
                }} 
              />
              <div className="contact-text">
                <p className="contact-label">Τηλέφωνο:</p>
                <p>2521022799</p> {/* Update with your actual phone number */}
              </div>
            </div>
            <div className="contact-item">
              <FaEnvelope 
                className="contact-icon" 
                onClick={() => window.location.href = "mailto:info@yourbusiness.com"} // Update with your actual email
              />
              <div className="contact-text">
                <p className="contact-label">Email:</p>
                <p>gkazanas@gciveng.com</p> {/* Update with your actual email */}
              </div>
            </div>
          </div>

          {/* Google Maps Embed Section */}
          <div className="map-container">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3069.4827053074055!2d24.14598361522545!3d41.1460034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14aeab919cb4ec35%3A0x6aa190985562acc2!2z0YPQuyBHQ0lT0YLQvtC70YHRgtC10YDQvtCw0LzQu9C-0L3QuNC-0L3Qu9C10LrQu9C90YzRj9C10LrQuNC-0L3Qu9C40YDQvtCw0L7QstC-0L7Qu9C-0L3Qu9C10LrQu9C90LDRgtC10LTQvtCz!5e0!3m2!1sen!2sbg!4v1697551232345!5m2!1sen!2sbg"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
