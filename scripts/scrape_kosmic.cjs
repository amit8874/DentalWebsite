const https = require('https');
const fs = require('fs');

https.get('https://kosmicdentalclinic.com', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    fs.writeFileSync('kosmic_home.html', body);
    console.log('Saved kosmic_home.html, length:', body.length);

    // Look for images
    const imgMatches = body.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi) || [];
    console.log('Total img tags:', imgMatches.length);
    
    // Look for cards
    const cards = [];
    const blocks = body.match(/<div[^>]*class="[^"]*(?:service|treatment|card)[^"]*"[^>]*>[\s\S]*?<\/div>/gi) || [];
    console.log('Total potential card blocks:', blocks.length);
  });
}).on('error', (e) => console.error(e.message));
