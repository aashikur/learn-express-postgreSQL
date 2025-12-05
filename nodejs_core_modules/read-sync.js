
// Node.js core module for file system
const fs = require("fs")


console.log("1. Start reading...") // Step info



try {
    // Synchronously read file content
    const data = fs.readFileSync("./data/diary.txt", "utf-8")
    console.log("2. File content:");
    console.log(data);
}
catch (err) {
    // Print error if file read fails
    console.error(err.message);
}


console.log("3. Finished"); // Step info

// Show Node.js version and OS platform
console.log("Node.js version:", process.version); // e.g., v20.10.0
console.log("Platform:", process.platform); // e.g., win32, linux



