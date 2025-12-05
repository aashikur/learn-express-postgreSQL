
const fs = require("fs");

// this create fie, eatch time run -> will create new file(only need to run first)
fs.writeFileSync("./output/app.log", "Application Started\n");
console.log("file Created");

const logEntry1 = `\n${new Date().toISOString()} user logged in\n`;
fs.appendFileSync("./output/app.log", logEntry1);
console.log("new Entry..")
const logEntry2 = `\n${new Date().toISOString()} Fetched Data.`

fs.appendFileSync("./output/app.log", logEntry2)

console.log("task Complete");

// for now we create using comment out, first run the write -> then LogEntry1 -> then logEntry2