//////////////////// CALLBACK FUNCTIONS ///////////////////

/*

Callback = a function that i pass as an arg into another function, with the goal of being executed later
- in order to chain the referenced function into other function
- in order to controll the execution flow
- in order to let other operations come before as expected

*/

////// Callback chaining - 2 layers /////
// eg: greet and say bye...greet must come before...ie, Greet -> Bye... there is an order
function greet(name, callback){
    console.log("Hellooo " + name)
    callback();
}

function sayBye(){
    console.log("Goodbyee")
}

greet("PKay", () => sayBye())
// greet("PKay", sayBye)   // alt - method ref



//// Callback chaining - 3 layers /////
// eg: greet and say bye...greet must come before...ie, Greet -> Bye... there is an order
function greet2(name, callback){
    console.log("2 - Hellooo " + name)
    callback();     // generic, no args needed...called as () => format 
    // callback(sayBye);    // when will call as greet2("PKay", howAreYou)...ie, greet2() needs to know sayBye() in its callback
}

// add something in the middle of Helloo and Goodbye...ie, Greet -> howAreYou -> Bye...ie, the callback() chained to to "bye"
function howAreYou2(callback){
    console.log("2 - How are you doing?...");
    callback()
}

function sayBye2(){
    console.log("2 - Goodbyee")
}

greet2("PKay", () => howAreYou2(() => sayBye2()))  // this ()=> is prefered ** ....caller haddles/passes the fnx chain inside the arrow function
// greet2("PKay", () => howAreYou2(sayBye2))  // this ()=> is prefered ** ....caller passes fnx inside the arrow function
// greet2("PKay", howAreYou)    // when greet2() needs to know about sayBye2() in its callback by greet2() having "callback(sayBye)""



// //////// Callback with input - 2 layers ///////////
function greet3(name, callback){
    console.log("3 - Hellooo " + name)
    callback(name); // pass it forward
}

// expand the method with the 'name' arg
function sayBye3(name){
    console.log("3 - Goodbyee " + name);
}

greet3("PKay", (name) => sayBye3(name))
// greet3("PKay", sayBye3) // alt



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

greet4("PKay", (name) => howAreYou4(name, (name2) => sayBye4(name2)))  // this wrapper delays execution until greet3 invokes the callback
greet4("PKay", (name) => howAreYou4(name, (name) => sayBye4(name)))  // var has diff scope
greet4("PKay", (name) => howAreYou4(name, 
    (name) => {
        console.log("Before goodbye");
        sayBye4(name)
}))
// greet4("PKay", (name) => howAreYou4(name, sayBye3))  // mixed ()=> with function reference
