import { LitElement, html, css } from "lit-element";
import "./map-elements/my-map";
import "./map-elements/my-marker";
import "./map-elements/my-polyline";
import "./map-elements/my-clock-element";
import obj from "../mock/bus_stops";

export class MyDashboard extends LitElement {
  static get properties() {
    return {
      playbackSpeed: { type: Number },
      gt_data: { type: Array },
      polyline_data: { type: Array },
    };
  }

  constructor() {
    super();
    this.gt_data = obj.gt_data;
    this.polyline_data = obj.route_data;
    this.playbackSpeed = 1;
  }

  render() {
    console.log("render", this.polyline_data);
    return html`
      <div>
        <my-map playbackSpeed=${this.playbackSpeed}>
          ${this.gt_data.reverse().map((d, i) => {
            return html`<my-marker
                name="${d.lat}_${d.long}"
                lat=${d.lat}
                long=${d.long}
                type=${d.type}
                for="normal"
              ></my-marker>
              <my-clock-element id="${d.lat}_${d.long}"></my-clock-element>`;
          })}

          <my-polyline name="route" .points=${this.polyline_data}></my-polyline>
        </my-map>
      </div>
    `;
  }
}

customElements.define("my-dashboard", MyDashboard);
