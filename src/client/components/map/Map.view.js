import mapboxgl from 'mapbox-gl';
import View from '../../superclasses/View';

// eslint-disable-next-line
export default class MapView extends View {
  /**
   * @param {HTMLElement} container
   */
  constructor(container) {
    super(container);

    mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFzbG9yaW5jeiIsImEiOiJjamx5aXVwaH' +
        'AxamZzM3dsaWdkZ3Q2eGJyIn0.mXjlp9c3l2-NBoS1uaEUdw';

    const href = 'href="https://github.com/thomaslorincz"';
    const rel = 'rel="noopener"';
    const target = 'target="_blank"';
    const credit = 'Developed by Thomas Lorincz';
    const attribution = `<a ${href} ${rel} ${target}>${credit}<a/>`;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/thomaslorincz/cjx0png073khh1cpap7m6449e',
      bounds: [[-115.11466, 53.04465], [-112.16116, 54.06214]],
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
    }).addControl(new mapboxgl.AttributionControl({
      customAttribution: attribution,
    }));

    this.costStyling = [
      'case',
      ['>', ['get', 'cost'], 14313], '#213E9A',
      ['>', ['get', 'cost'], 9759], '#9B1BBA',
      ['>', ['get', 'cost'], 5741], '#DA102C',
      ['>=', ['get', 'cost'], 0], '#F9E200',
      '#000000',
    ];

    this.proportionStyling = [
      'case',
      ['>', ['get', 'proportion'], 17], '#213E9A',
      ['>', ['get', 'proportion'], 10], '#9B1BBA',
      ['>', ['get', 'proportion'], 6], '#DA102C',
      ['>=', ['get', 'proportion'], 0], '#F9E200',
      '#000000',
    ];

    this.labels = {
      cost: [
        '$0 - $5741 (1st Quartile)',
        '$5742 - $9759 (2nd Quartile)',
        '$9760 - $14313 (3rd Quartile)',
        '$14314 - (4th Quartile)',
      ],
      proportion: [
        '0% - 6% (1st Quartile)',
        '7% - 10% (2nd Quartile)',
        '11% - 17% (3rd Quartile)',
        '18% - (4th Quartile)',
      ],
    };


    this.map.on('load', () => {
      this.map.addLayer({
        'id': 'dataLayer',
        'source': {
          type: 'vector',
          url: 'mapbox://thomaslorincz.87xvl8hq',
        },
        'source-layer': 'transport_costs_v3',
        'type': 'circle',
        'paint': {
          'circle-color': this.costStyling,
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'],
            0, 1,
            11, 1,
            13, 2,
            22, 2,
          ],
        },
      });

      this.container.dispatchEvent(new CustomEvent('loaded'));
    });

    document.querySelectorAll('.property-entry').forEach((entry) => {
      entry.addEventListener('click', (event) => {
        this.container.dispatchEvent(new CustomEvent('propertyClicked', {
          detail: event.target.dataset.value,
        }));
      });
    });
  }

  /**
   * Redraw data on the map. Colour based on property.
   * @param {string} property
   */
  draw(property) {
    const oldSelected = document.querySelector('.selected');
    if (oldSelected) {
      oldSelected.classList.remove('selected');
    }
    document.getElementById(`${property}-entry`).classList.add('selected');

    if (property === 'cost') {
      this.map.setPaintProperty(
          'dataLayer',
          'circle-color',
          this.costStyling
      );
    } else if (property === 'proportion') {
      this.map.setPaintProperty(
          'dataLayer',
          'circle-color',
          this.proportionStyling
      );
    }

    const labels = this.labels[property];
    document.getElementById('first-quartile').innerText = labels[0];
    document.getElementById('second-quartile').innerText = labels[1];
    document.getElementById('third-quartile').innerText = labels[2];
    document.getElementById('fourth-quartile').innerText = labels[3];
  }
}
