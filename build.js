const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
const outDir = path.join(__dirname, 'public');
const outPath = path.join(outDir, 'index.html');

try {
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // Grab the secret from the Vercel environment variable
    const secretData = process.env.SECRET_DATA || 'Error: SECRET_DATA environment variable not set in Vercel.';
    
    // Replace the exact placeholder string with the real data
    content = content.replace('__SECRET_DATA__', secretData);
    
    // Ensure the output directory exists
    if (!fs.existsSync(outDir)){
        fs.mkdirSync(outDir);
    }
    
    // Save the modified file into the public directory so Vercel can find it
    fs.writeFileSync(outPath, content, 'utf8');
    console.log('Successfully built and injected SECRET_DATA into public/index.html');
} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}
