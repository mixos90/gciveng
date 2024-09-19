import React, { useState } from 'react';
import './ContactForm.css';
import emailjs from 'emailjs-com';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState(''); // New state for company name

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = {
      name,
      company,
      email,
      phone,
      message,
      location,
     // Include company name in the data
    };

    // Send form data to EmailJS
    emailjs.send('service_3kj05aq', 'template_8dv4m82', formData, 'B17LXenUS8Zkf6Xsp')
      .then((response) => {
        console.log('Success:', response);
        alert('Your message has been sent successfully!');
        // Clear form fields
        setName('');
        setCompany('');
        setEmail('');
        setPhone('');
        setMessage('');
        setLocation('');
        
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('There was a problem sending your message.');
      });
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="[0-9]{10}"
            placeholder="1234567890"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send</button>
      </form>
      <div className="download-link-container">
        <span>Download application form: </span>
        <a
          href="https://eurocheck.gr/pdfs/E-02.1%20%CE%91%CE%99%CE%A4%CE%97%CE%A3%CE%97%20%CE%94%CE%99%CE%95%CE%9D%CE%95%CE%A1%CE%93%CE%95%CE%99%CE%91%CE%A3%20%CE%95%CE%A0%CE%99%CE%98%CE%95%CE%A9%CE%A1%CE%97%CE%A3%CE%97%CE%A3%20%CE%93%CE%99%CE%91%20%CE%A4%CE%97%CE%9D%20%CE%9A%CE%91%CE%A4%CE%91%CE%A4%CE%91%CE%9E%CE%97_v7_24.pdf"
          download
          className="download-link"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}

export default ContactForm;
