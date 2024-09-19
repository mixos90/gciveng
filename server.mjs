import 'dotenv/config'; // Use import for dotenv
import express from 'express';
import { createTransport } from 'nodemailer';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell } from 'docx';
import bodyParser from 'body-parser'; // Default import for CommonJS module
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';

// Define __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors()); // Add CORS support
app.use(bodyParser.json()); // Use .json() method from the imported bodyParser

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/submit-form', async (req, res) => {
  try {
    console.log('Received form data:', req.body); // Log the received data

    const { userInfo, questions, answers } = req.body;

    // Create paragraphs for contact information
    const contactInfoParagraphs = [
      new Paragraph({
        children: [
          new TextRun({ text: `Ονοματεπώμνο: ${userInfo.fullName}`, bold: true }),
        ],
        alignment: 'center',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: `Εταιρία: ${userInfo.companyName}`, bold: true }),
        ],
        alignment: 'center',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: `Email: ${userInfo.email}`, bold: true }),
        ],
        alignment: 'center',
      }),
    ];

    // Create table for questions and answers
    const tableRows = [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Question', bold: true })],
            width: { size: 50, type: 'pct' },
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Answer', bold: true })],
            width: { size: 50, type: 'pct' },
          }),
        ],
      }),
    ];

    questions.forEach((questionObj, index) => {
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(questionObj.question)],
            }),
            new TableCell({
              children: [new Paragraph(answers[index] || 'Not answered')],
            }),
          ],
        })
      );
    });

    const table = new Table({
      rows: tableRows,
    });

    // Create the document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            ...contactInfoParagraphs,
            new Paragraph({
              children: [
                new TextRun({
                  text: ' ',
                }),
              ],
            }), // Empty paragraph to add space before table
            table,
          ],
        },
      ],
    });

    const filePath = join(__dirname, `${userInfo.fullName}_${userInfo.companyName}.docx`);
    console.log('File path:', filePath);
    
    // Generate document buffer
    const buffer = await Packer.toBuffer(doc);
    writeFileSync(filePath, buffer);

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
          filename: `${userInfo.fullName}_${userInfo.companyName}.docx`,
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
