## Basics
1. <script></script> tag adds js to html page. two ways:
    - inline or
    - external script file
2. Data types
    - Undefined: datatype assigned to a variable w/ 'no value yet'...ie, empty value
    - Null: means 'no-existent'
        - Undefined: datatype of variable w/ no value yet
    - Null: means variable 'no-existent'
3. Falsy
    - values evaluated to false...the 5 falsy values; undefined, null, 0, '', NaN
4. Function
    - function expression returns a value
    - **stored in variable, say x = function(y)**
    - x is called instead....x(param)
    - expressions = anything that returns/produces a value
    - statement = just actions, ends in ';'
    - 2+3...an expression cus produces a value/result
    - **user fxn expressions over fxn declarations**
    - arrows: declare, `const x = y => y + 1`...use, `const z = x(y)`
        - used when function has just one line of code
5. Object
    - ```x = {y: 2}``` <= means object _literal_
    - _dotNotation_ `x.y` or 
    - **_bracketNotation_** `x['y']`...this's _computable/dynamic_
    - check **property existence**
        - **`user.name` or `user[name]`**

    - can have function property...**function expression as key/value property**
        - access as `obj.function(arg)` / `obj["function"](arg)`
    - object is mutable...ie, can change their prop values
6. Concepts
    - Variable mutation: changin' var value
    - Type coercion: converting from one type to another automatically
    - Tackling any problem (4 steps)
        - **Understand** 100% by asking the right questions for clear picture
        - **Divide and conquer** by subtasking
        - **Research**
        - Devise a **plan**. For bigger problems, write a psuedo-code b4 actual code
7. Ternary operator: return values, used with expressions, NOT statements
    - **ternary computed in string template**
8. Brief History
    - Brendan Eich created 1st version of Js in 10 days, called **Mocha** 
    - Was changed to LiveScript
    - In 1996, was changed to JavaScript to 'attract Java developers'.
        - meanwhile, **has nothing to do with Java** - marketing strategy
    - 1997: ES1 (ECMAScript 1) became the 1st version of JavaScript languade standard
    - 2009: ES5 (ECMAScript 5) released
    - 2015: ES6/ES2015 (ECMAScript 2015) released. **the biggest update to the language ever**
    - After 2015: changed to an **annual release cycle**
    - **2016/2017/2018/2019/...** : Release of **ES2016(ES7)/ES2017(ES8)/ES2018(ES9)/ES2019(ES10)/...**
    - ES5: 
        - supported in all browsers
    - ES6/ES7/ES8: 
        - supported in **modern** browsers, but not in older browsers
        - Most features can be used in production by **transpilling and polyfilling (converting to ES5)** ^^
    - ES9/ES10:
        - called **ESNext**, including future versions
        - not all features supported in all modern browsers
        - Can use most features in production by **transpilling and polyfilling** :)
9. Function xpression vs fxn declaration
    - use **fxn expressions over declarations**
## How Js works behind the scenes
- Definition w/ the 9 monter terms: Js is a 
    - **high-level**, 
    - **prototype-based object-oriented**
    - **multi-paradigm**
    - **interpreted/Just-in-time compiled**
    - **dynamic**
    - **single-threaded**
    - **garbage-collected** lang with 
    - **first-class functions** and
    - a non-blocking **event loop concurrency model**
### JS Runtime in the browser
- Overview::The Js Engine - program d@ execute js code, 
    - contains the **heap** & **call stack**
    - **call stack**: uses the **execution context** to execute code
    - **heap**: memory pool storing all objects
- How execution happens::Compilation vs Interpretation
    - Compilation: convert entire source code to machine at once, and write to portable binary file, to be executed by any computer
        - file can be executed way after compilation
    - Interpretor: runs through source code, convert to machine code and execute line by line, all at same time
        - **js used to be intepreted** but now NOT true
    - **Just-in-time (JIT)**: convert entire code to machine at once, then execute immediately line by line
        - no portable file generated to be executed later
        - mix b/n the two.
        - **how modern JIT compilation works in JS?**
            1. parse the source code
            2. creates an AST tree
            3. takes the AST and compile into machine code, JIT
            4. machine code executed right-away, in the **Call Stack**
            5. during execution, background optimization happens on special thread (outside the call) but inside the engine
- Outside the Engine is the **callback queue** thats queues waiting events
- Events are moved **from the queue to the call stack** when the call stack is empty, by the Event loops
- **Web-APIs** like the DOM, Console.log, Fetch API is provided to the engine for access to browser objects
#### The JS Runtime's picture box
- The Js Engine
- The Web APIs
- The Callback Queue

This is an overview of what happens to our code hosted in the browser
- The host has a Js Engine: program that takes the code and execute
    - This is what happens inside the engine;
    - **Parser** read our code and validate the syntax
    - If valid, a data structure called **Abstract Syntax Tree** is produced by the Parser
    - **Abstract Syntax Tree** is then translated into **matchine code**
    - Now, code is run by the **processor** and does its work 

### The execution contexts (EC) and the execution stack (ES)
Code run in an env called execution context. A box/container/wrapper that stores vars and in which our code is evaluated and executed 
    - by default is the Global Execution Context
        - code **not inside any function**
        - it's the window object in browser
        - only one GEC
    - runtime stacking
        - global execution context > execution context (on top) > execution context (on top)
        - then pops each exe context off the stack after completion
        - one execution context per fxn call

#### The EC in detail
- the EC Object. Has 3  ff props;
    - Variable Object (VO)
    - Scope chain
    - "This" variable
