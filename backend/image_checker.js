const https = require('https');

const urls = [
  "https://m.media-amazon.com/images/I/61bdB76eUCL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/51aXvjBcqwL._AC_SL1000_.jpg",
  "https://m.media-amazon.com/images/I/61SQz8S+fEL._AC_SL1000_.jpg",
  "https://m.media-amazon.com/images/I/71TPda7cwNL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81lgHjUjS6L._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/51y-0BfGE4L._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_SL1500_.jpg"
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`[${res.statusCode}] ${url}`);
  }).on('error', (e) => {
    console.error(`[ERROR] ${url} : ${e.message}`);
  });
});
