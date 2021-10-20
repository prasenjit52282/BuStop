import {LitElement, html, css} from 'lit-element';
import { Loader } from '@googlemaps/js-api-loader';
import api_key from '../credential/api';

export class MyMap extends LitElement {
  static get properties(){
    return { 
      lat: {type: Number},
      long:{type: Number},
      markers:{type:Array}
      }
  }

  static get styles() {
    return css`
      #map {
        height: 600px;
        width: 600px;
      }
    `;
  }

  constructor(){
    super();
    this.lat=23.52;
    this.long=87.31
    this.markers=[]
    this.map=null;
    this.loader = new Loader({
      apiKey: api_key,
      libraries: ["geometry"]
    });
    this.google=null;
  }

  connectedCallback(){
    super.connectedCallback();
    this.addEventListener('place-marker',this.placeMarker);
  }

  disconnectedCallback(){
    this.removeEventListener('place-marker',this.placeMarker);
    super.disconnectedCallback();
  }

  render() {
    return html`
      <div id="map">
      </div>
    `;
  }

  firstUpdated(){
    let div=this.shadowRoot.querySelector("#map")
    this.loader.load().then(google=>{
      this.google=google
      this.map=new google.maps.Map(div,{
        center:new google.maps.LatLng(this.lat,this.long),
        zoom:18,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      });
    }); 
  }

  placeMarker(event){
    // console.log("place")
    // console.log(event.data)
    this.markers.push(event.data);
  }

  plot(){
    // console.log("hi")
    // console.log(this.markers)
    this.markers.forEach(m=>{
      // console.log(this.map,"bye")
      new this.google.maps.Marker({
        map:this.map,
        position:new this.google.maps.LatLng(m.lat,m.long),
        icon:new this.google.maps.MarkerImage(m.icon)
      })
    })
  }
}

customElements.define('my-map', MyMap);