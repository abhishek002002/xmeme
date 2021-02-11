const fs = require('fs');


const readStream = fs.createReadStream('./docs/blog3.txt',{ encoding: 'utf8' });
const writeStream =  fs.createWriteStream('./docs/blog4.txt');
// readstream.on('data', (chunk)=>{
//     console.log('-----NEW CHUNK-----');
//     console.log(chunk);
//     writestream.write('\nNew chunk\n');
//     writestream.write(chunk);
// })
readStream.pipe(writeStream);