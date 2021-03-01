

 const fs = require('fs');
//synchronous
// const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');

// const textOut = 'I am namrata and who iswroking hard'

// fs.writeFileSync('./starter/txt/append.txt', textOut);

// console.log('File written after appending the content');


//Asynchronous
fs.readFile('./starter/txt/input.txt', 'utf-8',(err, data) =>{
    console.log(data);
});

console.log('Reading file before the data is loaded from input txt');