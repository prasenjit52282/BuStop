import { LitElement, html, css, nothing, _$LE } from "lit-element";
import "./my-dashboard";
import "./my-player";

export class MyApp extends LitElement {
  static get properties() {
    return {
      dirStructure: { type: Object },
      selectedTrail: { type: String },
      playerData: { type: Object },
    };
  }

  constructor() {
    super();
    this.dirStructure = null;
    this.selectedTrail = null;
    this.playerData = null;
  }

  static get styles() {
    return css``;
  }

  render() {
    return html`<link
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

      <div class="container">
        <div class="row justify-content-center">
          ${this.playerData
            ? this.renderPlayer()
            : this.renderTrailOptionForm()}
        </div>
        <!-- row end -->
      </div>
      <!-- contianer end -->`;
  }

  legendTemplate() {
    return html`
      <div class="row justify-content-center fst-italic mt-2">
        <div class="col text-center">
          <img src="component/assets/bus_stop.png" width=32px height=32px/><span class="ms-1 me-4">Bus-Stop</span>
          <img src="component/assets/bus_stop_grey.png" width=32px height=32px/><span class="ms-1 me-4"
            >Skipped Bus-Stop</span
          >
          <img src="component/assets/signal.png" width=32px height=32px/><span class="ms-1 me-4">Signal</span>
          <img src="component/assets/turn.png" width=32px height=32px/><span class="ms-1 me-4">Turn</span>
          <img src="component/assets/adhoc_congestion.png" width=32px height=32px/><span class="ms-1 me-4">Ad-hoc</span>
          <img src="component/assets/congestion.png" width=32px height=32px/><span class="ms-1 me-4">Congestion</span>
        </div>
      </div>
    `;
  }

  renderPlayer() {
    return html`<div class="col" style="width: 70%">
        <div class="card shadow rounded-3">
          <div class="card-body p-0">
            <div class="row justify-content-center">
              <my-player
                .gt_data=${this.playerData.gt}
                .polyline_data=${this.playerData.route}
                content="true"
                .playbackSpeed="5"
              ></my-player>
            </div>
            <!-- card body row end -->
          </div>
          <!-- card body end -->
        </div>
        <!-- card end -->

        <div class="row m-3">
          <div class="row justify-content-center">${this.legendTemplate()}</div>
          <!-- row justify end -->
        </div>
        <!-- row m-3 end -->
      </div>
      <!-- col end -->`;
  }

  renderTrailOptionForm() {
    return html`<div class="col-6 mt-5">
        <div class="card shadow rounded-3">
          <div class="card-body">
            <h4 class="card-title">Choose a trail to continue:</h4>
            <div class="row justify-content-center">
              <div style="width:max-content">
                ${this.dirStructure
                  ? Object.keys(this.dirStructure).map((e, i) => {
                      return html`<div class="form-check">
                        ${i == 0
                          ? html`<input
                                class="form-check-input"
                                type="radio"
                                name="trailOptions"
                                id="trailOption${i}"
                                value="${this.dirStructure[e]}"
                                checked
                                @click=${this.setTrail}
                              />
                              <label
                                class="form-check-label"
                                for="trailOption${i}"
                                >${e.replace("_", " ")}</label
                              >`
                          : html`<input
                                class="form-check-input"
                                type="radio"
                                name="trailOptions"
                                id="trailOption${i}"
                                value="${this.dirStructure[e]}"
                                @click=${this.setTrail}
                              />
                              <label
                                class="form-check-label"
                                for="trailOption${i}"
                                >${e.replace("_", " ")}</label
                              >`}
                      </div>`;
                    })
                  : nothing}

                <button
                  type="button"
                  class="btn btn-dark ms-auto me-3"
                  @click=${this.submitTrail}
                >
                  Submit
                </button>
              </div>
              <!-- input form end -->
            </div>
            <!-- card row end -->
          </div>
          <!-- card body end -->
        </div>
        <!-- card end -->
      </div>
      <!-- col end -->`;
  }

  setTrail(event) {
    this.selectedTrail = event.target.value;
  }

  submitTrail() {
    fetch(this.selectedTrail)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          return res.json();
        } else {
          console.error(res.status, res.statusText);
        }
      })
      .then((data) => {
        console.log(data);
        this.playerData = data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  firstUpdated() {
    fetch("./component/assets/structure.json")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.status === 200);
          return res.json();
        }
      })
      .then((data) => {
        this.dirStructure = data;
        this.selectedTrail = Object.values(data)[0];
      })
      .catch(() => console.log("error"));
  }
}

customElements.define("my-app", MyApp);
