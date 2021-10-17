import {LitElement, html} from 'lit-element';
import {google_map} from "./bower_components/google_map";

class MyMapSim extends LitElement {
  render() {
    return html`
      <div>Hello from MyElement!</div>
    `;
  }
}

customElements.define('my-map-sim', MyMapSim);