const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');

try {
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // Grab the secret from the Vercel environment variable
    // If it's not set, it injects a helpful fallback message.
    const secretData = process.env.SECRET_DATA || 'Error: SECRET_DATA environment variable not set in Vercel.';
    
    // Replace the exact placeholder string with the real data
    content = content.replace('__SECRET_DATA__', secretData);
    
    // Save the modified file
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log('Successfully injected SECRET_DATA into index.html');
} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}
