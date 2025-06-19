const { createServer } = require('http');
const { parse } = require('url');
const { join } = require('path');
const { readFileSync, existsSync } = require('fs');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 8080;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Utility function to get MIME type
function getMimeType(filePath) {
  const ext = filePath.split('.').pop().toLowerCase();
  const mimeTypes = {
    'js': 'application/javascript',
    'css': 'text/css',
    'html': 'text/html',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'webp': 'image/webp',
    'avif': 'image/avif',
    'ico': 'image/x-icon',
    'woff': 'font/woff',
    'woff2': 'font/woff2',
    'ttf': 'font/ttf',
    'otf': 'font/otf'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      // Handle Next.js static files
      if (pathname.startsWith('/_next/')) {
        // Try both standalone and development paths
        const nextStaticPath = join(__dirname, pathname);
        const devStaticPath = join(__dirname, '.next', pathname.replace(/^\/_next\//, ''));
        
        let filePath = existsSync(nextStaticPath) ? nextStaticPath : devStaticPath;
        
        console.log(`[Next.js Static] Request: ${pathname} -> File: ${filePath}`);
        
        if (existsSync(filePath)) {
          const fileBuffer = readFileSync(filePath);
          const mimeType = getMimeType(filePath);
          
          console.log(`[Next.js Static] Serving: ${pathname} (${mimeType})`);
          
          res.setHeader('Content-Type', mimeType);
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          
          return res.end(fileBuffer);
        }
      }

      // Handle static files from public directory (including assets)
      if (pathname.startsWith('/assets/') || pathname.startsWith('/images/') || 
          pathname.startsWith('/favicon') || pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|avif|ico|woff|woff2|ttf|otf)$/)) {
        
        // Try both /public and root paths
        const publicPath = join(__dirname, 'public', pathname);
        const rootPath = join(__dirname, pathname.replace(/^\/public\//, ''));
        
        let filePath = existsSync(publicPath) ? publicPath : rootPath;
        
        console.log(`[Static] Request: ${pathname} -> File: ${filePath}`);
        
        if (existsSync(filePath)) {
          const fileBuffer = readFileSync(filePath);
          const mimeType = getMimeType(filePath);
          
          console.log(`[Static] Serving: ${pathname} (${mimeType})`);
          
          res.setHeader('Content-Type', mimeType);
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          
          return res.end(fileBuffer);
        } else {
          console.log(`[Static] File not found: ${filePath}`);
          res.statusCode = 404;
          return res.end('File not found');
        }
      }

      // Fall back to Next.js handler
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
}); 