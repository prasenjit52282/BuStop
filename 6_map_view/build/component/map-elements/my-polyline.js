import { LitElement, html, css, nothing } from "lit-element";
import { myCustomEvent } from "./myCustomEvent";

export class MyPloyLine extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      points: {type: Array}
    };
  }

  constructor() {
    super();
    this.name = "PolyLine"
    this.points = [
        {
            "lat": 23.49471008,
            "long": 87.31699141,
            "type": "BUS"
        },
        {
            "lat": 23.49320866,
            "long": 87.31643745,
            "type": "BUS"
        }
    ]
  }

  shouldUpdate(changedProperties) {
    return true;
  }

  updated() {
    // console.log("Event")
    this.dispatchEvent(
      new myCustomEvent(
        "place-polyline",
        {
          detail: {
            message: "place ployline event is launched",
          },
          bubbles: true,
          composed: true,
        },
        {
          name: this.name,
          points: this.points
        }
      )
    );
  }

  render() {
    return nothing;
  }
}

customElements.define("my-polyline", MyPloyLine);