- Goes through 2 phases in the ES
    1. Creation phase.
        1. Creation of the VO
            - Arg object created to store all args passed into the fxn
            - Var declarations are scanned: a property is created in the Variable Object for each variable, and set to **undefined**
            - Function declarations are scanned: a property is created in the Variable Object for each fxn, **pointing to the function** 
            - **NB**: Var + Function declarations = **Hoisting**
                - Means: they're available before the execution phase starts
        2. Creation of the scope chain
            - Each new fxn creates a scope: the env/space in which the vars if defined and accessible
            - **Lexical scope** means that in a lexically nested **implemented** function, the inner functions (**not function declarations**) have access to the (scope) variables and other resources of their parent scope.
            - But it doesn't work backward to its parents, meaning the child scopes not available to its parents.
            - This means that the child's functions are lexically bound to the execution context of their parents.
            - Scope chain **doesn't relate to the order in which method called** but rather **where it is written** 
                - const varibles are **block(eg, if-else) scoped** 
                - var variables are **function scoped** even when defined in **block scope**
                    - var type **create a property on the global window object**
                - **that is the reason to always use const/let** unless in legacy code
                - declarable functions **can be block or function scoped** depending wether in strict mode or not
        3. Determine value of **'this'** var
            - In a **regular function**, the **this** points to the global object (ie, window object in the browser)
                - In a **method**, the **this** points to the object that (**defined**) called the method, ie, the owner of the method
                    - points the custom object within which it is defined, otherwhise the global
                    - **method borrowing**: `x.a = y.b`
                    - this is **not static**  
                - In regular method **call**, the 'this' is **undefined**/window global obj, because not called by object
            - In **arrow function**, 'this' is the **'this' of the surrounding/parent function** (ie, lexical 'this'). Arrow fxns **does not get their own 'this' keyword**...
                - nb: **don't use** 'this' ins arrow fxns
            - In **event listener**: 'this' is the **DOM element that the handler is attached to**, ie. the dom element owning the handler
                - Event handlers can have return value to their caller. eg;
                ```js

                // PaginationButtonView file
                class PaginationButtonView{
                    _parentElement = document.querySelector('.pagination');

                    addPaginationHandler(handler) {
                        this._parentElement.addEventListener('click', e => {
                            const sourceBtn = e.target.closest('.btn--inline');
                            if(!sourceBtn) return; // guard clause
                            const goToPageBtnNumber = +sourceBtn.dataset.goto;
                            handler(goToPageBtnNumber); // passing data to handler for further process
                        })
                    }
                }

                // controller file
                const paginationButtonController = function(responseFromHandler) {
                    console.log('page controller:', responseFromHandler); // return response 
                }

                paginationButtonView.addPaginationHandler(paginationButtonController); // pub-sub, event-driven

                ```
            - The 'this' will **NOT** point to the function itself or the variable environment
                - use a **regular function declaration/expresion** over **arrow function** to avoid the 
    2. Execution phase
        - Funtion's code d@ generated the current EC is ran line-by-line

** NB:
    - scope => 'where do variables live?'
    - 3 types of scopes: global scope, function scope, block scopes (let, const)  
### Js _Hoisting_
- means some variables can be used/accessed in the code before they're actually declared/defined/body-written
    - in short "variables lifted to the top of their scope"
    - eg. var type variables are 'hoisted' before even being asigned a value
        - initial value: **undefined**
    - eg. functions declarations are declared on top before actually being defined
        - initial value: actual funtion
    - eg. function expressions are not hoisted
        - intial value: unintialized, Temporal Dead Zone (**TDZ**) - defined but can't be used unless has value
- how hosting really happens?
    - before execution (in the context execution inside the call stack), code in scanned for variable declarations, and for each variable, a new property is created in the **variable environment object**.
        - if it knows that variables are declared beforehand, it will be set to undefined when you want to use
            - **var** type is undefined cus hoisted
            - **const and let** type is uninitialized cus **not hoisted**... in TDZ mode
        - if you want to use a function before being declared, it will point to that
    ```js
    variableObj = {
        x: undefined,
        y: z()
    }
    ```
- applies more on regular functions not function expressions
- examples
```js
console.log(a)  // undefined
console.log(b)  // uninitialized, TDZ
console.log(c)  // uninitialized, TDZ

var a = 'a';
const b = 'b';
let c = 'c';
```

### Premitive values vs Reference values
Premitive values: values string, numbers, etc
- stored in **call stack**
- new address is created in stack when copied to another
```js
let a = 'a';
let b = a
b = 'b'

// a = 'a'
// b = 'b'

```
Reference values: values of objects
- stored in **heap**
- obj can't be stored in stack cus it's huge so only it's memory address is reference in the stack
```js
let me = {
    sn: 'erb',
    age: 25
}
let friend = me;
friend.age = 26;

// me = { sn = 'erb', age = 26 }
// friend = { sn = 'erb', age = 26 }
```
- new variable, not created w/ new address but rather points to the same object address in the call stack (referenced from the heap)...thus affecting existing value

## DOM Manipulation
DOM: structured rep of an html doc, used to conn webpages to script like Js
    - Js helps to access and manipulate the dom
Events
    - notifications sent to notify a code that sth happened on the webpage
    - unlike regulare fxns that are **called**, **event listeners** are also fxns but perform action based on event. They wait for specific event to happen, like click a btn, scroll, key press, etc
    - how are events processed
        - events can only be handles/processed as soon as the Execution Stack is empty. 
        - events are stored in a **message queue** waiting to be processed 

## Object Inheritance and the Prototype Chain
- Every Js obj has a **prototype property**, which makes inheritance possible in Js
- The prototype property is where methods and properties that will be **inherited by other objects** are put
- The Constructor/Class's prototype property is **NOT** the prototype of the Class **itself**, it's the prototype of **all** instances that are created through it.
- When certain meth is called, that meth is being searched for in the obj itself, and it cannot be found, the search moves to the mother Object's prototype. This search continues until meth is found. This is called **Prototype Chain**
- Useful instance fxns
    - `hasOwnProperty`
    - `instanceOf`
    - `_proto_`

## Data Structures, Modern Operaters and Strings
- Array destructuring: unpacking var data
    - switching vars
    - nexted distructuring
    - setting default values
- **Object destructuring**
    - destructuring unpacks key-value pair elements in object
    - basically removes the ending bracket
    - always set default values
    ```js
    // Given data = {a: 1, b: 2}
    // Task: add a 'c' property
    const data = {a: 1, b: 2}
    const result = {...data, c: 3}

    const recipe = model.state.recipe;
    const {recipe} = model.state;   // improved
    ```
- **Spread operator**: used whenever need to expand elements from array individually  
    - `...x`...`n, n1, n2`
    - mostly used on _iterables_: array, set, map
        - used on objects as well
    - useful in place that expect items separated by comma
    - 2 useful case
        - ...to build/join arrays
        - ...as param to function
- **Rest pattern**: packs element of array
    - lookup :)
- Ternary
    - to set default value where 0 and null are invalid (replaceable with `||` Short-circuiting)
    - replaces one-line if-else blocks
    - used when there's a conditional statement to decide
    - replaces "if-else" code
- Short-circuiting with or and &&
    - `&&` => to **replace one-line if-condition without the 'else' part**
        - as guard clause
        - for if this is true/valid, then do this
        - eg; Adding a key-value pair to object if key exist on incomming `data`
            ```js
            let recipe = data;
            return {
                id: recipe.id,
                cookingTime: recipe.cooking_time,
                ingredients: recipe.ingredients,
                ...(recipe?.key && {key: recipe?.key})  // add object if exists **
            }
            ```
    - `||` => to set default value where 0 and null are invalid
 

