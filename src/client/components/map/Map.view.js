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

    this.costStyling = {
      property: 'cost',
      stops: [
        [5741, '#F9E200'],
        [9759, '#DA102C'],
        [14313, '#9B1BBA'],
        [100000, '#213E9A'],
      ],
    };

    this.proportionStyling = {
      property: 'proportion',
      stops: [
        [6, '#F9E200'],
        [10, '#DA102C'],
        [17, '#9B1BBA'],
        [100, '#213E9A'],
      ],
    };

    this.map.on('load', () => {
      this.map.addLayer({
        'id': 'transportCosts',
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
  }
}
