'use strict';

///////////////////////////////////////
// Constructor Functions and the new Operator

const Person = function (firstName, birthYear) {
    // Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Never to this in side constructor function!
    // this.calcAge = function () {
    //   console.log(2037 - this.birthYear);
    // };
  };
  
  const jonas = new Person('Jonas', 1991);
//   console.log(jonas);
//   // 1. New {} is created
//   // 2. function is called, this = {}
//   // 3. {} linked to prototype
//   // 4. function automatically return {}
  const matilda = new Person('Matilda', 2017);
  const jack = new Person('Jack', 1975);
//   console.log(jonas instanceof Person);
  Person.hey = function () {
    console.log('Hey there 👋');
    console.log(this);  // the class that calls the method
  };
  Person.hey();


////////////////////////////////////////////
///// Prototypes

console.log('Person Prototype', Person.prototype);

Person.prototype.calcAge = function() { // added new property to the class/prototype at runtime
    console.log(2022 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__)  // inherited properties/members from main class or prototype...use "__proto__" on instance and "prototype" on the Class prototype itself...linkes object instances to their class prototype's properties
console.log(Person.prototype.isPrototypeOf(jonas))   // true, since jonas is an instance of Person

Person.prototype.specieType = "Homo Sapien";    // add property at runtime
console.log(jonas.specieType);  // instance inherit it

console.log(jonas.hasOwnProperty('specieType'));    // false, since this property is added by the Class itself...and not part of the properties specified while creating the jonas instance
console.log(jonas.hasOwnProperty('firstName')) // true, cus firstName property was specified during construction

// __proto__ on object shows the properties added by the Class at runtime..makes it accessible by instance through inheritance


///////////////////////////////////////
/*
// Prototypal Inheritance on Built-In Objects

console.log(jonas.__proto__);

// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__); // from jonas object, to Person class, to Object
console.log(jonas.__proto__.__proto__.__proto__); // // from jonas object -> Person class -> to Object -> null

console.dir(Person.prototype.constructor);  // dir for inspection

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);  // object.parent = parent
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {  // adding custome function to built-in Array class
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(x => x + 1);
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.
DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h
GOOD LUCK 😀
*/

/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();
*/

///////////////////////////////////////
// ES6 Classes

// Class expression
// const PersonCl = class {}

// Class declaration
class PersonCl {    // PersonClass
    constructor(fullName, birthYear) {
      this.fullName = fullName;
      this.birthYear = birthYear;
    }

    // Instance methods - Methods will be added to .prototype property
    calcAge() {
      console.log(2037 - this.birthYear);
    }   // no commas between methods

    greet() {
      console.log(`Hey ${this.fullName}`);
    }

    get age() { // makes methods as properties
      return 2037 - this.birthYear;
    }

    // Setters and Getters
    // setting property that already exists
    set fullName(name) {    // setters are good for data validation before object creation
        if(name.includes(' ')) {
            this._fullName = name;  // while property already exist, add '_'
        } else {
            alert(`${name} is not a full name!`)
        }
    }

    get fullName() {    // help support object.fullName property
        return this._fullName;
    }

    static hey(){
        console.log('Hey there!!');
    }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);

// const jessica2 = new PersonCl('Jessica', 1996); // doesn't allow both fullName and _fullName properties to be set due to the data validation
// console.log(jessica2);  // fullName = undefined

jessica.calcAge();
console.log(jessica.age);   // called as property not a method

console.log(jessica.__proto__ === PersonCl.prototype);

PersonCl.prototype.greet = function () {    // adding another function even after class creation
  console.log(`Hey ${this.firstName}`);
};

jessica.greet();

PersonCl.hey();
// jessica.hey() // won't work!!


///////////////////////////////////////
// Setters and Getters - on Object literals

const account = {
    owner: 'Jonas',
    movements: [200, 530, 120, 300],

    get latest() {
      return this.movements.slice(-1).pop();
    },

    set latest(mov) {
      this.movements.push(mov);
    },
};

console.log(account.latest);
account.latest = 50;
console.log(account.movements);


///////////////////////////////////////
// Object.create - uses object literal
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {  // init, prevent passing parameter to constructor 
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);  // creates an instance from the prototype class 
console.log(steven);

steven.name = 'Steven'; // property is different from prototype 
steven.birthYear = 2002;
steven.calcAge();
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();


///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.
DATA CAR 1: 'Ford' going at 120 km/h
GOOD LUCK 😀
*/


class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {  // diff property name
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);

ford.accelerate();
ford.accelerate();
ford.brake();

ford.speedUS = 50;
console.log(ford);


///////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions
/*
const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
};
const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);    // setting parent properties
    this.course = course;
};

// Linking prototype classes to create inheritance
Student.prototype = Object.create(Person.prototype);    // create empty person prototype on Person

Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge(); // posible because of prototypal inheritance

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;    // its constructor was set to Person...now needs to reset to itself
console.dir(Student.prototype.constructor);
*/

///////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes - better way from OOP background
/*
class StudentCl extends PersonCl {
    constructor(fullName, birthYear, course) {
      // Always needs to happen first!
      super(fullName, birthYear);
      this.course = course;
    }

    introduce() {
      console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }

    calcAge() {
      console.log(
        `I'm ${
          2037 - this.birthYear
        } years old, but as a student I feel more like ${
          2037 - this.birthYear + 10
        }`
      );
    }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();


/////////////////////////////////////
Inheritance Between "Classes": Object.create
const PersonProto = {
    calcAge() {
      console.log(2037 - this.birthYear);
    },
    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    },
  };
  const steven = Object.create(PersonProto);
  const StudentProto = Object.create(PersonProto);
  StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
  };
  StudentProto.introduce = function () {
    // FIX:
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  };
  const jay = Object.create(StudentProto);
  jay.init('Jay', 2010, 'Computer Science');
  jay.introduce();
  jay.calcAge();
*/


///////////////////////////////////////
// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods
// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)
class Account {
    // 1) Public fields (instances)
    locale = navigator.language;

    // 2) Private fields (instances)
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
      this.owner = owner;
      this.currency = currency;
      this.#pin = pin;
      console.log(`Thanks for opening an account, ${owner}`);
    }

    // 3) Public methods
    // Public interface
    getMovements() {
      return this.#movements;   
    }

    deposit(val) {
      this.#movements.push(val);
      return this;  // setting property thus good to return the 'this' object for chaining
    }

    withdraw(val) {
      this.deposit(-val);
      return this;  // for chaining
    }

    requestLoan(val) {
      if (this.#approveLoan(val)) {
        this.deposit(val);
        console.log(`Loan approved`);
        return this;    
      }
    }

    static helper() {
      console.log('Helper');
    }

    // 4) Private methods
    #approveLoan(val) {
      return true;
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// should not be accessed directly due to data privacy...encapsulation
// acc1._movements.push(250);
// acc1._movements.push(-140);
// acc1.approveLoan(1000);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);

// console.log(acc1.getMovements());
// console.log(acc1);
Account.helper();

// not accessible
// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100));

// Chaining
// acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
// console.log(acc1.getMovements());
