
import {a as d, b} from './file2.mjs'; // alisasing 'a' to 'd'
import {add, amrSub} from './utils/index.mjs'; // the index must be specified in esm



console.log("test: ", d, b);                  

console.log("Addition: ", add(a, b));
console.log("Subtraction: ", amrSub(a, b));