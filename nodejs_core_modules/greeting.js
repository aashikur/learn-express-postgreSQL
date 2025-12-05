
// Node.js system variable: process.argv gives command line args
const args = process.argv;
// args[0]: node path, args[1]: script path, args[2+]: user args


// Get name from command line, default to 'guest'
const name = args[2] || 'guest';
// Get current hour
const time = new Date().getHours();


let greeting; // Will hold greeting message


// Set greeting based on time
if(time < 12 ) {
    greeting = 'Good Morning';
} 
else if(time < 18 ){
    greeting = 'Good Afternoon';
}
else {
    greeting = "Good Evening";
}


// Output greeting and name
console.log(`${greeting} ${name}`)