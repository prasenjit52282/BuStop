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

      .back-btn {
        max-width:50%;
      }
    `;
  }

  constructor() {
    super();
    this.gt_data = null;
    this.polyline_data = null;
    this.playbackSpeed = 50;
    this.content = true;
    this.speedControlSettings = {
      "1x": 1,
      "2x": 20,
      "5x": 50,
      "10x": 100,
      "20x": 200,
    };
  }

  renderDashboard() {
    return html`${this.gt_data && this.polyline_data
      ? html`<my-dashboard
          playbackSpeed=${this.playbackSpeed}
          .gt_data=${this.gt_data}
          .polyline_data=${this.polyline_data}
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
          <a class="ms-3 mt-2" href="/"><img class="back-btn" src="component/assets/previous.png"/></a>
          <div class="mt-3 ms-3">
            ${Object.keys(this.speedControlSettings).map((key, i) => {
              return i === 2
                ? html`<div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio${i}"
                      value="${this.speedControlSettings[key]}"
                      checked
                      @click=${this.setPlaybackSpeed}
                    />
                    <label class="form-check-label" for="inlineRadio${i}"
                      >${key}</label
                    >
                  </div>`
                : html`<div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio${i}"
                      value="${this.speedControlSettings[key]}"
                      @click=${this.setPlaybackSpeed}
                    />
                    <label class="form-check-label" for="inlineRadio${i}"
                      >${key}</label
                    >
                  </div>`;
            })}
          </div>

          <button
            type="button"
            class="btn btn-dark ms-auto me-3"
            @click=${this.reload}
          >
            Update
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
