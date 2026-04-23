const https = require('https');

const urls = [
  "https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SL1500_.jpg", // mouse
  "https://m.media-amazon.com/images/I/61+btxcigvL._AC_SL1500_.jpg", // headphones
  "https://m.media-amazon.com/images/I/51QCbNzbU1L._AC_SL1000_.jpg", // kindle
  "https://m.media-amazon.com/images/I/71A9W0pndpL._AC_SL1500_.jpg", // speaker
  "https://m.media-amazon.com/images/I/61OqwAs23KL._AC_SL1500_.jpg", // mouse 2
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`[${res.statusCode}] ${url}`);
  }).on('error', (e) => {
    console.error(`[ERROR] ${url} : ${e.message}`);
  });
});