- **Nullish coalescing operator: ??**
    - makes sure value is not null or undefined
    - **always use to replace default value setup w/ ternary (when 0 is considered valid)**
    - for only `nullish` property
    ```js
        let userName = "Alice";
        let fallbackName = "Guest";

        let displayedName = userName ?? fallbackName; // displayedName will be "Alice"

        let quantity = 0;
        let defaultQuantity = 1;

        let finalQuantity = quantity ?? defaultQuantity; // finalQuantity will be 0 (because 0 is not null or undefined)

        // example 
        
    ```
- || vs ?? vs tenary
    - The || returns the **right value** ONLY when the left value is falsy. Falsy values include: `0, "", false, null, undefined, NaN`
        ```js
            0 || 5   // 5
            "" || "hi"   // hi
        ```
    - In contrast, ?? returns the right value **ONLY** when the left value is null or undefined. It does not treat 0, "", NaN or false as invalid. 
NaN`
        ```js
            0 ?? 5   // O
            "" ?? "hi"   // hi
            false ?? "hi"   // false
            null ?? "hi"   // hi
        ```
    - In tenary, returns value, and used when the if-condition is more than just value validity...ie, but rather external conditional logic 
    - Key distinction:
        - || = "falsy replace"
        - ?? = "null/undefined replace only"
        - To use any, as yourself if return can 0, empty string or false

        ```js
        let emptyString = "";
        let defaultValue = "Default";

        let resultWithOR = emptyString || defaultValue; // resultWithOR will be "Default" (because "" is falsy)
        let resultWithNullishCoalescing = emptyString ?? defaultValue; // resultWithNullishCoalescing will be "" (because "" is not null or undefined)
        let tenary = someOtherCondition ? trueBlock : ElseBock;    // used when there's an if-else block...
        ```
- **Optional chaining: ?**
    - checks if property exist before access
    - **used w/ null colescing to set default**
    - `a.b?.c ?? 'default'`
- **Refactoring - Use case**;    
    ```js
    const userSpendingLimit = {
        'erb': 1200,
        'anthony': 1000
    }
    
    // if-else
    let user; // input
    if(userSpendingLimit[user]){
        user = userSpendingLimit[user];
    } 
    else {
        user = 'erb'; // default user
    }

    // improved using ternary
    const spendingLimit = userSpendingLimit[user] ? userSpendingLimit[user] : 100;

    // improved using null colescing
    const spendingLimit = userSpendingLimit?.[user] ?? 100;


    //// Different use-case with String concatination
    
    // Opt A...if with no else
    let output = '';
    if (entry.value <= -bigLimit) {
       output += `${entry.description.slice(-2)} / `; // Emojis are 2 chars
    }

    // Improved A...ternary
    output += entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
    ```
    - Refer to the [`clean.js`](./10-Modern-JavaScript-Modules-Tooling/clean.js) in Module `10-Modern...` for more **refactoring** details

- **For-of loop**
    - get index with `.entries()`
        ```js
        const myArray = ['apple', 'banana', 'cherry'];

        for (const [index, value] of myArray.entries()) {
            console.log(`Index: ${index}, Value: ${value}`);
        }
        ```
- **Enhanced object literal**
    - object literal => you literary build an object without using any api, just using `{...}`
    - **keys/property names can be computed** not just the values
    - **if property name equal value..don't repeat the variables**
    - 
    ```js
    // given
    someArray.push({name: name, age: age, address: location}) // where name, age, location are inputs

    // then it can be refactored to
    someArray.push({name, age, address: location})
    ```
- Set
    - accept an iterable eg, array
    - **specific item is not retrievable because order doesn't matter, ie no indexes**
    - unique, no duplicate
    - can check whether an element exists
- Maps vs Object
    - object **keys are always string** whilst map **keys can be any type**
    - maps: 
        - when need **any** type as keys
        - easy to iterate and compute size
        - when need map keys
    - objects: 
        - easy to access with . and []
        - when working with json
        - when need only string as keys and *need to include methods* as value
- Object to/from Entries
    - Can convert entries to object 
    - Convert object to entries in order to perform data transfromation with map, filters, etc on it
    - **entries eg:** 
        ```js
        [
            ['1', one], 
            ['2', two], ...
        ]
        ```
        - convert entries to object with `Object.fromEntries(entries)`
        - vice-versa (from object to enteries): `Object.entries(someobject)`
- Arrays vs Sets
    - arrays: 
        - used when need **ordered** list of values
        - when can contain **duplicates**
        - when need to manipulate data
    - sets: 
        - used when need **unique** values
        - when **high-performance** is important
- Strings
    - most useful methods: 
        - expression: `.slice(), .trim(), .toLowerCase(), .toUpperCase(), .replace[All]()`
        - conditional: `.includes(), .startWith(), .endsWith()`
        - array: `.split(), .join()`
        - `.padEnd(), .repeat()`
- Functions with default param
    ```js
    const addExpense = function (value, description, user) {
        if (!user) user = 'jonas';  // setting default user param
        user = user.toLowerCase();
        ...
    }

    // Improved...set in param
    const addExpense = function (value, description, user = 'jonas') {
        user = user.toLowerCase();
        ...
    }

    renderError(message = this._errorMessage) {...}
    ```
- Arrow functions
    - usecase 1: when creat straigtforward function
    - takes user input an returns result
    ```js
    const getLimit = user => spendingLimits?.[user] ?? 0;

    const user = 'erb';
    const limit = getLimit(user)
    ```
## Functions: A closer look
- **Pass arg by value vs reference**
    - by value:
        - for premitive types
        - arg value is copied to into param value
        - diff addresses thus independent of each other
        - change on one doesn't affect the other
    - by reference
        - for non-premitive types
        - arg address is coppied to param, ie pointing to same address
        - change on one affect the other
    - js does **NOT have pass by reference** even though it looks like 
        - the reference is a value containing memory address 

- **First class and Higher order functions**
    - 1st-Class fnxs
        - functions treated as 1st class
        - means functions are simply **values**
        - functions are just another **'type' of object**
        - functions can be
            - stored in a variable
            - passed as argument to another fnx
            - called on another fnxs
    - Higher-order fnxs
        - fnxs that recieves anther fnx as arg or returns another fnx or both
        - `btn.addEventListener('click', greet)`
            - `addEventListener` = higher order fnx
            - `greet` = 1st class fnx
        - Function returning another function
        - the call() and apply() and **bind()** methods
        - IIFE
        - Closures
    
## Working w/ Arrays
- .splice() / .slice() / .reverse() / .join() / .pop()
- forEach loop 
    - is a higher-order function that takes a callback fxn
    - only causes **side-effect**, **doesn't return** a new instance
    - in Arrays
        - **forEach comes with index & the entire array**. eg; `numbers.forEach((number, index, numbers) => log(number, index, numbers))`
        - loop is not breakable
            - always loop over the entire array
            - **continue and break statement doesn't work in forEach loop**
            - **to break out of the loop, use For-of loop**
    - in Maps
        - **forEach comes with the value, key & the entire map**. eg; `numbers.forEach((value, key, numbers) => log(value, key, numbers))`
    - in Sets
        - **forEach comes with the value, throw-away & the entire set**. eg; `numbers.forEach((value, _, set) => log(value, set))`
            - **_** implies throwaway variable
                - means ***variable is unnecessary or unused*
- Data transformation
    - Map, Filter, Reduce
    - Map: 
        -**Has index**
        - .map((item, **index**, array) => ...)
        - **used when wanna return a new array**
            - unlike `forEach` that just does causes **side effect** (modifies the original data) **without returning** a new object/array
        - Given 
        ```js
        const data = [
            {value: 550, description: 'Sold old TV 📺'}
            {value: 95, description: 'Groceries 🥑'}
            {value: 15000, description: 'Monthly salary 👩‍💻'}
            {value: 4500, description: 'New iPhone 📱'}
        ]

        // Impure: causes side-effect + mutability
        const checkExpenses = function (data) {
            for (const entry of data) { // or forEach
                if (entry.value > 1000) {
                    entry.flag = 'limit';   // add property
                }
            }
        };

        // Pure: immutability + no side-effect
        const data = Object.freeze([
            {value: 550, description: 'Sold old TV 📺'}
            {value: 95, description: 'Groceries 🥑'}
            {value: 15000, description: 'Monthly salary 👩‍💻'}
            {value: 4500, description: 'New iPhone 📱'}
        ])
        
        const checkExpenses = function (data) {
            data.map(entry => { // improved with map + destructuring
                return entry.value > 1000 ? 
                {...entry, flag: 'limit'} : entry   // add property ***
            })
        };
        ```
    - Filter:
        - conditioned to return new array with same or less number of elements
        ```js
         const data = Object.freeze([
            {value: 550, description: 'Sold old TV 📺'}
            {value: 95, description: 'Groceries 🥑'}
            {value: 15000, description: 'Monthly salary 👩‍💻'}
            {value: 4500, description: 'New iPhone 📱'}
        ])

        const logBigProducts = function () {
            let bigExpense = '';
            for (const entry of data) {
              bigExpense += entry.value <= 1000 ? `${entry.description.slice(-2)} / ` : '';
            }
            bigExpense = bigExpense.slice(-2);

            console.log(bigExpense);
        }

        // Improved with filter, map, join
        const logBigProducts = function (data) {
            const bigExpense = data.filter(entry => entry.value <= 1000)
                                    .map(entry => entry.description.slice(-2))
                                    .join(' / ');
            console.log(bigExpense);
        }
        ```
    - Reduce:
        - .reduce((**accumular**, currentItem, index, array) => ..., **initialValue**)
        - initialValue => value before the first iteration even starts
            - just like initializing `int accumular(sum) = 0` before for-loop
        - usages;
            - any operation that returns only one value;
                - for sum
                - finding max value
            ```js
            const max = movements.reduce((acc, cur) => {
                if(acc > cur) return acc;
                else return cur;
            }, movements[0])
            console.log('max', max);
            ```
    - NB: It's a **bad practice to chain methods(like `splice()`) that mutate the underlying original array**

- Find() method
    - returns only the 1st element which satisfies the condition
    - used to find only one matching element
    - vs Filter
        - **find doesn't return a new array but filter does**
- **FindIndex() into Splice()**
    - really useful to delete item
- Some()
    - checks if matches **any** of the condition
    - **similar to includes()** some(x => x == match)
- Every()
    - returns truthy if every item matches given condition
- **Flat(), FlatMaps()**;
    - Flat = flats nested (on n-deep level) arrays
    - FlatMap = `.map(..).flat();`
- **Programmatically creating and filling arrays**. using;
    1. Array constructor + .fill()
    2. Array.from({length: 5}, callbackFxn)
        - fill the array by using callbackFxn like in .map(), but only the index is needed
        - most preferred
        - .querySelectorAll() yeilds a nodeList which is does not have array methods
            - so Array.from() can be used to create a real array from that
        - usage similar as the spread operator (...)
- array cheatsheet
<img src="./Res-Ref/array-methods.jpg">

## Numbers, Dates, Internationalization, Timers
- Numbers
    - Number.parseInt(), Number.**parseFloat('10px')**,
    - Number.isFinite(), - **better to check if sth is a number not stringified number**
- Math and Rounding
    - **Math.min/max()**
    - `trunc(), ciel(), floor()`
- Remainder
    - %
- Big int
    - Numbers
        - max bit: 2^64
        - max number: 2^(53-1) 
        - **same as `Number.MAX_SAFE_INTEGER`**
    - Big int help get number beyond the max int number
        - using '**n**' postfix
        - eg: `23333333333333333333334444444444444444444n`
- Dates
    - **Timestamp** is the **milliseconds**
        - eg `getTime()`
    - **.getFullYear()** over getYear()
    - `.toISOString()`
        - eg '2019-11-18T21:31:17.178Z'
    - **.padStart(2, 0)** useful to get 2 digits for minute, hour, day, month
    - date operations
        - **timestamp (in ms) is useful**
- **Internationalization**
    - format dates based on location or country
    - **search "iso language code" to format date**
    - **can determine local from browser programmatically**
        - `navigator.language`

- **Timers**: 
    - setTimeout
    - setInterval

## Advanced DOM
- How DOM really works
    - DOM is basically an interface b/n Js and Browser
        - allows make Js interact with browser
        - help us write js code to create, modify and delete html elements; set styles, classes and attributess; listen and respond to events;
        - help us interact with the DOM tree from an HTML document
        - DOM contains APIs (methods and properties) to interact with the DOM tree
    - every element is represented as **Node** object, each node, eg `<p> Paragraph text </p> <!-- Comment -->` consist of the following types of subNodes;
        - element `<p> ... </p>` 
            - has HTMLElement type, with downlevel types like HTMLButtonElement, HTMLDivElement. 
            - One type of HTMLElement per HTML element, each has access to different properties/methods for each type
        - text `... Paragraph text ...`
        - comment `... Comment ...`
        - document
            - is another type of SubNode
            - has access to `.querySelector(), .getElementById(), etc`
- The Node object also inherits from a super class object called **EventTarget**
        - which has access to these methods - `.addEventListener(), .removeEventListener()`
        - this makes it possible for child nodes to add and listen to event listeners
- Selecting, Creating and Deleting ELEMENTS
    - follow-up with the `.js` files for illustrations
- Styles, Attributes and Classes
    - `.styles`
        - computed styles
    - .attributes...`getAtrributes()`
    - `.ClassLis`t
    - follow-on source .js file
- Types of Events and Eventhandlers
    - adding events listeners
    - removing event listener
- Event Propagations: Bubbling and Capturing
    - Events travels from the root element down to the target element, and then handled. This is called **Capturing**. After handled, event then travels all the way up to the root again called **Bubbling**
    - This means: when an event is also handled by any of the target element's parents, it will be handled twice - the parent and child target element.
- DOM Traversing
    - walking through the DOM
        - selecting an element relative to another element
        - sometimes direct child or parent
        - when we don't know the structure of the DOM at runtime
    - getting child element(s)
        - `.querySelector()`
    - getting parent element(s)
        - `.closest()`....**opposite** of `.querySelector()` since target child element whilst closest target parent element 
    - getting sibbling element(s)
        - `next[previous]Sibling()`
    - follow-up to .js file
- Building Tapped component
    - **guard clause:** find the opposite of what we're interested in, and if the opposite is true, return the funtion immediately
    ```js
        if(!handsome) return;
        if(handsome){ interested flow }

        // on array
        const data = [];
        if(!data || data.length === 0) return 'error'; // show when the data is empty
    ```
- Passing Arguments for Event Handlers
    - followup to 'mennu fade animation'
- Sticky Navigation
    - not implemented in js file
- Building Slider / Carousel
    - not implemeted
- Lazy Loading Image
    - not implemented in js file
- Life Cycle DOM Events
    1. `DOMContentLoaded` event: triggered when HTML, and internal Js script loaded with the DOM tree built...but exeternal resources like images are not yet loaded
    2. `load`: triggered are the page has fully loaded with images and resources done downloading
    3. `beforeunload`: triggered just before the page is about to be closed...can be used when user is in the middle of filling a form and that can lose data when closing the page
- Efficient js Script loading
    - regular synthronous script at end of html body
        - **Order:** `Finish parsing html -> Fetch script -> Execute script`
        - Quite Better
    - regular synthronous script at head of html
        - while parsing html, it will wait to fetch and execute js script before finishing html parsing
        - meaning, html/dom will not finish parsing before js script execute
        - **order:** - `Parsing html -> Fetch script (While paused html parsing) -> Execute script -> Finish html parsing`
        - not good cus some html script execute against html dom
    - `async` in html head
        - **Order:** `Parsing html (Along side fetching script) -> Execute script (while paused html parsing) -> Finish html parsing`
    - **`defer`** in html head
        - best for developer custom script
        - script fetched async and executed after html is completely parsed
        - **order:** `Parsing html (along side fetching script) -> finisht html parsing -> Execute script`
    - conclusion:
        - Goal is to finish parsing the html dom and fetching script along side before executing script
        - Therefore, the **`defer` in head is perfect** as it's most efficient

## OOP
- What it is.
    - OOP principles
        - Abstraction: **hiding** class members(properties/methods) / details that **don't matter**
            - **Exposes** only required members that will be interracted with
        - Encapsulation: keeping class members **private**
            - Makes members **not accessible from outside** the class
        - Inheritance: making members of certain class **available to child class**. 
            - Ensures **common logic reuse** in class relationship 
        - Polimorphism: child class can **overwrite** method inherited from parent
- OOP in Js
    - Class in Java === **Prototype** in JavaScript
    - Instantiation in Java === **Prototypal Inheritance/delegation in Js**
    - 3 Ways of creating Prototypal inheritance
        - **Constructor functions**
        - **ES6 Classes**: most **prefered**
        - Object.create()
- Prototypes
    - sort of like a class in Java
    - `Class.prototype.somemethod()` on Class prototype
    - `__proto__` property on objects
        - linkes object to its class properties
    - refer to implementation
- Prototypal Inheritance on Built-In Objects 
    -  Prototypal Inheritance is how js classes work
    - `__proto__` to lookup parent chain...from child object to top-level parents
    - refere to implementation
- ES6 Classes
    - Makes it easier for devs from OOP background to adopt to js classes
        - syntactic sugar for function constructors
    - Classes in js **doesn't really work like traditional classes** in languages like Java
    - 2 types of implementation
        - 1. Class expression
        - 2. Class declaration
            - most preferred by devs from oop background
    - Key things about classes
        1. Classes are **NOT hoisted**
        2. Classes are first-class citizens: can be **passes into functions and return them from fnxs**
        3. Classes are **executed in strict mode**
    - refer to implementation
- Getters and Setters
    - help **access methods as properties instead of funtions**
        - `instance.age` instead of `instance.age()`
    - Getters
        - Help perform calculation before while getting
    - Setters
        - Help perform **data validation** before setting data to class property
    - Regular methods
        - Good practice to **return the `this` object on `method setters` for method chaining** purposes
        - **while getters return `properties`, setters return `this`**
        - Especially methods that changes object state(s)
        - Chain of responsibility design principle
    - Getter or setter property **already existing in the constructor should recreate** that property with diff name like - starting with '_' underscore
- Static Methods
    - not added to `.prototype` property
        - **not inherited by instances**
    - they are **helper methods**
- Object.Create()
    - create an instance from a prototype
    - `const erb = Object.create(PrototypeClass)`
- **Inheritance** Between "Classes"
    - Using Constructor functions
        - using `.bind()` and `Object.create(somePrototype)`
        - refer to implementation
    - Using **ES6 Classes**
        - using `extends` and `super()`
        - refer to implementation
    - Using Object.create()
        - linking objects to create inheritance
        - refer to implementation
- Encapsulation
    - `#privateFields`
    - `#privateMethods`
    - **refer to implementation**

