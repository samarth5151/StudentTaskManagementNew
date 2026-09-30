const fs = require('fs');

console.log('Starting build...');

if (!fs.existsSync('public')) {
    console.error('Build failed: public directory not found.');
    process.exit(1);
}

if (!fs.existsSync('public/index.html')) {
    console.error('Build failed: index.html not found.');
    process.exit(1);
}

console.log('Build successful.');
