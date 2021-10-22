import { LitElement, html, css } from "lit-element";
import "./map-elements/my-map";
import "./map-elements/my-marker";
import "./map-elements/my-polyline";
import { data } from "../mock/bus_stops";

export class MyDashboard extends LitElement {
  constructor() {
    super();
    this.data = data;
    this.polyline_data = [];
  }

  render() {
    console.log("render", this.polyline_data)
    return html`
      <div>
        <button @click=${this.play}>Play</button>
        <my-map>
          ${this.data.map((d) => {
            return html`<my-marker
              name="${d.lat}_${d.long}"
              lat=${d.lat}
              long=${d.long}
              type=${d.type}
              for="normal"
            ></my-marker>`;
          })}

          <my-polyline name="route" .points=${this.data}></my-polyline>
        </my-map>
      </div>
    `;
  }

  play() {
    alert("Play button is clicked. It does nothing for now.")
  }
}

customElements.define("my-dashboard", MyDashboard);
