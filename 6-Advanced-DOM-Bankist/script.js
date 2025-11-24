'use strict';

// Element selections
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');


///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  return btn.addEventListener('click', openModal)
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////
// Smooth Button scrolling
btnScrollTo.addEventListener('click', function(e) {
  console.log("scroooollinggggggg !!");
  section1.scrollIntoView({behavior: 'smooth'})
})


//////////////////////////////////////////////
// Page navigation

// using the regular
// document.querySelectorAll('.nav__link').forEach(function (el) { // select all link and add event to each link element
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); // prevent default nav behaviour
//     const id = this.getAttribute('href'); // gets the #section--1/2/3 
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });  // .querySelector(#section--1/2/3).then scroll to that section
//   }); // downside: if there are 100 nav elements, 100 eventshandlers will be added to it, also won't work on dynamic elements, elements created at runtime........therefore, use event delegator....put one handler only on the parent element to handle events from children elements
// });

// using event delegation
// 1. Add event listener to common parent element
// 2. Determine what element triggers the event

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  if(e.target.classList.contains('nav__link')){ // checking if it's a child element
    const id = e.target.getAttribute('href'); // get href value from child target
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});  // scroll to that section on the document
  }
})


///////////////////////////////////////
// Tabbed component
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // makes sure to get the operations button only event when event is triggered on sub children elements 

  // Guard clause
  if (!clicked) return; // best practice than putting bellow in if(clicked) block...ends the method when click element is null...ie. outside the operations__tab area
  // if (clicked == null) return; // or this

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)  // .operations__content--1/2/3...retrieved from `data-tab="1"`
    .classList.add('operations__content--active');  // activate the clicked tab
});


///////////////////////////////////////
// Menu fade animation
const handleHover = function (e, opacity) { // passing arg to event handler
  console.log('mouse over');

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', e => {
  handleHover(e, 0.5) // accessing handler with paramenter
  console.log('mouse over');
});
nav.addEventListener('mouseout', e => {
  handleHover(e, 1)
  console.log('mouse out');
});


//////////////////////////////////////////////
//////////// Lecture testing /////////////////
//////////////////////////////////////////////

///////////////////////////////////////
/*

// Selecting, Creating, and Deleting Elements

// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header'); // most used and preferred...returns NodeList type
const allSections = document.querySelectorAll('.section'); // and this...returns NodeList type
console.log(allSections);

document.getElementById('section--1'); // returns NodeList type type
const allButtons = document.getElementsByTagName('button'); // returns HTMLCollectionsElement type
console.log(allButtons);

console.log(document.getElementsByClassName('btn')); // returns HTMLCollectionsElement type


// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message); // prepend the child nodes
header.append(message);
header.append(message.cloneNode(true));  // since message element is a live element, can only exist at one place, it needs to be clone in order to be visible in multiple places

header.before(message);  // places element as sibling
header.after(message);


// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message);  // old way of removing element
  });

///////////////////////////////////////
// Styles, Attributes and Classes
  
// Styles
message.style.backgroundColor = '#37383d';  // this approach only gets and sets inline styles...backgroundColor needs to be in camelCase
message.style.width = '120%';

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color); // gets and set external sheet styles 
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';  // parseFloat() on only takes the float side of the string..eg '12.4px' to 12.4

document.documentElement.style.setProperty('--color-primary', 'orangered'); // gets and sets css variables / custom properties at root

/////// Attributes
/// Getting and setting standard attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);  // access properties on an image element...same as .src
console.log(logo.className); // for some reasons, not '.class' but '.className'

logo.alt = 'Beautiful minimalist logo';

/// Getting and setting customized, non-standard attributes
console.log(logo.designer); // doesn't work since not a standard attribute on image element
console.log(logo.getAttribute('designer')); // another way of getting attributes from elements...works when set manually in html file
logo.setAttribute('company', 'Bankist'); // can set non-standard attribute

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // gets absolute path
console.log(link.getAttribute('href')); // gets relative path unless absolute from html source already

/// Data attributes - properties that starts with 'data-' keyword prefix ****
console.log(logo.dataset.versionNumber); // data attributes are stored in dataset property...with camelCase


/////// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

/////////////////////////////////////
// Types of Events and Event Handlers. ****
const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};
h1.addEventListener('mouseenter', alertH1); // outsourcing the method listener
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);  // removing event after 3 secs

h1.onmouseenter = function (e) {   // old way of listening to event...doesn't support multiple events
  alert('onmouseenter: Great! You are reading the heading :D');
};


///////////////////////////////////////
// Event Propagation in Practice ***

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget); // .target is where the event originated ***. Where the click event happened, not the element that the event handler was attached...in this case: the .nav__link
  console.log(e.currentTarget === this);  // current target / this...is the element that the event handler was attached...this case: .nav__link
  
  // e.stopPropagation(); // Stop propagation...preventing it handled by the parent element too
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);  // target: .nav__link, currentTarget: .nav__links...nav__links is a parent element...handling event occuring at child
});

document.querySelector('.nav').addEventListener('click', function (e) { 
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
},
// false...Bubbling face, false, by default. Capturing set to true. 
);

// Bubbling phase is the default. Event travels from the target to the root..thus the child will print first on top of the event stack, before the parent handlers


/////////////////////////////////////
// DOM Traversing. **
const h1 = document.querySelector('h1');

// Going downwards: children
console.log(h1.querySelectorAll('.highlight')); // select deep-level children of h1
console.log(h1.childNodes);
console.log(h1.children); // direct children
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

Going upwards: parents
h1.closest('.header').style.background = 'var(--gradient-secondary)'; // .closest()...targets grandparent/top-level parents...opposite of querySelector (as this target inner child)
h1.closest('h1').style.background = 'var(--gradient-primary)';
console.log(h1.parentElement);  // dirent parents element
console.log(h1.parentNode); // direct parents

// Going sideways: siblings
console.log(h1.previousElementSibling); // elements...preffered to use element instead of the node
console.log(h1.nextElementSibling);
console.log(h1.previousSibling); // nodes
console.log(h1.nextSibling);
console.log(h1.parentElement.children); // getting all sibblings including itself...go top to the parent and the find the children below

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});


/////////////////////////////////////
Lifecycle DOM Events
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

window.addEventListener('beforeunload', function (e) {
  console.log('TRIGER');
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});

*/
