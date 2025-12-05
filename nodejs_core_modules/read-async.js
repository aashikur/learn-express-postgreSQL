
// Node.js core module for file system
const fs = require("fs");

console.log("1. Start reading..."); // Step info

// Async file read (non-blocking)
fs.readFile("./data/diary.txt", "utf-8", (error, data) => {
    if (error) {
        // Show error if file read fails
        console.log("Error happened:", error.message);
        return;
    }
    console.log("2. File content:");
    console.log(data);
});

console.log("3. This runs immediately - no block"); // Async: this prints before file content