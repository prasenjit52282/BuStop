import {LitElement, html, css} from 'lit-element';
import "./map-elements/my-map";
import "./map-elements/my-marker";
import {data} from "../mock/bus_stops";

export class MyDashboard extends LitElement {

  constructor(){
    super();
    this.data=data
  }

  render() {
    return html`
    <div>
      <button @click=${this.play}>Play</button>
      <my-map>
            ${this.data.map(d=>{
              return html`<my-marker lat=${d.lat} long=${d.long} type=${d.type}></my-marker>`;
            })}
        </my-map>
    </div>
    `;
  }

  play(){
    const myMap=this.shadowRoot.querySelector("my-map")
    myMap.plot();
    const route = new myMap.google.maps.Polyline({
      path: [],
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
      editable: false,
      map: myMap.map,
    });

    this.data.forEach((d,i)=>{
      setTimeout(()=>{
        route.getPath().push(new google.maps.LatLng(d.lat, d.long));
      },i*1000);
    })
  }
}

customElements.define('my-dashboard', MyDashboard);