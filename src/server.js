import express from 'express';
import fs from 'node:fs';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 80;

app.use("/public/audio", express.static(path.join(__dirname, "public", "audio")));

app.get('/run', (req, res) => {
  execFile('/usr/bin/uptime', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({
        error: error.message,
        stderr,
      });
    }

    res.json({
      output: stdout.trim(),
    });
  });
});

app.get('/random_article', (req, res) => {
  try {
    const files = fs.readdirSync(join(__dirname, 'resources', 'articles'));

    if (files.length === 0) {
      throw new Error('No articles found');
    }

    const n = Math.floor(Math.random() * files.length);

    const content = fs.readFileSync(
      join(__dirname, 'resources', 'articles', files[n]),
      'utf8',
    );

    res.type('application/json').send(content);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// app.get('/articles', (req, res) => {
//   try {
//     const content = fs.readFileSync(
//       join(__dirname, 'resources', 'zweiter_weltkrieg.json'),
//       'utf8',
//     );
//
//     res.type('application/json').send(content);
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// });

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on http://0.0.0.0:${port}`);
});