## Mapty - OOP, Geolocation, External Libraries and More
- Planning a Web Project
    1. User Stories: **Description of the application's functionality** from the user's perspective. 
        - All user stories put together decribe the entire application
        - As a [user], I want [an action] so that [a benefit]
        - Answers **Who? What? Why?**
    2. Features: exact features to make **user stories work as intended**
    3. Flowchart: what it will be built
    4. Architecture: how it will be built. It gives structure. 
        - How code is organized into different modules, classes, and functions
- Development steps (Mapty project)
    1. User stories
        1. As a user, I want to log my running workouts **with location, distance, time, pace and steps/minute**, so that I can keep a log of all my running
        2. As a user, I want to log my cycling workouts **with location, distance, time, speed and elevation gain**, so that I can keep a log of all my cycling
        3. As a user, I want to see all my workouts at a glance, so that I can easily track my progress over time
        4. As a user, I want to also see my workouts on a map, so that I can easily check where I work out the most
        5. As a user, I want to keep all my workouts when I leave the app and come back later, so that I can keep using the app over time
    2. Features on user stories
        1. Map for user to click and add new location (best way to get user coordinates) using
            - Geolocation to display map at current location
            - Form to input rest of data - distance, time, space, steps/minute
        2. Form to input distance, time, speed, steps/minute
        3. Form to input distance, time, speed, elevation gain
        4. Display all workouts in a list
        4. Display all workouts on the map
        5. Store workout data in browser using local storage API
            - On page reload, read the saved data from local storage and display data
    3. [Flowchart](./8-Mapty-OOP-Geolocation/Mapty-flowchart.png)
    4. Architecture: how code will be organized
        - [Basic architecture - part 1](./8-Mapty-OOP-Geolocation/Mapty-architecture-part-1.png)
        - [Improved architecture - final](./8-Mapty-OOP-Geolocation/Mapty-architecture-final.png)
