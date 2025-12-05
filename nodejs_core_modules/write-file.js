const fs = require("fs");

const content1 = "This is a content 1: \n Some Content is here.";
const content2 = "This is a content 2: \n Some Content is here.";
const content3 = "This is a content 3: \n Some Content is here.";

// this one process
try {
    fs.writeFileSync("./output/test-sync.txt", content1);
} catch (err) {
    console.err(err.message);
}

// another one
fs.writeFile("./output/test-async.txt", content2, (error) => {
    if(error){
        console.log(error.message)
    } else {
        console.log("file written asynchronously")
    }
})