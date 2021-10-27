import { LitElement, html, css, nothing } from "lit-element";
import "./my-dashboard";

export class MyPlayer extends LitElement {
  static get properties() {
    return {
      playbackSpeed: { type: Number },
      gt_data: { type: Array },
      polyline_data: { type: Array },
      content: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      .no-padding {
        padding: 12px 0 12px 0px;
      }

      .no-margin {
        margin: 0;
      }

      .bg-lightgray {
        background-color: lightgray;
      }

      .text {
        font-family: monospace;
        font-weight: bold;
        font-size: 16px;
      }

      .form-check-input:checked {
        background-color: #565555;
        border-color: #565555;
    }
    `;
  }

  constructor() {
    super();
    this.gt_data = null;
    this.polyline_data = null;
    this.playbackSpeed = 1;
    this.content = true;
  }

  renderDashboard() {
    return html`${this.gt_data && this.polyline_data
      ? html`<my-dashboard
          playbackSpeed=${this.playbackSpeed}
          gt_data=${this.gt_data}
          polyline_data=${this.polyline_data}
        ></my-dashboard>`
      : html`<my-dashboard
          playbackSpeed=${this.playbackSpeed}
        ></my-dashboard>`}`;
  }

  render() {
    return html` <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"
      ></script>
      <div class="no-padding no-margin bg-lightgray text">
        <nav class="nav">
          <div class="mt-3 ms-3">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio0"
                value="1"
                checked
                @click=${this.setPlaybackSpeed}
              />
              <label class="form-check-label" for="inlineRadio1">1x</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="20"
                @click=${this.setPlaybackSpeed}
              />
              <label class="form-check-label" for="inlineRadio1">2x</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="100"
                @click=${this.setPlaybackSpeed}
              />
              <label class="form-check-label" for="inlineRadio2">10x</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="200"
                @click=${this.setPlaybackSpeed}
              />
              <label class="form-check-label" for="inlineRadio3">20x</label>
            </div>
          </div>

          <button
            type="button"
            class="btn btn-dark ms-auto me-3"
            @click=${this.reload}
          >
            Reload
          </button>
        </nav>
      </div>
      ${this.content ? this.renderDashboard() : nothing}`;
  }

  setPlaybackSpeed(event) {
    this.playbackSpeed = event.target.value;
    console.log("playbackspeed", this.playbackSpeed);
  }

  reload() {
    this.content = false;
    this.requestUpdate();
    this.updateComplete.then(() => {
      this.content = true;
    });
  }
}

customElements.define("my-player", MyPlayer);
