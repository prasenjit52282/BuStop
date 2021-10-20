import {LitElement, html, css} from 'lit-element';
import { Loader } from '@googlemaps/js-api-loader';
import api_key from './api';

export class MyMap extends LitElement {
  static get properties(){
    return { 
      lat: {type: Number},
      long:{type: Number}
    }
  }
  constructor(){
    super();
    this.lat=23.52;
    this.long=87.31
    this.map=null;
    this.loader = new Loader({
      apiKey: api_key,
      libraries: ["geometry"]
    });
  }
  static get styles() {
    return css`
      #map {
        height: 600px;
        width: 600px;
      }
    `;
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
      this.map=new google.maps.Map(div,{
        center:new google.maps.LatLng(this.lat,this.long),
        zoom:18,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      });
    });  
  }
}

customElements.define('my-map', MyMap);