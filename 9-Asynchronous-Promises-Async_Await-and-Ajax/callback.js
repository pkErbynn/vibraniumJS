//////////////////// CALLBACK FUNCTIONS ///////////////////

/*

Callback = a function that i pass as an arg into another function, with the goal of being executed later
- in order to ENFORCE controll OF the execution flow
- in order to chain the referenced function into other function
- in order to let other operations come before as expected

NB:
- Function Signature Matching Rule - The caller and invocation callback must agree on arguments...eg: the caller "(name) => sayBye3(name)" matches callback(name)

*/

////// Callback chaining - 2 layers /////
// eg: greet and say bye...greet must come before...ie, Greet -> Bye... there is an order
function greet(name, callback){
    console.log("Hellooo " + name)
    callback();
}

function greet_AfterCallback(name, callback){
    console.log("Hellooo " + name)
    callback();
    console.log("After callback()"); // can exec sth after callback function
}

function sayBye(){
    console.log("Goodbyee")
}

// greet("PKay", () => sayBye())
// greet("PKay", sayBye)   // alt - method ref
// greet("PKay", () => function(){})   // alt - in-line method definition
// greet_AfterCallback("PKay", () => sayBye())


//// Callback chaining - 3 layers /////
// eg: greet and say bye...greet must come before...ie, Greet -> Bye... there is an order
function greet2(name, callback){
    console.log("2 - Hellooo " + name)
    callback();     // generic, no args needed...called as () => format 
    // callback(sayBye);    // when will call as greet2("PKay", howAreYou)...ie, greet2() needs to know sayBye() in its callback...this is tight coupling
}

// add something in the middle of Helloo and Goodbye...ie, Greet -> howAreYou -> Bye...ie, the callback() chained to to "bye"
function howAreYou2(callback){
    console.log("2 - How are you doing?...");
    callback()
}

function sayBye2(){
    console.log("2 - Goodbyee")
}

// greet2("PKay", () => howAreYou2(() => sayBye2()))  // this ()=> is prefered ** ....caller haddles/passes the fnx chain inside the arrow function
// // greet2("PKay", () => howAreYou2(sayBye2))  // this ()=> is prefered ** ....caller passes fnx inside the arrow function
// // greet2("PKay", howAreYou)    // when greet2() needs to know about sayBye2() in its callback by greet2() having "callback(sayBye)""

// greet2("Erb", () => sayBye2())   // no signature mismatch because callback() inside greet2() has no input value and passed sayBye2() also has not input
// greet2("Erb", () => howAreYou2(() => sayBye2())) // might think signature mismatch because callback() inside greet2() has no input but sayBye2(callback) has 'callback' input. No it's not an regular input value it's a callback function. Its input would have been passed inside as (inp) => howAreYou2(inp, () => sayBye2())...so an callback arg is NOT considered as input


// //////// Callback with input - 2 layers ///////////
function greet3(name, callback){
    console.log("3 - Hellooo " + name)
    callback(name); // pass it forward
}

// expand the method with the 'name' arg
function sayBye3(name){
    console.log("3 - Goodbyee " + name);
}

// greet3("PKay", (name) => sayBye3(name)) // 2nd param input matches callback(name)
// // greet3("PKay", sayBye3) // alt

// greet3("PKay", (name) => {
//     sayBye3(name)   // next method to chain/control/order
// })



// //////// Callback with input - 3 layers ///////////
function greet4(name, callback){
    console.log("4 - Hellooo " + name)
    callback(name); // pass it forward
}

// expand the method with the 'name' arg
function howAreYou4(name, callback){
    console.log("4 - How are you doing, " + name + "?...");
    callback(name) // pass it forward again
}

function sayBye4(name){
    console.log("4 - Goodbyee " + name)
}

// greet4("PKay", (name) => howAreYou4(name, (n) => sayBye4(n)))  // this wrapper delays execution until greet3 invokes the callback
// // greet4("PKay", (name) => howAreYou4(name, sayBye3))  // mixed ()=> with function reference

// // add's {} 
// greet4("PKay", (name) => {
//     howAreYou4(name, (n) => {
//         sayBye4(n)
//     })
// })  // this wrapper delays execution until greet3 invokes the callback

