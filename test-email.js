const fs = require('fs');
const nodemailer = require('nodemailer');

const envLocal = fs.readFileSync('.env.local', 'utf8');
let user = '';
let pass = '';
for (const line of envLocal.split('\n')) {
  if (line.startsWith('SMTP_USER=')) user = line.split('=')[1].trim();
  if (line.startsWith('SMTP_PASS=')) pass = line.split('=')[1].trim();
}

async function test() {
  console.log("User:", user);
  console.log("Pass length:", pass ? pass.length : 0);
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: user,
      pass: pass,
    },
    logger: true, // log to console
    debug: true // include SMTP traffic in the logs
  });

  try {
    console.log("Verifying connection...");
    await transporter.verify();
    console.log("Connection verified successfully!");
  } catch (error) {
    console.error("Verification failed:", error);
  }
}

test();
