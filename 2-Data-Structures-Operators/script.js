'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderPizza: function(mainMenu, ...others){
    console.log(mainMenu);
    console.log(others);
  }
};


// ============================================

//////////// distructuring
const e = () => [1,2]

// swapping variables
let [x, y] = e();
console.log(x,y);

[y, x] = [x, y]
console.log(x,y);

// skiping
let z;
[x, ,z] = [1,2,3] // 1, 3

// default values
const [p, q, r] = [1,  2];
console.log(p, q, r);

// destructing object 
// ...provide variable names (in {}) that exactly matched the property names to be retrieved from the object
// ...renaming => propertyName : customName
const {name: newname, openingHours: oh, categories: cat} = restaurant;
console.log(newname, oh, cat);

// ...default values => incase such property (starter) is not present on the object
const {starter = [], mainMenu = []} = restaurant;
console.log(starter, mainMenu);

// mutating variables
let jk = 2;
let ke = 4;
const obj = {jk: 100, ke: 200};
({jk, ke} = obj)  // nb: the '()' wrap helps modify
console.log(jk, ke);

// nested object
const {name, openingHours, categories} = restaurant;
const {fri: {open, close}} = openingHours;  //nb: only the object properties/keys is provided even when nested
console.log(open, close);

// destructuring object passed as method parameters
function orderDelivery({starterIndex, mainIndex, address, time}) {
  console.log("Order recieved!");
  console.log(`${restaurant.starterMenu[starterIndex]} and ${restaurant.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
}
orderDelivery({ time: '1pm', address: 'jacob yeboah appartment, taifa', starterIndex: 1, mainIndex: 2})

// ...with default values...helps if the object comming may not have certain property
function orderDelivery2({starterIndex: si = 1, mainIndex: mi = 1, address = '', time = ''}) {
  console.log("Order recieved!");
  console.log(`${restaurant.starterMenu[si]} and ${restaurant.mainMenu[mi]} will be delivered to ${address} at ${time}`);
}

// nb: params order is not important since it's an obj 



/////////// spread operator
//...used to unpack elements in an array
//...used to build an array / passing values as params to a function
//...spread because used on the right hand of the '=' operator 
let a = [1,2,3]
const b = [4,5, a[0], a[1], a[2]]
console.log(b);
const c = [4,5, ...a]
console.log(c); 
console.log(...c); // 4 5 1 2 3.... not wraped in array, therefore need to be put in an arr
console.log(2,2); // similar like loging
// nb: takes array element

// join arrs
a = [...a, ...c]
console.log('joined', a);

// as method params
const s = (f, m, w) => (f + m + w);
console.log(`sum: ${s(...a)}`);

// spread operator on objects
// ...unpacks each key-value element from an object
// ...thus need to be packed in {} literal again
const newRestuarant = {   // new object with additional property
    ...restaurant, // shallow copy kvp elements
    founder: 'Daniel Afeawo'
}
console.log("newRestaurant: ", newRestuarant);

// or
const newRestua2 = { ...restaurant } // shallow copy kvp elements
newRestua2.location = "taifa";
console.log("newRes2: ", newRestua2);




/////////// reset
//...opposit of spread
//...packs elements into array
//...reset because used on left side of '='
//...placed as the last variable to collect the REST of the elements

// use case 1: destructuring
// on arrays
const [j, k, ...others] = [1, 2, 3, 4, 5, 6 ]   // used on the 
console.log(j, k, others);  // output: 1 2 [ 3, 4, 5, 6 ]

// object
const {sat, ...weekdays} = restaurant.openingHours; // collect the rest of the days as weekdays
console.log(weekdays); // construct element

// use case 2: functions
// function: rest params...limitless param inputs
const add = (...numbers) => {
  let sum = 0;
  for(let i = 0; i < numbers.length; i++){
    sum = sum + numbers[i];
  }
  console.log('...##sum: ', sum);
}
add(2, 3, 5)  // this spread elements will be packed (be the rest of the elements)

x = [2,4,6,8]
add(...x) //spread and packed within the function


 
///////////// short-circuiting

// OR returns any datatype, and does short-circuiting
// ...the OR operator short-circuit (returns the first truthy it encounters) when the first operator is true
// ...used to SET DEFAULT VALUES
console.log('---- OR ----');
const numOfGuests = restaurant.numOfGuests ? restaurant.numOfGuests : 10; // traditional: setting default value w/ ternary
console.log('NumOfGuests: ', numOfGuests);

const numOfGuests2 = restaurant.numOfGuests || 10;  // using short-circuiting
console.log('NumOfGuests2: ', numOfGuests2);
// doesn't work when guest is 0

// AND used to check if a property/value exit before calling
console.log('---- AND ----');
if(restaurant.orderPizza) {   // traditional
  restaurant.orderPizza("beef", "chicken");
}
restaurant.orderPizza && restaurant.orderPizza('saussage', 'mushroom') // using AND short-circuiting

//nb: 
// The OR operand will return the FIRST value if truthy or the last value if all the elements are falsy
// Practical application is to set default values
// The AND operand will return the FIRST value if falsy or the LAST if all precedings are truthy
// Practical application is to execute code in second operand if the first is true. Eg; check if a property/value exit before executing
// Also, AND operator is used if there's no else part



///////// setting default value when nullish
// using ternary
restaurant.guestNum = 0; // what if 0 guests
const guestNum = restaurant.guestNum ? restaurant.guestNum : 10 // treats 0 and '' as falsy meanwhile 0 is valid input
console.log('guestNum', guestNum); // still 10 instead of 0

// fixing using Nullish coalescing...nullish values (null, undefined)
restaurant.guestNum = 0; // what if 0 guests
const guestNumCorrect = restaurant.guestNum ?? 10
console.log('guestNumCorrect', guestNumCorrect);



///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:
1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.
TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
GOOD LUCK 😀
*/

const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
      [
        'Neuer',
        'Pavard',
        'Martinez',
        'Alaba',
        'Davies',
        'Kimmich',
        'Goretzka',
        'Coman',
        'Muller',
        'Gnarby',
        'Lewandowski',
      ],
      [
        'Burki',
        'Schulz',
        'Hummels',
        'Akanji',
        'Hakimi',
        'Weigl',
        'Witsel',
        'Hazard',
        'Brandt',
        'Sancho',
        'Gotze',
      ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
      team1: 1.33,
      x: 3.25,
      team2: 6.5,
    },
  };

// 1. 
// const [players1, players2] = [game.players[0], game.players[1]];
const [players1, players2] = game.players; // nb: not [game.players]...cus LHS = RHS structure 
console.log(players1, players2);

// 2.
const [gk, ...fieldPlayers] = [...players1]
console.log('gk:', gk);
console.log('fieldPlayers:', fieldPlayers);

// 3.
const allPlayers = [...players1, ...players2];
console.log('allPlayers:', allPlayers);

// 4. 
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']
console.log('players1Final:', players1Final);

// 5.
// const {odds: {team1, draw, team2}} = game; // don't forget default values ******
// const {odds: {team1: team1 = 0, x: draw = 0, team2: team2 = 0}} = game;
const {team1: team1 = 0, x: draw = 0, team2: team2 = 0} = game.odds;    //LH object should match RH object
console.log('odds:', team1, draw, team2);

// 6.
const printGoals = function(...playerNames){
    playerNames.forEach(element => {
        console.log(element);
    });
    console.log(`${playerNames.length} goals were scored`);
}
printGoals(...game.scored);

// 7. 
// const winner = team1 < team2 ? {team1: team1} : {team2: team2};
// console.log('winner', winner);
team1 < team2 && console.log('team1 more likely to win');   //nb: no else part considered


///////////////////////////////////////
///////// For-of loop
// regular way
for (const player of players1.entries()  ) {
  // const [i, n] = player;
  console.log(`....${player[0] + 1}: ${player[1]}`);
}

// destructuring from the source spot
for (const [i, el] of players1.entries() ) {  
  console.log({index: i+1, player: el} );
  // console.log(`${i + 1}: ${el}`);
}


 
//////////////// Enhanced Object literal
// old syntax
let restaurant2 = {
  name: 'hatchland',
  ingredients: ['ginger', 'pepper'],
  menu: ['pizza', 'ice-cream', 'burgar'],
  openingHours: openingHours,   // kvp
  order: function(orderIndex = 0){  // function expression
    return `You ordered ${this.menu[orderIndex]}`
  }
}
console.log(restaurant2);
console.log(restaurant2.order());

// ehanced obj literal
restaurant2 = {
  name: 'hatchland',
  ingredients: ['ginger', 'pepper'],
  menu: ['pizza', 'ice-cream', 'burgar'],
  openingHours, // encapsulated kvp
  order(orderIndex = 0){  // just the function expression
    return `You ordered ${this?.menu[orderIndex]}`
  }
}
console.log(restaurant2);
console.log(restaurant2.order(1));



///////// Optional chaining
// on properties

// checking if the property chain exit
if(restaurant2.openingHours && 
  restaurant2.openingHours.fri && 
  restaurant2.openingHours.fri.open) {  
    console.log(restaurant2.openingHours?.fri?.open);
  }

// with optional chaining **********
console.log(restaurant2.openingHours?.fri?.open);
   
// optional chain with nullish (ie. null and undefined) colescing for default value *****
let availability = restaurant2.openingHours?.fri?.open ?? 'closed';
console.log('status', availability);

// on methods..checking if a method exist
let order = restaurant2?.order?.(2) ?? 'Method does not exist';
console.log('order', order);

// on Arrays
// const users = [{name: 'erb', email: 'erb@gmail.com'}]
const users = []

// traditional
if (users.length > 0) {
  console.log(users[0].name);
} else {
  console.log('empty array');
}

// using Optional chain + null colescing
console.log(users[0]?.name ?? 'empty user array');



// ///////// Looping Object - keys, values, entries
for(const day of Object.keys(openingHours)) {
  console.log(day);
}
for(const openClose of Object.values(openingHours)) {
  console.log(openClose);
}

for(const [key, value] of Object.entries(openingHours)) { // each entry/element(kv) is converted to [k, v] thus can be destructured 
  console.log(`On ${key} we open at ${value.open} and close at ${value.close}`);
}

// ///////////////////////////////////////
// // Coding Challenge #2
// /* 
// Let's continue with our football betting app!
// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉
// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }
// GOOD LUCK 😀
// */

// // 1. Could traditionally used the normal for-loop with i++
for(const [index, player] of game.scored.entries()){
  console.log(`"Goal ${index + 1}: ${player}"`);
}

// // 2.
let sum = 0.0;
for(const [k, v] of Object.entries(game.odds)){
  sum = sum + v;
  console.log(k, v);
}
const avg = (sum / Object.entries(game.odds).length)
console.log(`Average: ${avg}`);

// 3. 
for(const [k, v] of Object.entries(game.odds)){
  const result = k === 'x' ? `draw: ${v}` : `victory ${game[k]}: ${v}`;
  console.log(`Odds of ${result}`);
}

console.log(restaurant?.xx && 'show');

// nb: 
// Object.entries(map or object)...for maps
// Array.entries()...for arrays


// // 4.
const scorers = {};
let scored = ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels']
for (const player of scored){
  // if(!scorers[player]) {
  //   scorers[player] = 1
  // } else {
  //   scorers[player] = scorers[player] + 1
  // }
  !scorers[player] ? scorers[player] = 1 : scorers[player] = scorers[player] + 1;
  // scorers[player] ? scorers[player] = scorers[player] + 1 : scorers[player] = 1;
}
console.log(scorers);



// /////////// Set
const uniqueScoredPlayers = new Set(game.scored)  // takes an array
const uniqueScoredPlayersNumber = uniqueScoredPlayers.size  // items size
const uniqueScoredPlayersArr = [...uniqueScoredPlayers] // convert unique element to array 
// console.log("uniqueScoredPlayersArr:", uniqueScoredPlayersArr);
// console.log("uniqueScoredPlayersNumber:", uniqueScoredPlayersNumber);
// can add, delete, check element
// nb: element in Set at not retrievable cus has no index and their order does not matter


/////////// Map - an iterable just like array
// keys/values can be of any type
const m1 = new Map();
m1.set('food', 'fufu')
m1.set('category', ['vege', 'nonvege'])
console.log(m1);

// chaining
const m2 = new Map();
m2.set('food', 'fufu')
    .set('category', ['vege', 'nonvege'])
    .set(true, 'we are open')
    .set({'a': 1, 'b': 2}, 'object value')
console.log(m2);

///// from scratch
// invalid - more than 2 items in each inner array
let fruits = new Map([
  ["apples" ,"bananas","oranges", "rer"],
  ["apples2" ,"bananas2","oranges2", "res2"]
]);
console.log(fruits);  // {'apples' => 'bananas', 'apples2' => 'bananas2'}

// invalid - same arrays
fruits = new Map([
  ["apples" ,"bananas","oranges", "ree"],
  ["apples" ,"bananas","oranges", "ree"]
]);
console.log(fruits);

// invalid - wrong entry format + 2+ array items
// fruits = new Map(
//   ["apples" ,"bananas","oranges"]
// );
// console.log(fruits);

// invalid - wrong entry format + right array items (2 items)
// fruits = new Map(
//   ["apples", 500],
//   ["bananas", 300],
//   ["oranges", 200]
// );
// console.log(fruits);

// valid - object.entries() format...ie, array of arrays..2 elements in array
fruits = new Map([
  ["apples", 500],
  ["bananas", 300],
  ["oranges", 200]
]);
console.log(fruits);

//// convert object to map
// to loop to get keys/values from plain object, Obj.entries() is used
// the result of that is an array-of-arrays and that's the input for map init too
let result = Object.entries(openingHours);
let hoursMap = new Map(result);
console.log('hoursMap', hoursMap);


// quiz app
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C#'],
  [2, 'Python'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct, yayyee!!'],
  [false, 'Try again!'],
])
// print question
console.log(question.get('question'));
// print options
for(const [key, value] of question){
  if(typeof key === 'number'){
    console.log(`${key}. ${value}`);
  }
}
// input
const userAnswer = 3;
// print answer
const response = question.get('correct') === userAnswer
console.log(question.get(response));

// //// convert maps to array
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);




///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).
1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL
GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1.
const events =  new Set(gameEvents.values());
console.log('events:',[...events]);

// 2.
gameEvents.delete(64)

// 3. 
console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes`);

// custom: average for each event
const sumOfEvent = {};
const countOfEvent = {};
const averageOfEvent = {};

// create sum and count obj
for (const [time, event] of gameEvents.entries()){
  if(!sumOfEvent[event]) {
    sumOfEvent[event] = time
    countOfEvent[event] = 1
  }
  else {
    sumOfEvent[event] = sumOfEvent[event] + time
    countOfEvent[event] = countOfEvent[event] + 1
  }
}
console.log(sumOfEvent);
console.log(countOfEvent);

const sumArr = [...Object.values(sumOfEvent)]
const countArr = [...Object.values(countOfEvent)]
const fbEvents = [...Object.keys(sumOfEvent)]

// average for each event using index
for(let i = 0; i < sumArr.length; i++){
  averageOfEvent[fbEvents[i]] = sumArr[i] / countArr[i]
}
console.log('average time for each event', averageOfEvent);

// 4.
for (const [time, event] of gameEvents){
  const fistOrSecondHalf = (time <= 45) ? '[First Half]' : '[Second Half]'; 
  console.log(`${fistOrSecondHalf} ${time} : ${event}`);
}


////////////// Strings

// indexOf and slice
const airline = "TAB Air Ghana";

console.log(airline.slice(0,airline.lastIndexOf(' '))); 
console.log('last word:', airline.slice(airline.lastIndexOf(' ') + 1)); 

// capitalize first letter of names
let capitalizeName = function (name) {
  const names = name.split(' ');
  const upperName = [];

  for(const n of names){
    // const sentenceCapitalize = n[0].toUpperCase() + n.slice(1).toLowerCase();
    const sentenceCapitalize = (n.toLowerCase()).replace(n[0], n[0].toUpperCase());
    upperName.push(sentenceCapitalize);
  }

  const result = upperName.join(' ');
  return result;
}

console.log(capitalizeName('john papA kwEsi erbynn'));
console.log(capitalizeName('graCe erbynn')); 
console.log(capitalizeName('jerry deladem howusu'));

// Padding
console.log('Erb'.padEnd(20, '++++'));

const maskCreditCard = function (number){
  const strNumber = number + '';  // convert to string, since one operand is string it converts all to string
  console.log(strNumber);
  const lastFour = strNumber.slice(-4);
  const masked = lastFour.padStart(strNumber.length, '*');
  return masked;
}
console.log(maskCreditCard(1234333444323));

// Repeat
console.log('erb'.repeat(3));


///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

// calculate_AGE
document.querySelector('button').addEventListener('click', function () {
  document.querySelector('textarea').value = `underscore_case
  first_name
 Some_Variable 
   calculate_AGE
 delayed_departure`;
  const text = document.querySelector('textarea').value; // gets value set
  const rows = text.toLowerCase().split('\n');  // separate by new line

  for(const [index, row] of rows.entries()){  // .entries gets you the index and value same time
    let [first, last] = row.trim().split('_');
    [first, last] = [first, last.replace(last[0], last[0].toUpperCase())];
    const camelCase = [first, last].join('')
    const camelCasePad = camelCase.padEnd(20, ' ')  // same lenght
    const camelCasePadCheck = camelCasePad + '✅'.repeat(index + 1); // '+ 1' since check count from 0 not 1
    console.log(camelCasePadCheck);
  }
})

