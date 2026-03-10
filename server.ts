import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/book', async (req, res) => {
    const { name, email, phone, industry, truckCount, score, date, time } = req.body;

    console.log('--- NEW LEAD GENERATED ---');
    console.log(`Company: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Industry: ${industry}`);
    console.log(`Trucks: ${truckCount}`);
    console.log(`Diagnostic Score: ${score}/100`);
    console.log(`Requested Time: March ${date}, 2026 at ${time}`);
    console.log('---------------------------');

    // NOTE: To send real emails, integrate Resend or SendGrid here.
    // Example with Resend:
    /*
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Integr-AI-tion <onboarding@resend.dev>',
        to: 'cliff.dwellingly@gmail.com', // User's team email
        subject: `New Lead: ${name} (${industry})`,
        html: `
          <h1>New Diagnostic Lead</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Industry:</strong> ${industry}</p>
          <p><strong>Trucks:</strong> ${truckCount}</p>
          <p><strong>Score:</strong> ${score}/100</p>
          <p><strong>Scheduled:</strong> March ${date} at ${time}</p>
        `
      });
    }
    */

    res.json({ success: true, message: 'Lead captured successfully' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
