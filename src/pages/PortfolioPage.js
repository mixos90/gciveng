import React, { useState, useEffect } from 'react';
import './PortfolioPage.css';

function PortfolioPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    companyName: '',
    email: '',
  });

  useEffect(() => {
    fetch('/questions.json')
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        const initialAnswers = data.reduce((acc, _, index) => {
          acc[index] = '';
          return acc;
        }, {});
        setAnswers(initialAnswers);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleChange = (index, event) => {
    setAnswers({
      ...answers,
      [index]: event.target.value,
    });
  };

  const handleUserInfoChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all questions are answered
    const allAnswered = Object.values(answers).every(answer => answer !== '');
    if (!allAnswered) {
      alert('Please answer all the questions.');
      return;
    }

    // Check if all user information is provided
    if (!userInfo.fullName || !userInfo.companyName || !userInfo.email) {
      alert('Please provide your full name, company name, and email.');
      return;
    }

    // Prepare data for server-side processing
    const formData = {
      userInfo,
      questions,
      answers
    };

    try {
      await fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      alert('Η φόρμα στάλθηκε επιτυχώς!');
    } catch (error) {
      console.error('Αδυναμία αποστολής φόρμας:', error);
      alert('Αδυναμία αποστολής φόρμας');
    }
  };

  const isMinimumAreaQuestion = (question) => {
    return /ελάχιστη επιφάνεια/i.test(question);
  };

  const isAnswered = (index) => {
    return answers[index] !== '';
  };

  return (
    <div className="portfolio-page">
      <h1>Ερωτηματολόγιο</h1>
      <p><strong>Συμπληρώστε τις παρακάτω πληροφορίες</strong></p>
      <form onSubmit={handleSubmit}>
        {questions.length === 0 ? (
          <p>No questions available</p>
        ) : (
          questions.map((questionObj, index) => (
            <div key={index} className="question">
              <fieldset>
                <legend className={isAnswered(index) ? 'answered' : ''}>
                  {questionObj.question}
                </legend>
                {isMinimumAreaQuestion(questionObj.question) ? (
                  <div className="option">
                    <label htmlFor={`question${index}`}>
                      <input
                        type="number"
                        id={`question${index}`}
                        name={`question${index}`}
                        value={answers[index]}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Εισάγετε επιφάνεια..."
                        min="0"
                        step="0.1"
                        required
                      />
                      <span>m²</span>
                    </label>
                  </div>
                ) : questionObj.options && questionObj.options.length > 0 ? (
                  <div className="option-container">
                    {questionObj.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="option">
                        <label>
                          <input
                            type="radio"
                            name={`question${index}`}
                            value={option}
                            checked={answers[index] === option}
                            onChange={(e) => handleChange(index, e)}
                          />
                          <span>{option}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="option-container">
                    <div className="option">
                      <label>
                        <input
                          type="radio"
                          name={`question${index}`}
                          value="ΝΑΙ"
                          checked={answers[index] === "ΝΑΙ"}
                          onChange={(e) => handleChange(index, e)}
                        />
                        <span>ΝΑΙ</span>
                      </label>
                    </div>
                    <div className="option">
                      <label>
                        <input
                          type="radio"
                          name={`question${index}`}
                          value="ΟΧΙ"
                          checked={answers[index] === "ΟΧΙ"}
                          onChange={(e) => handleChange(index, e)}
                        />
                        <span>ΟΧΙ</span>
                      </label>
                    </div>
                  </div>
                )}
              </fieldset>
            </div>
          ))
        )}

        {/* User Information Form */}
        <div className="user-info">
          <h2>Φόρμα επικοινωνίας</h2>
          <label>
            Ονοματεπώνυμο:
            <input
              type="text"
              name="fullName"
              value={userInfo.fullName}
              onChange={handleUserInfoChange}
              required
            />
          </label>
          <label>
            Επωνυμία εταιρίας:
            <input
              type="text"
              name="companyName"
              value={userInfo.companyName}
              onChange={handleUserInfoChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleUserInfoChange}
              required
            />
          </label>
        </div>

        <button type="submit">Αποστολή φόρμας</button>
      </form>
      
      <div className="download-link-container">
        <h2>Κατεβάστε την αίτηση διενέργειας επιθεώρησης σε αρχείο PDF</h2>
        <a
          href="https://eurocheck.gr/pdfs/E-02.1%20%CE%91%CE%99%CE%A4%CE%97%CE%A3%CE%97%20%CE%94%CE%99%CE%95%CE%9D%CE%95%CE%A1%CE%93%CE%95%CE%99%CE%91%CE%A3%20%CE%95%CE%A0%CE%99%CE%98%CE%95%CE%A9%CE%A1%CE%97%CE%A3%CE%97%CE%A3%20%CE%93%CE%99%CE%91%20%CE%A4%CE%97%CE%9D%20%CE%9A%CE%91%CE%A4%CE%91%CE%A4%CE%91%CE%9E%CE%97_v7_24.pdf"
          download
          className="download-link"
        >
          ΑΙΤΗΣΗ ΔΙΕΝΕΡΓΕΙΑΣ ΕΠΙΘΕΩΡΗΣΗΣ
        </a>
      </div>
    </div>
    
  );
}

export default PortfolioPage;
