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
    this.generateAndAppendEvents(events);
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
    return new Promise((resolve) => {
      const eventlist = events.map(
        ({ startTime, endTime, name }) =>
          new DateEvent(startTime, endTime, name)
      );

      const eventContainer = this.layoutRef.querySelector(".day--events");

      eventlist.forEach((event) =>
        eventContainer.appendChild(event.getLayout())
      );

      resolve(eventlist);
    });
  };

  checkIfToday = () => {
    if (new Date(this.timestamp).toDateString() === new Date().toDateString()) {
      this.layoutRef.classList.add("today");
      this.addDayLine();
    } else {
      this.layoutRef.classList.remove("today");
      this.removeDayLine();
    }
  };

  getLayout = () => {
    return this.layoutRef;
  };

  removeDayLine = () => {
    const dayLine = this.layoutRef.querySelector(".current--line");
    dayLine.classList.add("hidden");
  };

  addDayLine = () => {
    const dayLine = this.layoutRef.querySelector(".current--line");
    dayLine.classList.remove("hidden");
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const percentDayElapsed =
      (new Date(this.timestamp) - d) / (1000 * 60 * 60 * 24);
    const yOffset =
      percentDayElapsed *
      document.querySelector(".calendar--grid").getBoundingClientRect().height;
    dayLine.style.transform = `translateY(${yOffset}px)`;
  };

  initLayout = () => {
    const clone = this.template.content.cloneNode(true);
    this.layoutRef = clone.querySelector(".day");

    this.updateTimeStamp(this.timestamp);
    this.generateAndAppendEvents(this.events).then((events) =>
      events.forEach((e) => e.setEventHeightandTransform())
    );

    this.checkIfToday();
  };
}
