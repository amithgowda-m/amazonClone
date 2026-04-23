const https = require('https');

const urls = [
  "https://m.media-amazon.com/images/I/61bdB76eUCL.jpg",
  "https://m.media-amazon.com/images/I/71jG+e7roXL.jpg",
  "https://m.media-amazon.com/images/I/51aXvjBcqwL.jpg",
  "https://m.media-amazon.com/images/I/61SQz8S+fEL.jpg",
  "https://m.media-amazon.com/images/I/71TPda7cwNL.jpg",
  "https://m.media-amazon.com/images/I/81lgHjUjS6L.jpg",
  "https://m.media-amazon.com/images/I/51y-0BfGE4L.jpg",
  "https://m.media-amazon.com/images/I/61vGQNUEsGL.jpg"
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`[${res.statusCode}] ${url}`);
  }).on('error', (e) => {
    console.error(`[ERROR] ${url} : ${e.message}`);
  });
});
