import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

const routes = [
  {
    path: 'compress-signature-to-20kb',
    title: 'Compress Signature to 20KB Online (UPSC, SSC, IBPS) – Shrinker',
    description: 'Compress and resize signature under 20KB online for UPSC, SSC CGL, and IBPS exams. 100% Free, private, and client-side with instant download.',
  },
  {
    path: 'compress-photo-to-50kb',
    title: 'Compress Photo to 50KB for Exam & Passport Forms – Shrinker',
    description: 'Compress passport photos and images to exact 50KB online for government job applications, visa forms, and portal uploads with zero server upload.',
  },
  {
    path: 'compress-image-to-100kb',
    title: 'Compress Image to 100KB Online (Free & Private) – Shrinker',
    description: 'Reduce JPG, PNG, and WebP images to exact 100KB size. Fast, lossless clarity, 100% on-device compression with no watermarks.',
  },
  {
    path: 'compress-pdf-to-100kb',
    title: 'Compress PDF to 100KB / 200KB Online (100% Offline) – Shrinker',
    description: 'Compress PDF documents under 100KB or 200KB online. Fast multi-page PDF optimizer running completely in browser memory.',
  },
];

for (const route of routes) {
  const routeDir = path.join(distDir, route.path);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  let html = template;
  html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${route.title}" />`
  );

  fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
  console.log(`Generated static fallback: dist/${route.path}/index.html`);
}