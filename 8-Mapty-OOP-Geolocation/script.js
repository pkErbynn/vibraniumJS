'use strict';

//////// Classes

class Workout {
    id = this.#createGUID();
    date = new Date();
    numberOfclicks = 0;

    constructor(coords, distance, duration){
        this.coords = coords;   // in [lat,lng]
        this.distance = distance;   // in km
        this.duration = duration;   // in min
    }

    #createGUID() {
        function random() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return random() + random() + '-' + random() + '-' + random() + '-' +
          random() + '-' + random() + random() + random();
    }

    setDescription(){
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toLocaleUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getMonth()}`
    }

    click(){
        this.numberOfclicks++;
    }
}

class Cycling extends Workout {
    type = 'cycling'

    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        // this.type = 'cycling'
        this.#calculateSpeed();
        this.setDescription();  // called on children cus type is not available on parent class
    }

    #calculateSpeed() {
        this.speed = this.distance / (this.duration / 60);  // in km/h
        return this.speed;
    }
}

class Running extends Workout {
    type = 'running'

    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        // this.type = 'running'
        this.#calculatePace();
        this.setDescription();
    }

    #calculatePace(){
        this.pace = this.duration / this.distance;  // in min/km
        return this.pace;
    }
}

////////////////// DOM Selectors
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

////////////////// Application Architecture ///////////////
class App {
    #map;
    #mapEvent;
    #workouts = [];
    
    constructor(){
        this.#getPosition();    // get location from the onset

        this.#getLocalStorage();    // local storage

        // register events listeners in constructor
        form.addEventListener('submit', this.#addNewWorkout.bind(this));    // bind re-point 'this' from 'form' (#L85) to 'app' object
            // NB!:...simple means .#addNewWorkout() method will be called on the App instance NOT the 'form' caller instance
        inputType.addEventListener('change', this.#toggleElevationField);   // no bind cus handler doesn't use 'this' keyword in its block
        containerWorkouts.addEventListener('click', this.#moveMapToMarker.bind(this))  // event delegation to parent/common form element
    }

    #getPosition(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                this.#loadMap.bind(this),   // re-point/bind 'this' from 'geolocation' (L# 41, since it's the method caller...pointed at L#58) to 'app' instance (in L#103)
                (err) => {
                    alert('Could not get your location', err)
                }
            )
        }
    }

    #loadMap(position){
        const {latitude, longitude} = position.coords;
        const coordinates = [latitude, longitude];

        this.#map = L.map('map').setView(coordinates, 13);    // since library is loaded, the L class can be accessed in the browser console

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        
        this.#map.on('click', this.#showForm.bind(this));   // change 'this' from map object (since it's object calling the on() method) to app object using bind() 

        // load map markers
        this.#workouts.forEach(workout => this.#renderWorkoutMarker(workout))
    }

    #showForm(mapE){
        this.#mapEvent = mapE;    // forward map event data to onSubmit event
        form.classList.remove('hidden'); // make form available
        inputDistance.focus();  // focus on the distance form input
    }

    #toggleElevationField(){
        // when type is changed, on each input form, traverse to the row(with label + input) and toggle a hidden class on it
        // since the elevation-form is hidden at init state, it will toggle alternatively with the other
        // thus, show only one form row on change event
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');   
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    }
    
    #addNewWorkout(e){  // adding marker pin on map click
        e.preventDefault(); // stops form from refreshing **

        // 1.get data from form
        // 2.validate form inputs
        // 3.if workout is running, create running object
        // 4.if workout is cycling, create cycling object
        // 5.add new workout object to workout array list
        // 6.render new workout to map as marker

        // get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;  // '+' converts string to number
        const duration = +inputDuration.value;

        const {lat: clickedLongitude, lng: clickedLatitude} = this.#mapEvent.latlng;  // destructure
        const clickedCoordinate = [clickedLongitude, clickedLatitude]

        let workout;

        // helper validation functions
        const areValidNumberInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
        const areAllPositiveInputs = (...inputs) => inputs.every(inp => inp > 0);

        // if workout is running, create running object
        if(type == 'running') {
            const cadence = +inputCadence.value;
            // validate form inputs
            if(!areValidNumberInputs(distance, duration, cadence) || !areAllPositiveInputs(distance, duration, cadence)) // guard claus - finding the opposite of what you're interested...if(!intrested)
                return alert('Invalid input');
            
            // traditionally, could be
            // if(!Number.isFinite(distance) || !Number.isFinite(duration) || !Number.isFinite(cadence)) return alert('Invalid input');
            // and positive numbers check

            workout = new Running(clickedCoordinate, distance, duration, cadence);
        }

        // if workout is cycling, create cycling object
        if(type == 'cycling') { // cleaner to use Ifs instead of if-else 
            const elevationGain = +inputElevation.value;
            if(!areValidNumberInputs(distance, duration, elevationGain) || !areAllPositiveInputs(distance, duration, elevationGain)) // guard claus - finding the opposite of what you're interested...if(!intrested)
                return alert('Invalid input');
            
            workout = new Cycling(clickedCoordinate, distance, duration, elevationGain);
        }

        // add new workout object to workout array list
        this.#workouts.push(workout);

        // render new workout to map as marker
        this.#renderWorkoutMarker(workout);

        // render side workout on the side pane
        this.#renderSideWorkout(workout);

        // hide form + clear input fields
        this.#hideForm();

        // store workout in local storage
        this.#setLocalStorage();
    }

    #hideForm(){
        inputDistance.value = inputDuration.value = inputCadence.value = '';
        form.style.display = 'none';
        form.classList.add('hidden'); // make form hidden

        setTimeout(() => form.style.display = 'grid', 1000) // set back to grid after hidden
    }

    #renderWorkoutMarker(workout){
        L.marker(workout.coords).addTo(this.#map)   // 'this' will point to the form in L#35, thus use bind() to bind to the app object
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
            })
        )
        .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️': '🚴‍♀️'} ${workout.description}`)
        .openPopup();
    }

    #renderSideWorkout(workout){
        let html = `
            <li class="workout workout--${workout.type}" data-id=${workout.id}>
                <h2 class="workout__title">${workout.description}</h2>
                <div class="workout__details">
                    <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️': '🚴‍♀️'}</span>
                    <span class="workout__value">${workout.distance}</span>
                    <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${workout.duration}</span>
                    <span class="workout__unit">min</span>
                </div>
        `;

        if(workout.type === 'running'){
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace.toFixed(1)}</span>
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence}</span>
                    <span class="workout__unit">spm</span>
                </div>
            </li>
            `
        }

        if(workout.type === 'cycling'){
            html += `
                    <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed.toFixed(1)}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰</span>
                    <span class="workout__value">${workout.elevationGain}</span>
                    <span class="workout__unit">m</span>
                </div>
            </li>
            `
        }

        form.insertAdjacentHTML('afterend', html);
    }

    #moveMapToMarker(event) {
        const workoutElement = event.target.closest('.workout');    // the unique parent form of which its chiled elements may be clicked...subchild of common delegator element

        if(!workoutElement) return; // guard close...opposite of what's dev is interested
        
        const selectedWorkout = this.#workouts.find(workout => workout.id === workoutElement.dataset.id);   // cus of 'this' need bind() in handler

        this.#map.setView(selectedWorkout.coords, 13, {
            animate: true,
            pan: {
                duration: 1
            }
        });
        
        // selectedWorkout.click(); // using the public api
    }

    #setLocalStorage(){
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));   // serialize
    }

    #getLocalStorage(){
        const storedWorkouts = JSON.parse(localStorage.getItem('workouts'));  // deserialize
        if(!storedWorkouts) return;  // guard clause
        this.#workouts = storedWorkouts;    // object loses its prototype chain when restored

        // render each stored workouts
        this.#workouts.forEach(workout => {
            this.#renderSideWorkout(workout);
        });
    }

    reset(){
        localStorage.removeItem('workouts');
        location.reload();  // reload programmatically
    }
}

const app = new App();
