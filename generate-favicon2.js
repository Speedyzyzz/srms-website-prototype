const pdf2img = require('pdf-img-convert');
const fs = require('fs');
const sharp = require('sharp');

async function main() {
    const inputPath = "C:\\Users\\rithv\\Downloads\\SHRIMATHI RANGANAYAKI AMMAL NUR&PRI SCHOOL logo.pdf";
    console.log("Converting PDF to Image...");
    const pdfArray = await pdf2img.convert(inputPath, { page_numbers: [1] });
    
    if (!fs.existsSync('public')) {
        fs.mkdirSync('public');
    }
    
    console.log("Converting using sharp...");
    await sharp(pdfArray[0])
        .resize(256, 256, {
            fit: sharp.fit.contain,
            background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile('public/favicon.png');
        
    await sharp(pdfArray[0])
        .resize(256, 256, {
            fit: sharp.fit.contain,
            background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile('favicon.png');
        
    console.log("Done");
}

main().catch(console.error);
