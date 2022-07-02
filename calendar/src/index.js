import "./style.css";

class Calendar {
  constructor() {}
}

new Calendar();

// template for weekday cell -> day class
// week container as section (Calendar)
// event class -> event cell
// main class for wiring all together
// api util with static helper

// DAY BLUEPRINT/CLASS
// > events, timestamp
// setter method for events, timestamp
// setter will have a proxy for layouts
// takes care of today class

// API UTIL CLASS -> Singleton/static utils
// static api call method
// static BASE URL

// EVENT CLASS
// startTime, endTime, name
// binds to event template

// CALENDAR CLASS
// driver for entire application
// initializeApp -> draws reference to body elements, appends week layout inside body,
// initializes fetching of event data, adds event listener to buttons
// set heading for week dates
// Fetch event callback -> day.setEvents