- Displaying map using **Leaflet** library
    - the **order** of js script in html head:
        - **each script will have access to the global members (methods/properties) of the preceeding js scripts, but not vice versa**
- Displaying map and form
    - `submitEvent.preventDefault()` => very key that it prevents form reload
- Refactoring for Project Architecture
    - Refactor spagetti code to OOP-based code
    - To **re-point from method caller to app instance**, use:
        - `.bind(this)` on event handlers
- Managing workout data: creating classes
    - desiging Workout parent class, with Cycling and Running a children through inheritance
    - **event delegation**
        - add event to common / parent element
        - select the scope of each child element using `closest()`
        - process that target child element...
        - help to listen for event on child element that's not rendered yet (generated dynamically), by targeting the parent element which there already and then traversing down to the child element by the time it's present  
- Working with local storage
    - storing works in browser local storage
    -  **object loses its prototype chain when restored from local storage**


## Asynchronous - Promises, Async_Await, and AJAX
- Asynchronous
    - Synchronous
        - code runs and execute line by line (in the execution thread) in the order written
        - example 
        ```
        const a = 'a';
        alert('text');
        const b = 'b';
        ```
        - each line of code waits for previous line to finish
        - Problem: if a line of code takes a long time to run
        - it blocks the rest of the execution
        - long-running operations *block* code execution
    - Async
        - means 'not occuring at same time'
        - code is executed **after a task that runs in 'bg' finishes**
            - code is non-blocking
            - **callbacks alone doesn't make code asyncronous**
            - **since called by another fxn (and not us), () brackets is not required**
