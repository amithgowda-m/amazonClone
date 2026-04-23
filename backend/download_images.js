const fs = require('fs');
const https = require('https');
const path = require('path');

const imgDir = path.join(__dirname, '../frontend/public/products');
if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
}

const downloads = [
    { url: "https://images.unsplash.com/photo-1615663245857-ac93bb5c9096?w=800&q=80", file: "razer.jpg" },
    { url: "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SL1500_.jpg", file: "macbook.jpg" },
    { url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80", file: "sony.jpg" },
    { url: "https://m.media-amazon.com/images/I/61SQz8S+fEL._AC_SL1000_.jpg", file: "odyssey.jpg" },
    { url: "https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=800&q=80", file: "kindle.jpg" },
    { url: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80", file: "echo.jpg" },
    { url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80", file: "bose.jpg" },
    { url: "https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_SL1500_.jpg", file: "logitech.jpg" }
];

async function downloadImages() {
    for (let item of downloads) {
        await new Promise((resolve, reject) => {
            console.log("Downloading", item.url);
            https.get(item.url, (res) => {
                // follow redirects if unsplash uses them
                if (res.statusCode === 301 || res.statusCode === 302) {
                    https.get(res.headers.location, (redirectRes) => {
                         const fileStream = fs.createWriteStream(path.join(imgDir, item.file));
                         redirectRes.pipe(fileStream);
                         fileStream.on('finish', () => resolve());
                    });
                } else {
                    const fileStream = fs.createWriteStream(path.join(imgDir, item.file));
                    res.pipe(fileStream);
                    fileStream.on('finish', () => resolve());
                }
            }).on('error', reject);
        });
    }
    console.log("All downloaded fully to local public folder.");
}

downloadImages();
