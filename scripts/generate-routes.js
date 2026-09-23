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
    heading: 'Compress Signature to 20KB Online (UPSC, SSC, IBPS)',
    description: 'Compress and resize signature under 20KB online for UPSC, SSC CGL, and IBPS exams. 100% Free, private, and client-side with instant download.',
    intro: 'Free, private online tool to compress and resize signatures strictly under 20 KB for UPSC, SSC CGL, IBPS, and state government application portals. 100% client-side privacy.',
  },
  {
    path: 'compress-photo-to-50kb',
    title: 'Compress Photo to 50KB for Exam & Passport Forms – Shrinker',
    heading: 'Compress Photo to 50KB Online for Exam & Passport Forms',
    description: 'Compress passport photos and images to exact 50KB online for government job applications, visa forms, and portal uploads with zero server upload.',
    intro: 'Instantly reduce passport photos and candidate images to exact 50 KB with razor-sharp facial clarity. Compliant with SSC, UPSC, IBPS, and visa portal validation rules.',
  },
  {
    path: 'compress-image-to-100kb',
    title: 'Compress Image to 100KB Online (Free & Private) – Shrinker',
    heading: 'Compress Image to 100KB Online (Free & Private)',
    description: 'Reduce JPG, PNG, and WebP images to exact 100KB size. Fast, lossless clarity, 100% on-device compression with no watermarks.',
    intro: 'Compress any JPG, PNG, or WebP photo to exact 100 KB in milliseconds. Zero server uploads, no watermarks, and unlimited free compressions.',
  },
  {
    path: 'compress-pdf-to-100kb',
    title: 'Compress PDF to 100KB / 200KB Online (100% Offline) – Shrinker',
    heading: 'Compress PDF to 100KB / 200KB Online (100% Offline)',
    description: 'Compress PDF documents under 100KB or 200KB online. Fast multi-page PDF optimizer running completely in browser memory.',
    intro: 'Optimize and reduce multi-page PDF documents, marksheets, and certificates under 100 KB or 200 KB while preserving crystal-clear text readability.',
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
    /<h1[\s\S]*?<\/h1>/,
    `<h1 style="font-size: 1.8rem; font-weight: 800; color: #f8fafc; margin-bottom: 8px;">${route.heading}</h1>`
  );
  html = html.replace(
    /<p style="font-size: 0.95rem; color: #94a3b8; max-width: 640px; margin: 0 auto;">[\s\S]*?<\/p>/,
    `<p style="font-size: 0.95rem; color: #94a3b8; max-width: 640px; margin: 0 auto;">${route.intro}</p>`
  );

  fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
  console.log(`Generated static fallback: dist/${route.path}/index.html`);
}