- Promises
    - an object that is used as a **placeholder for the future result of an async operation**
        - simply **a container for a future value**, that will be delivered asynchronously
        - eg: lottery and bet ticketing
    - benefits:
        - **replaces useage of events & callbacks** to handle async results
        - easy **chain of promises** for sequence of async operations, instead of callback hell
    - **life cycle**
        - 1. Pending state: **before** future value is available
        - 2. Settled states: async tasks **has finished**. either
            - Fulfilled: Success! The result is now **available**
            - Rejected: An **error** happened
    - To consume a promise,
        - you need to **have a promise already**
        - or need to **create one**
        - where a Promise is returned
            - the **`.then()` is called on it for the value**
            - `response.json()` **also returns a Promise**, thus `.then()` needs to be called on it
    - Error handling
        - `.catch(err => ...)`
        - each callback error can be caught/handled 
        - need to be **handled globally by being the last in the callback chain**
        - `.finally()`
            - runs whether promise is success / not
            - use case: **handle loading spinner**
                - hide spinner wherether success / not
    - Throwing error manaully
        - what if 404, means promise was not rejected(no error occurs), success just that no data is found
            - this needs to be handled manually
        - **handle custom error with the `.ok` property on response**
            - `if(!response.ok) throw new Error('sth went wrong')`
        - **manaually throw any error, that the Promise global catch() might not be able to catch automatically**
- How async works behind the scenes in the runtime within the
    - call stack
    - web API
    - callback queue
    - micro-task queue
- Creating promises
    - Promises are consumed most often, but a use case for creating one is by wrapping callback fnx with a Promise
        - this is called Promisifying
    - **promising Function should return** a `new Promise((resolve, reject)...)` like this
    ```js
    const downloadImage = function (imgPath) {
        return new Promise((resolve, reject) => {   // returns a promise
            // do some work
            resolve(theImageResult)

            // work leading to error
            reject(new Error('Image not found'))
            
        })
    }


    downloadImage.('path/img').then(img => console.log(img))
                              .catch(err => console.log(err))
    ```
    - note that `resolve` and `reject` are callback functions
    - Creating promise and resolving immediately using static method.... ``Promise.resolve()....Promise.reject()``
    - if **resolve has no parameter, means it returns nothing**
    - **waiting for all promises:** `Promise.All()`
- Async / await
    - mark function as async
    - **has at least one await operation**
    - **await any funtion that returns a promise**
    - it's is synthetic sugar for writing Promises/then
    - makes code looks syncronous but it's async under the hood
- Handling async / await error
    - use **try-catch block**
    - **never ignore handling error esp with async functions**
- Returning values at top-level funtion
    - `.then()` can be called on async methods but not a good practice
        - mixes async with promises
    - use **async with IIFE with await with try/catch**
    - use **await to get the value from a Promise operation**
    - if `Promise{<pending>}`, then **just `await` for the result**
- Running promises in parallel
    - when promise operations are independable, it's good to run them in parallel using
    -   ```
        await Promise.All([...promises])
        ```
    - it **short-circuit** when one fails
