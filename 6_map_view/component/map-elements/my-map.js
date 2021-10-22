import { LitElement, html, css } from "lit-element";
import { Loader } from "@googlemaps/js-api-loader";
import api_key from "../credential/api";

export class MyMap extends LitElement {
  static get properties() {
    return {
      lat: { type: Number },
      long: { type: Number },
      markers: { type: Array },
    };
  }

  static get styles() {
    return css`
      #map {
        height: 600px;
        width: 600px;
      }
    `;
  }

  constructor() {
    super();
    this.lat = 23.52;
    this.long = 87.31;
    this.markers = {};
    this.polyLines = {};
    this.map = null;
    this.loader = new Loader({
      apiKey: api_key,
      libraries: ["geometry"],
    });
    this.google = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("place-marker", this.placeMarker);
    this.addEventListener("place-polyline", this.placePolyLine);
  }

  disconnectedCallback() {
    this.removeEventListener("place-marker", this.placeMarker);
    this.removeEventListener("place-polyline", this.placePolyLine);
    super.disconnectedCallback();
  }

  render() {
    return html` <div id="map"></div> `;
  }

  firstUpdated() {
    let div = this.shadowRoot.querySelector("#map");
    this.loader.load().then((google) => {
      this.google = google;
      this.map = new google.maps.Map(div, {
        center: new google.maps.LatLng(this.lat, this.long),
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      this.plot();
    });
  }

  placeMarker(event) {
    // console.log("place")
    // console.log(event.data)
    this.markers[event.data.name] = event.data;
  }

  placePolyLine(event) {
    this.polyLines[event.data.name] = event.data;
  }

  plot() {
    // console.log("hi")
    // console.log(this.markers)
    Object.keys(this.markers).forEach((key) => {
      // console.log(this.map,"bye")
      let m = this.markers[key];
      this.markers[key] = new this.google.maps.Marker({
        map: this.map,
        position: new this.google.maps.LatLng(m.lat, m.long),
        icon: new this.google.maps.MarkerImage(m.icon),
      });
    });

    console.log(this.polyLines);
    Object.keys(this.polyLines).forEach((key) => {
      let points = this.polyLines[key].points;

      this.polyLines[key] = new this.google.maps.Polyline({
        path: [],
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        editable: false,
        map: this.map,
      });

      points.forEach((p, i) => {
        setTimeout(() => {
          this.polyLines[key]
            .getPath()
            .push(new this.google.maps.LatLng(p.lat, p.long));
        }, i * 1000);
      });
    });
  }
}

customElements.define("my-map", MyMap);
