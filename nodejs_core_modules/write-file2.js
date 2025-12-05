const fs = require("fs")

const text = 'hello world'

fs.writeFile("output/test-file.txt",text, error =>{
    if(error){
        console.error(error.message);
    } else {
        console.log("test success");
    }
});