- Promise **Combinators**
    - **Promise.All**.......returns an array
        - short-circuits if **there's a rejection**
        - important
    - **Promise.Race**......returns only one value, res[0]
        - used with **timeout()** to cancel long request
        - important
    -  others:
        - Promise.settleAll
        - Promise.any
    - map with asyn / await 
        - **since `createImage()` is a promise, it needs to be awaited thus callback param should be asynced**
        - *map() with Promise.all() is very handy*
    ```
    try {
        const imgs = imgArr.map(async img => await createImage(img));   // returns array of Promises
        const imgsEl = await Promise.all(imgs); // await them to get the fulfilled values from the promise array
        console.log(imgsEl);
    } catch {

    }
    ```

## Modern JavaScript Development_ Modules, Tooling, and Functional
- Mordern Js Development Process
    1. Developement: Modules, 3rd-party packages
    2. Build process: Bundling -> Transpiling/Polyfilling (uing Babel) ...(automate build tools bundler tools like Webpack or Parcel)
    3. Production: Js Bundle into prod
    -  **Transpiling** simply means taking out ES6 code and converting it into ES5 so it can be read by all browsers 
- Overview of modules
    - **Modules: reusable piece of code that encapsulates implementation details**
    - Usually **standalone file**
    - main goal is to **encapsulate functionality, to have private data and to expose a public API**
    - Importance
        - small building blocks to build complex apps
        - can be developed in isolation w/out thinkin' of the entire codebase
        - organize codebase
        - code reuse 
- How module is diff from regular js script
    - Module **supports imports and exports**
    - Has html linking of **`<script type='module'>`** instead of `<script>`
    - The Top-level **`this` value is `undefined`, but `window`** for script
    - Top-level variables are only **scoped to that module, but global** variable for script
    - Module's file dependency downloading is async. but sync for script
- How ES6 Modules are imported to a project 'index.js' script file
    - **Given index.js making with other external modules imported**, this is what happens:
        1. Index.js is parsed (read w/out execution)
        2. External imported modules are downloaded asynchronously
        3. Link imports to external module's exports variables
        4. Execute external module
        5. Execute my index.js module
- Importing and exporting modules
    - **Named imports** & exports
    - **Default imports** & exports
        - Import can have any name and not wrapped in `{}` because...
        - can have only one default export per module file, but you can have as many named exports
    - Aliasing imports and **even aliasing exports** with `as`
    - Can import everything - **the alias becomes an object**
        ```js
        import * as ShoppingCart from './shoppingCart.js'
        ShoppingCart.totalCost();
        ShoppingCart.carts;
        ```
    - NB: **imports are live connection to exports**
        - Imports are not copies of exports
        - **Imports are organized in objects - `{var1, var2, ...}`**
        - Imports varibles are **passed by reference**
        - **Top-level imports are executed first**
- Other Types of module system
    - AMD Modules
    - CommonJS Modules
        - used in node
        - uses `export.someVariable = ...` for export and `const { someVariable } = require('./someModule.js')` for import
- Intro to NPM
    - Why the need for npm ?
        - Back in the days, external libraries are included in the HTLM file using the `<script>` tag, which exposes global variables that could be used - similar done in the Mapty project
        - This approach creates problems in huge apps as it's not manageable
        - First, doesn't make sense for html file to load dependencies
        - Also, normally the dependencies (like Boostrap files) will be added into the project offline. With this, when a new version of the dependencies are released, one has to manually go their site, download the updated version and manually reconfigure into the project. This is a huge pain and not ideal.
        - **Solution**: NPM provided a single centralized place where dependencies are managed with ease.
            - How? **NPM is initialized** in each project to create a `package.json` file
            - `package.json` stores all dependencies in `dependencies: {}` block
            - Any installed module dependency gets stored in the **node_modules** folder
            - Each file there can be **inspected (for what variables are imported), imported and used**
            ```js
            import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
            // import cloneDeep from 'lodash-es'; // shorter

            const myobject = { name: 'erb', age: 25 };

            const result = cloneDeep(myobject); // imported member is used as function...as intended after checking the cloneDeep.js file
            console.log(result);
            ```
        - NB: **Never include/share the `node_module` folder to Github or another matchine. It can always be restored with `npm install` command**

- Building with **Parcel** and **NPM scripts**
    - Parcel is a module **bundler** that works out of the box, without configuration
    - Other similar one is **Webpack**.
    - Parcel gets to the `"devDependency": {}` block once installed
    - **`dependency` block vs `devDependency` block** (in `package.json`)
        - Dependencies, when installed. are used in the code and needed to run...eg: Express
        - DevDependencies, when installed, are used as build tools (by developers) to only develop...eg: unit tests, liveserver, js transpilation, minification, etc
    - **NPM scripts**
        - allows usage of installed devDependencies. eg;
        - inside `package.json`
        ```json
        "scripts": {
            "mystart": "command with here"
        }
        ```
        - inside the CLI 
        ```cmd
        $ npm run mystart
        ```
        - It's recommended to install tools locally instead of globally
    - Parcel **hot reload** script - makes it easier to update only small component, without reloading the whole app
    - **Polifilling**

- Clean and modern Js techniques and best practices
    - Write **readable code**
        - write code others **understand**
        - code that your future self will still understand
        - avoid too 'clever' and overcomplicated solutions
        - use descriptive variable names: **what they contain**
        - use descriptive function names: **what they do**
    - General
        - use **DRY** principle (refactor code)
        - don't pollute global namespace, encapsulate instead
        - don't use **var**
        - use **strong type checks** (=== and !==)
    - Functions
        - functions should be **cohesive** - do **only one thing**
        - don't use **more than 3** function parameters
        - use **default parameters** when neccessary
        - use arrow functions when makes code more readable. 
            - Good use-case is **arrow functions as callbacks in array methods** like map, foreach, etc
    - OOP{}
        - use **ES6 classes**
        - encapsulate data - **don't mutate directly** from outside the class. use public API to manipulate the data
        - implement **method chaining**
        - **don't** use arrow functions as regular class methods because you will not get access to the 'this' keyword on the object
            - try avoid arrow function usage as methods to prevent errors regarding 'this'
    - Avoid nested code
        - use early return (**guard clauses**)
        - use ternary / logical operators instead of 'if' 
        - avoid for-loops, use array methods instead - like maps, filter, reduce
        - avoid callback-based async APIs
    - Asynchronouse code
        - consume promises with async/await instead of 'then' for best readability
        - run promises in parallel (`Promises.all`) whenever possible. it's faster
        - handle errors and promise rejections

