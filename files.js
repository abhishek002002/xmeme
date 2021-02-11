// file system

const fs= require('fs');



// reading files 

fs.readFile('./docs/blog1.txt',(err , data)=>{
   if(err){
       console.log(err);
   }
   console.log(data.toString());
})
// writing files 
fs.writeFile('./docs/blog1.txt', 'helo world', ()=>{
    console.log('writen');
});



// directories
// if(!fs.existsSync('./docs/blog.txt')){
//     fs.mkdir('./docs/blog.txt', (err)=>{
//         if(err){
//             console.log(err);
//         }
//         console.log('creatd');
//     })
// }else{
//     fs.rmdir('./docs/blog.txt',(err)=>{
//         if(err){
//             console.log(err);
//         }
//         console.log('deleted');
//     });
// }



// deleting files

if(fs.existsSync('./docs/blog.txt')){
    fs.unlink('./docs/blog.txt', (err)=>{
        console.log('file deleted');
    })
}