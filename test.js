const tests = [
    'app.js',
    'package.json',
    'public/index.html',
    'wrong-file.html'
];
if (!fs.existsSync(file)) {
    console.error(`TEST FAILED: ${file} not found`);
    process.exit(1);
}