- Programming paradigms
    1. Imperative programming
        - Developer explains "**How to do things**"
        - Developer explains every single step to follow to achieve result
        - doubling
        ```js
        const arr = [2, 4, 6, 8]
        const doubled = [];
        for (let i = 0; i < arr.length; i++) {
            doubled[i] = arr[i] * 2;
        }
        ```
    2. Declarative programming
        - Developer tells "**What to do**"
        - Developer describes the way and the computer achieve the result
        - The HOW is abstracted
        ```js
        const arr = [2, 4, 6, 8]
        const doubled = arr.map(x => x * 2);
        ```
        - This has given rise to **Functional programming**, a declarative programming paradigm
            - Based on the idea of writing software by combining many **pure functions**, avoiding **side effects** and avoiding **mutating** data
            - Side effects: means, modification of any data **outside of function**
            - **Pure functions**: functions **without side effects**. 
                - does not modify/mutate/manipulate any external variables, only locals
                - does not depend on any external variables outside its scope, only locals
                - all data dependancies (ie. initial data) should be passed as param, in order not to modify data outside its scope
                - mostly **returns a new data**/instance/object
                - **given same input, always returns same output**  
            - **Immutability**: original data (state) is **never** modified. 
                - Instead, the data is **copied** and **the copy is mutated and returned**. 
                - makes it easier to track the flow/state of the data throughout the application...make code **less buggie**
            - **Immutable object**
                - `Object.freeze()` to freeze object making its immutable 
                - ie, prevents adding new properties...but property values can be modified
        - Functional programming
            - uses **more of Pure functions**
            - uses **less Impure funtions**
                - **not only** modifying original data but also creating console logs
                - impure functions are kept at the end of the chain for outputs

    - **Functional** programming and **declarative Syntax** techniques
        - Try avoid data mutations
        - use built-in methods that doesn't produce side effects
        - use data transformation methods like .map(), .filter() and .reduce()
        - use array and object destructuring
        - use the spread operator
        - use ternary operator
        - use template literals

## Forkify App - Applying modern development
- Project Overview and Planning
    - Overview
        - The application basically allows users to search for recipes and display them on the UI.
        - Users can post and update recipes.
    - Planning (User Stories -> Features -> Flowcharts -> Architecture)
        1. User Stories
            1. As a user, I want to *search for recipes*, so that I can find new ideas for meals
            2. As a user, I want to be able to *update the number of servings* so that I can cook meal for different number of people
            3. As a user, I want to *bookmark recipes*, so that I can review them later
            4. As a user, I want to be able to *create my own recipes*, so that I have them all organized in the same app
            5. As a user, I want to be able to *see my bookmarks and own recipes when I leave the app and come back later*, so that I can close the app safely after cooking
        2. Features (for user stories)
            - For Story 1;
                - Search functionality: input field to send request to API with searched keywords
                - Display results with pagination
                - Display recipe with cooking time, servings and ingredients
            - For Story 2;
                - Change servings functionality: update all ingredients according to current number of servings
            - For Story 3;
                - Bookmarking functionality: display list of all bookmarked recipes
            - For Story 4;
                - User can upload own recipes
                - User recipes will automatically be bookmarked
                - User can only see their own recipes, not recipes from other users
            - For Story 5;
                - Store bookmark data in the browser using local storage
                - On page load, read saved bookmaks from local storage and display
        3. Flowchart
            - The **start (pill-shape) of the chart is always an event**
            - [Flowchart Part 1](./11-ForkifyApp_Building-a-Modern-Application/forkify-flowchart-part-1.png)
            - [Flowchart Part 2](./11-ForkifyApp_Building-a-Modern-Application/forkify-flowchart-part-2.png)
        4. Architecture
- [API Documentation:](https://forkify-api.herokuapp.com/v2)

- Architecture (deep-dive)
    - What 
        - structure on how software is will be built. 
    - Why
        - Gives structure. **Organizes code** into different modules, classes, and functions, holding the software together
        - Code maintainability. Easy for **future changes**. Project is never done!
        - Expandability. Ability to **add new features**
    - Selection: MVC architecture
    - Components of any architecture
        - Business logic
            - The actual business problem
            - What business does and need
            - Very high-level. In no specific prog lang
            - Business requirement
            - Mostly about the service layer
        - State
            - stores the data about the application
            - known as the "single source of truth"
            - kept in sync with UI and vice-versa
            - state libraries exist. Redux, etc.
        - HTTP library
            - making and receiving requests over the internet
        - Application logic (router)
            - implementation of the business logic and the app itself
            - handles UI navigation and UI events
            - the entire app itself composing of the core business logic
        - Presentation logic (UI layer)
            - code concerned about the visible part of the application
            - essentially displayes the application state
            - interation about the user
    - MVC
        - Model: Business Logic, State, HTTP Library
        - Controller: Application Logic
        - View: Presentation Logic
    - 4. Architecture
        - [Project architecture: Recipe Loading](./11-ForkifyApp_Building-a-Modern-Application/forkify-architecture-recipe-loading.png)
    - Files structure
        - helpers | config => models/services | config => controllers | config => views  
- Misc impl
    - Parcel
        - Page is served with Parcel 
        - Parcel need a way to access static files like images, therefore need to import images from images folder to js file
    - For images in dynamic html markup in js, need to import images the html with Parcel
    - Config file
        - stores important data about the app which are constant
    - Error handling
        - error messages should be intrinsic property of the view layer
    - Pagination
        - logic behind
        - data **attribute** on `<btn>` element to store data
        - **data attribute** eg. `data-someData=3` help to pass data from ui to handler
            - turns to `dataset.somedata` in non-template mode
    - Generating updating algorithm
        - **only redering dom elements whose text values changed**
    - Bookmarking
    - **API request timeout**
    - Realizations
        - Parent class can access members of child class
        - Purple numbers in console are Numbers, while White are String type
        - **The `this` keyword in event handler points to the caller by default. To change the reference point to the current object, outsource the handler block to a function and use the `.bind(this)` on the function**
    - Js docs
    - Deploy: 
        - forkify deployed manaually with `dist\`...could have been moved to a new git repo but want everything to be in one repo 


## NB
- Enable strict mode in JS to write secure code
- Emojis are 2-character long not 1-character
- array[i] means the value
- object[i] means property or value
- **Documented code on dev branch**

### Resources
- Leaflet
- Lodash
- Parcel

<sub>Inspired by &copy; Jonas</sub>
