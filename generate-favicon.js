const sharp = require('sharp');
const fs = require('fs');

async function main() {
    const inputPath = "C:\\Users\\rithv\\Downloads\\SHRIMATHI RANGANAYAKI AMMAL NUR&PRI SCHOOL logo_page-0001.jpg";
    
    if (!fs.existsSync('public')) {
        fs.mkdirSync('public');
    }
    
    console.log("Converting using sharp...");
    await sharp(inputPath)
        .resize(256, 256, {
            fit: sharp.fit.contain,
            background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile('public/favicon.png');
        
    await sharp(inputPath)
        .resize(256, 256, {
            fit: sharp.fit.contain,
            background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile('favicon.png');
        
    console.log("Favicon created successfully");
}

main().catch(console.error);
