import { LitElement, html, css, nothing } from 'lit-element';
import { myCustomEvent } from './myCustomEvent';

export class MyMarker extends LitElement {
    static get properties() {
        return {
            lat: { type: Number },
            long: { type: Number },
            type: { type: String }
        }
    }

    constructor() {
        super();
        this.lat = 23.52;
        this.long = 87.31
        this.type= "BUS";
        this.iconMap={
            "BUS":"http://maps.google.com/mapfiles/ms/micons/blue.png",
            "SIG":"http://maps.google.com/mapfiles/ms/micons/blue.png",
            "TUR":"http://maps.google.com/mapfiles/ms/micons/blue.png",
            "ADH":"http://maps.google.com/mapfiles/ms/micons/blue.png"}
    }


    mapTypeToIcon(type){
        return this.iconMap[type]
    }

    firstUpdated() {
        // console.log("Event")
        this.dispatchEvent(new myCustomEvent('place-marker', {
            detail: {
                message: 'place marker event is launched'
            },
            bubbles: true, 
            composed: true 
        },
            {
                lat: this.lat,
                long: this.long,
                icon: this.mapTypeToIcon(this.type)
            }))
    }

    render() {
        return nothing;
    }
}

customElements.define('my-marker', MyMarker);