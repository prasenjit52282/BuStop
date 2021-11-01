import { LitElement, html, css } from "lit-element";
import { Loader } from "@googlemaps/js-api-loader";
import "./my-clock-element";
import { api_key, map_id } from "../credential/api";

export class MyMap extends LitElement {
  static get properties() {
    return {
      lat: { type: Number },
      long: { type: Number },
      playbackSpeed: { type: Number },
    };
  }

  static get styles() {
    return css`
      #map {
        height: 75vh;
        width: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.lat = 23.49471008;
    this.long = 87.31699141;
    this.playbackSpeed = 1;
    this.markers = {};
    this.infoWindows = {};
    this.polyLines = {};
    this.clocks = {};
    // this.timers = [];
    this.map = null;
    this.loader = new Loader({
      version: "quarterly",
      apiKey: api_key,
      libraries: ["geometry"],
    });
    this.google = null;
    this.iconMap = {
      BUS: "component/assets/bus_stop.png",
      BUS_SKIP: "component/assets/bus_stop_grey.png",
      SIG: "component/assets/signal.png",
      TUR: "component/assets/turn.png",
      CONG: "component/assets/congestion.png",
      ADH: "component/assets/adhoc_congestion.png",
      SIG_CONG: "component/assets/sig_cong.png",
      TUR_CONG: "component/assets/tur_cong.png",
      TUR_SIG: "component/assets/tur_sig.png",
      TUR_SIG_CONG: "component/assets/tur_sig_cong.png",
      VEH: "component/assets/bus.png",
    };
    this.busMarker = null;
    this.circle = null;
  }

  mapTitle(type) {
    const titleMap = {
      BUS: "Bus Stop",
      BUS_SKIP: "Skipped Bus Stop",
      SIG: "Signal",
      TUR: "Turn",
      CONG: "Congestion",
      ADH: "Adhoc",
      SIG_CONG: "Signal + Congestion",
      TUR_CONG: "Turn + Congestion",
      TUR_SIG: "Turn + Signal",
      TUR_SIG_CONG: "Turn + Signal + Congestion",
    };
    return titleMap[type];
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("place-marker", this.placeMarker);
    this.addEventListener("place-clock", this.placeClock);
    this.addEventListener("place-polyline", this.placePolyLine);
  }

  disconnectedCallback() {
    this.removeEventListener("place-marker", this.placeMarker);
    this.removeEventListener("place-clock", this.placeClock);
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
      this.map = new this.google.maps.Map(div, {
        center: new this.google.maps.LatLng(this.lat, this.long),
        zoom: 14,
        mapId: map_id,
        mapTypeId: this.google.maps.MapTypeId.ROADMAP,
      });
      this.plot();
    });
  }

  placeMarker(event) {
    this.markers[event.data.name] = event.data;
  }

  placeClock(event) {
    this.clocks[event.data.id] = event.data.element;
  }

  placePolyLine(event) {
    this.polyLines[event.data.name] = event.data;
  }

  plot() {
    Object.keys(this.markers).forEach((key, i) => {
      // console.log(key);
      let m = this.markers[key];
      this.markers[key] = new this.google.maps.Marker({
        title: "Bus Stop",
        map: this.map,
        position: new this.google.maps.LatLng(m.lat, m.long),
        icon: new this.google.maps.MarkerImage(m.icon),
      });
      this.markers[key]["eta"] = m.eta;

      this.infoWindows[key] = new this.google.maps.InfoWindow({
        content: this.clocks[key],
        position: new this.google.maps.LatLng(m.lat, m.long),
      });

      this.markers[key].addListener("click", () => {
        this.infoWindows[key].open({
          map: this.map,
          // anchor: this.markers[key],
          shouldFocus: false,
        });
      });
    });

    Object.keys(this.polyLines).forEach((key) => {
      let points = this.polyLines[key].points;

      this.polyLines[key] = new this.google.maps.Polyline({
        path: [],
        geodesic: true,
        strokeColor: "#6ca8bd",
        strokeOpacity: 0.7,
        strokeWeight: 4,
        editable: false,
        map: this.map,
      });

      this.busMarker = new this.google.maps.Marker({
        title: "Bus",
        map: this.map,
        icon: new this.google.maps.MarkerImage(this.iconMap["VEH"]),
      });

      this.circle =  new this.google.maps.Circle({
        strokeColor: "#6ca8bd",
        strokeOpacity: 0.7,
        strokeWeight: 2,
        fillColor: "#6ca8bd",
        fillOpacity: 0.2,
        map: this.map,
        radius: 30,
      });

      let waitTime = [];
      let prevTime = 0;
      points.forEach((p, i) => {
        waitTime.push(prevTime);
        prevTime += p.duration;
      });

      points.forEach((p, i) => {
        setTimeout(() => {
          let currentPoint = new this.google.maps.LatLng(p.lat, p.long);

          this.polyLines[key].getPath().push(currentPoint);
          this.circle.setCenter(currentPoint)
          this.busMarker.setPosition(currentPoint);

          this.map.panTo(currentPoint);

          if (p.type === "BUS") {
            let id = p.id;
            let skipped = p.skip;

            if (skipped) {
              this.markers[id].setIcon(this.iconMap["BUS_SKIP"]);
              this.markers[id].setTitle(this.mapTitle("BUS_SKIP"));
            }

            this.infoWindows[id].close();

            let currentIdNmbr = parseInt(id.split("BS")[1]);

            Object.keys(this.infoWindows).forEach((k, idx) => {
              if (idx >= currentIdNmbr) {
                try {
                  this.clocks[k].setTime(this.markers[id].eta[parseInt(idx)]);
                } catch (error) {
                  // pass
                }
              }
            });

            let nextId = parseInt(id.split("BS")[1]) + 1;
            if (nextId < 28) {
              this.infoWindows[`BS${nextId}`].open({
                map: this.map,
                shouldFocus: false,
              });
            }
          } else if (p.type !== "TRAIL" && p.type !== "BUS") {
            this.markers[key] = new this.google.maps.Marker({
              map: this.map,
              // animation: this.google.maps.Animation.DROP,
              title: this.mapTitle(p.type),
              position: { lat: p.lat, lng: p.long },
              icon: new this.google.maps.MarkerImage(this.iconMap[p.type]),
            });
          }
        }, waitTime[i] * parseInt(1000 / this.playbackSpeed));
      });
    });
  }
}

customElements.define("my-map", MyMap);