// // add massage input before
// greet4("PKay", (name) => howAreYou4(name, 
//     (name) => {
//         console.log("Before goodbye");
//         const name2 = name + "!!"
//         sayBye4(name2)
// }))



// NB: Pass Data Forward (Pipeline Thinking)
// Think like a pipeline: input → step1 → step2 → step3
function step1(x, cb){ cb(x) }
function step2(x, cb){ cb(x) }
function step3(x){}

// step1("PKay", (x) => step2(x, step3))

// NB: Know When It Gets Ugly (The Callback Hell)
function step11(x, cb){ cb(x) }
function step22(x, cb){ cb(x) }
function step33(x, cb){ cb(x) }
function step44(x){ console.log("Final:", x) }

// step11("PKay", (x1) => {
//     step22(x1, (x2) => {
//         step33(x2, (x3) => {
//             step44(x3);
//         });
//     });
// });

// NB: Think in Execution Control
// Callbacks are about:
// - Who controls WHEN this runs and in what order?”
// - Direct call → immediate
// - Callback → deferred / controlled


//// Return values in callbacks ////////
const Hello = function(name, callback) {
    console.log("Hello " + name);
    return callback()
}

const HowAreYou_WithNoCallback = () => {
    console.log("How are you doing?");
}

const HowAreYou = (callback) => {
    console.log("How are you doing?");
    return callback();
}

const HowAreYou_ReturnAfterCallback = (callback) => {
    console.log("How are you doing?");
    callback();
    return "Return Value - Post Callback from HowAreYou()"
}

const returnThisGift = () => {
    console.log("returnThisGift() invoked");
    return "Returned Gift"
}

const nonReturnedGift = () => {
    console.log("Non-returned Gift, just callout");
}

const HowAreYouNameInput = (name) => {
    console.log("How are you doing? " + name);
}

// // Mismatch signature btn passed and invoked signature
// Hello("Pkay", (name) => HowAreYouNameInput(name)) // function arg passed should match callback invoked in Hello()...ie, callback had no arg passed so should match that

// Regular call with no returned value
// Hello("Pkay", () => HowAreYou_WithNoCallback())

// // Loging returned value from the callback chain
// const value = Hello("Pkay", () => HowAreYou(() => returnThisGift()));   // returns last value from the chain
// console.log("Value " + value);

// const value2 = Hello("Pkay", () => HowAreYou(() => nonReturnedGift())); // Returning callback midway...behaves like a regular non-returned callback since last call doesn't return value, and midway didn't return value aside the callback()...undefined is returned
// console.log("Value2: " + value2);

// const value2ReturnAfterCallback = Hello("Pkay", () => HowAreYou_ReturnAfterCallback(() => nonReturnedGift()));  // evey method was invoked and MIDEWAY method's value was returned. FINAL method has no return value
// console.log("Value2_ReturnAfterCallback: " + value2ReturnAfterCallback);

// const value2returnThisGift = Hello("Pkay", () => HowAreYou_ReturnAfterCallback(() => returnThisGift()));    // evey method was invoked but MIDEWAY method's value was returned and not FINAL method's value 
// console.log("Value2_returnThisGift: " + value2returnThisGift); 

/*
NOTED RULE
- A returned value only travels back if every layer returns it
- If the last callback returns a value, every previous callbacks must return it
- Its like a pipe (finalValue ← step3 ← step2 ← step1), if one layers doesn't return, the chain is broken, and value is LOST
- But 'return values' only applies to SYNCHRONOUS callbacks, NOT ASYNC
*/



// === returning callback() only is same as regular non-returned callback ====
// but return desn't apply in async functions, thus NOT RECOMMENDED to return callback()
const stage1 = function(name, callback) {
    console.log("stage 1 " + name);
    return callback()
}

const stage2 = (callback) => {
    console.log("stage 2");
    return callback()
}

const stage3 = () => {
    console.log("stage 3");
}

// stage1("Pk", () => stage2(() => stage3()))
// stage1("Pk", () => stage2(() => stage2(() => {console.log("custom arrow function");})))

