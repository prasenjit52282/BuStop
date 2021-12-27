import { LitElement, html, css, nothing } from "lit-element";
import { myCustomEvent } from "./myCustomEvent";

export class MyMarker extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      lat: { type: Number },
      long: { type: Number },
      eta: {type: Array},
      type: { type: String },
    };
  }

  constructor() {
    super();
    this.lat = 23.52;
    this.long = 87.31;
    this.type = "BUS";
    this.name = `${this.lat}_${this.long}`;
    this.eta = ["test"];
    this.iconMap = {
      BUS: "component/assets/bus_stop.png",
      SIG: "component/assets/signal.png",
      TUR: "component/assets/turn.png",
      CONG: "component/assets/congestion.png",
      ADH: "component/assets/adhoc_congestion.png",
    };
  }

  mapTypeToIcon(type) {
    return this.iconMap[type];
  }

  firstUpdated() {
    // console.log("Event")
    this.dispatchEvent(
      new myCustomEvent(
        "place-marker",
        {
          detail: {
            message: "place marker event is launched",
          },
          bubbles: true,
          composed: true,
        },
        {
          name: this.name,
          lat: this.lat,
          long: this.long,
          eta: this.eta,
          icon: this.mapTypeToIcon(this.type),
        }
      )
    );
  }

  render() {
    return nothing;
  }
}

customElements.define("my-marker", MyMarker);
