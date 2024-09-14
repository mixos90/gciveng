// src/pages/ContactPage.js
import React from 'react';
import ContactForm from '../components/ContactForm'; // Import the contact form component
import './ContactPage.css'; // Import page-specific styles

function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <ContactForm />
    </div>
  );
}

export default ContactPage;
