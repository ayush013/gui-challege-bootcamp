// DAY BLUEPRINT/CLASS
// > events, timestamp
// setter method for events, timestamp
// setter will have a proxy for layouts
// takes care of today class

import DateEvent from "./DateEvent";

export default class DayCell {
  layoutRef;

  constructor(timestamp, events) {
    this.template = document.getElementById("day");
    this.timestamp = timestamp;
    this.events = events;

    this.initLayout();
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;

    this.updateTimeStamp(timestamp);
  }

  updateTimeStamp = (timestamp) => {
    this.layoutRef.querySelector(".day--title").textContent = new Date(
      timestamp
    ).toDateString();
    this.checkIfToday();
  };

  setEvents(events) {
    this.events = events;

    this.deleteEvents();
    this.generateAndAppendEvents();
  }

  deleteEvents = () => {
    const events = Array.from(
      this.layoutRef.querySelector(".day--events").children
    );
    while (events.length) {
      const event = events.pop();
      event.remove();
    }
  };

  generateAndAppendEvents = (events) => {
    const eventlist = events.map(
      ({ startTime, endTime, name }) => new DateEvent(startTime, endTime, name)
    );

    const eventContainer = this.layoutRef.querySelector(".day--events");

    eventlist.forEach((event) => eventContainer.appendChild(event.getLayout()));
  };

  checkIfToday = () => {
    if (new Date(this.timestamp).toDateString() === new Date().toDateString()) {
      this.layoutRef.classList.add("today");
    } else {
      this.layoutRef.classList.remove("today");
    }
  };

  getLayout = () => {
    return this.layoutRef;
  };

  initLayout = () => {
    const clone = this.template.content.cloneNode(true);
    this.layoutRef = clone.querySelector(".day");

    this.updateTimeStamp(this.timestamp);
    this.generateAndAppendEvents(this.events);

    this.checkIfToday();
  };
}
