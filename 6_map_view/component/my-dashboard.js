import {LitElement, html, css} from 'lit-element';
import "./map-elements/my-map";
import "./map-elements/my-marker";
import {data} from "../mock/bus_stops";

export class MyDashboard extends LitElement {

  render() {
    return html`
    <div>
      <button @click=${this.play}>Play</button>
      <my-map>
            ${data.map(d=>{
              return html`<my-marker lat=${d.lat} long=${d.long} type=${d.type}></my-marker>`;
            })}
        </my-map>
    </div>
    `;
  }

  play(){
    this.shadowRoot.querySelector("my-map").plot();
  }
}

customElements.define('my-dashboard', MyDashboard);