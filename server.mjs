import 'dotenv/config';
import express from 'express';
import { createTransport } from 'nodemailer';
import bodyParser from 'body-parser';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import * as XLSX from 'xlsx'; // Import the xlsx library

// Define __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/submit-form', async (req, res) => {
  try {
    console.log('Received form data:', req.body);

    const { userInfo, questions, answers } = req.body;

    // Create the Excel workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheetData = [];

    // Add contact information to the worksheet
    worksheetData.push(['Ονοματεπώνυμο', userInfo.fullName]);
    worksheetData.push(['Εταιρία', userInfo.companyName]);
    worksheetData.push(['Email', userInfo.email]);

    // Add a blank row to separate the contact info from the questions
    worksheetData.push([]);

    // Add the questions and answers to the worksheet
    worksheetData.push(['Question', 'Answer']);
    questions.forEach((questionObj, index) => {
      worksheetData.push([questionObj.question, answers[index] || 'Not answered']);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Form Data');

    const filePath = join(__dirname, `${userInfo.fullName}_${userInfo.companyName}.xlsx`);
    console.log('File path:', filePath);

    // Write the Excel file to disk
    XLSX.writeFile(workbook, filePath);

    // Check if file exists
    if (existsSync(filePath)) {
      console.log('File created successfully:', filePath);
    } else {
      console.error('File not found:', filePath);
    }

    // Define mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'michalis_sym@hotmail.com, gkazanas@gkciveng.com',
      subject: 'Νέα φόρμα δημιουργήθηκε',
      text: 'Η φόρμα είναι συννημένη στο email',
      attachments: [
        {
          filename: `${userInfo.fullName}_${userInfo.companyName}.xlsx`,
          path: filePath
        }
      ]
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, error: error.toString() });
      }
      unlinkSync(filePath); // Clean up
      res.json({ success: true });
    });

  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({ success: false, error: error.toString() });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
