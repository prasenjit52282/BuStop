import { LitElement, html, css } from "lit-element";
import { myCustomEvent } from "./myCustomEvent";

export class MyClockElement extends LitElement {
  static get properties() {
    return {
      time: { type: String },
    };
  }

  static get styles() {
    return css`
      .time-text {
        font-weight: bold;
        font-size: 10px;
        font-family: monospace;
      }
    `;
  }

  constructor() {
    super();
    this.time = "00:00:00";
  }

  setTime(currentTime) {
    this.time = currentTime;
  }

  render() {
    return html`
      <p class="time-text">ETA: ${this.time}</p>
      `;
  }

  firstUpdated() {
    // console.log("Event")
    this.dispatchEvent(
      new myCustomEvent(
        "place-clock",
        {
          detail: {
            message: "place clock event is launched",
          },
          bubbles: true,
          composed: true,
        },
        {
          id: this.id,
          element: this,
        }
      )
    );
  }
}

customElements.define("my-clock-element", MyClockElement);
