// EVENT CLASS
// startTime, endTime, name
// binds to event template

export default class DateEvent {
  layoutRef;

  constructor(startTime, endTime, name) {
    this.template = document.getElementById("event");
    this.startTime = startTime;
    this.endTime = endTime;
    this.name = name;
  }

  getLayout = () => {
    if (!this.layoutRef) {
      const clone = this.template.content.cloneNode(true);
      this.layoutRef = clone.querySelector(".event");

      this.layoutRef.querySelector(".event--name").textContent = this.name;

      const startHour = new Date(this.startTime).getHours();
      const startMins = new Date(this.startTime).getMinutes();

      const startString = `${
        startHour >= 12 ? startHour - 12 : startHour
      }:${startMins} ${startHour >= 12 ? "PM" : "AM"}`;

      const endHour = new Date(this.endTime).getHours();
      const endMins = new Date(this.endTime).getMinutes();

      const endString = `${endHour >= 12 ? endHour - 12 : endHour}:${endMins} ${
        endHour >= 12 ? "PM" : "AM"
      }`;

      this.layoutRef.querySelector(
        ".event--hours"
      ).textContent = `${startString}  -  ${endString}`;
    }

    this.layoutRef.addEventListener(
      "DOMNodeInserted",
      this.setEventHeightandTransform
    );

    return this.layoutRef;
  };

  setEventHeightandTransform = () => {
    setTimeout(() => {
      const start = new Date(this.startTime).getTime();
      const end = new Date(this.endTime).getTime();

      const parentContainer = this.layoutRef.closest(".day--events");

      const hourUnit = parentContainer.getBoundingClientRect().height / 24;

      const height = ((end - start) / (1000 * 60 * 60)) * hourUnit;

      this.layoutRef.style.setProperty(
        "height",
        `${height > 45 ? height : 45}px`
      );

      this.layoutRef.style.setProperty(
        "transform",
        `translateY(${new Date(this.startTime).getHours() * hourUnit}px)`
      );
    }, 0);
  };
}
