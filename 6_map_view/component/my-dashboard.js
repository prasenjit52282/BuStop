import { LitElement, html, css } from "lit-element";
import "./map-elements/my-map";
import "./map-elements/my-marker";
import "./map-elements/my-polyline";
import "./map-elements/my-clock-element";

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
    this.gt_data = null;
    this.polyline_data = null;
    this.playbackSpeed = 1;
  }

  render() {
    return html`
      <div>
        <my-map .playbackSpeed=${this.playbackSpeed}>
          ${this.gt_data.map((d, i) => {
            return html`<my-marker
                name=${d.id}
                lat=${d.lat}
                long=${d.long}
                .eta=${d.ETA}
                type="BUS"
              ></my-marker>
              <my-clock-element id="${d.id}"></my-clock-element>`;
          })}

          <my-polyline name="route" .points=${this.polyline_data}></my-polyline>
        </my-map>
      </div>
    `;
  }
}

customElements.define("my-dashboard", MyDashboard);
