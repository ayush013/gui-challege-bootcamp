import "./style.css";
import DateEvent from "./app/DateEvent";
import APIUtil from "./app/ApiUtil";
import DayCell from "./app/DayCell";

class Calendar {
  static dayMilliseconds = 1000 * 60 * 60 * 24;

  constructor() {
    this.offset = 0;

    this.initializeApp();
    this.addActionListeners();
  }

  initializeApp = () => {
    const timestamps = this.generateTimeStamps(this.offset);
    this.generateAndAppendLayout(timestamps);
  };

  generateTimeStamps = (offset) => {
    const currentDate = new Date();

    currentDate.setTime(
      new Date().getTime() + offset * 7 * Calendar.dayMilliseconds
    );

    const currentDay = currentDate.getDay();

    let prevDays = currentDay;
    let nextDays = 6 - currentDay;

    const cellTimestamps = [];

    while (prevDays) {
      cellTimestamps.push(
        currentDate.getTime() - prevDays * Calendar.dayMilliseconds
      );
      prevDays--;
    }

    cellTimestamps.push(currentDate.getTime());

    let i = 1;

    while (i <= nextDays) {
      cellTimestamps.push(currentDate.getTime() + i * Calendar.dayMilliseconds);
      i++;
    }

    return cellTimestamps;
  };

  generateRandomEvents = (timestamp) => {
    const randomStart1 = timestamp - Math.random() * Calendar.dayMilliseconds;
    const randomStart2 =
      timestamp - (Math.random() * Calendar.dayMilliseconds) / 10;
    return [
      {
        startTime: randomStart1,
        endTime: randomStart1 + (Math.random() * Calendar.dayMilliseconds) / 5,
        name: "Feedback discussion",
      },
      {
        startTime: randomStart2,
        endTime: randomStart2 + (Math.random() * Calendar.dayMilliseconds) / 6,
        name: "Standup",
      },
    ];
  };

  generateAndAppendLayout = (cellTimestamps) => {
    this.cells = cellTimestamps.map((ts) => {
      const events = this.generateRandomEvents(ts);
      const day = new DayCell(ts, events);
      document.querySelector(".calendar--grid").appendChild(day.getLayout());

      return day;
    });
  };

  addActionListeners = () => {
    document
      .querySelector(".calendar--actions")
      .addEventListener("click", ({ target }) => {
        if (target.tagName === "BUTTON") {
          if (target.classList.contains("calendar--prev")) {
            this.offset--;
          } else if (target.classList.contains("calendar--next")) {
            this.offset++;
          } else {
            this.offset = 0;
          }

          const timestamps = this.generateTimeStamps(this.offset);
          const events = timestamps.map((ts) => this.generateRandomEvents(ts));

          this.cells.forEach((cell, i) =>
            cell.setTimestamp(timestamps[i], cell.setEvents(events[i]))
          );
        }
      });
  };
}

new Calendar();

// template for weekday cell -> day class
// week container as section (Calendar)
// event class -> event cell
// main class for wiring all together
// api util with static helper

// CALENDAR CLASS
// driver for entire application
// initializeApp -> draws reference to body elements, appends week layout inside body,
// initializes fetching of event data, adds event listener to buttons
// set heading for week dates
// Fetch event callback -> day.setEvents
