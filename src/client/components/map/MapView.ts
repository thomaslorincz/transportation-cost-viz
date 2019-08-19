import * as mapboxgl from 'mapbox-gl';
import View from '../../superclasses/View';
import * as EventEmitter from 'eventemitter3';

export default class MapView extends View {
  private map: mapboxgl.Map;
  private readonly styling: object;
  private readonly invertedStyling: object;

  public constructor(container: Element, emitter: EventEmitter) {
    super(container, emitter);

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
      minZoom: 8,
    }).addControl(new mapboxgl.AttributionControl({
      customAttribution: attribution,
    }));

    this.styling = {
      cost: [
        'case',
        ['>=', ['get', 'cost'], 12], '#2345B2',
        ['>=', ['get', 'cost'], 9], '#BA1BBA',
        ['>=', ['get', 'cost'], 6], '#FF4111',
        ['>=', ['get', 'cost'], 0], '#FFCC00',
        '#000000',
      ],
      proportion: [
        'case',
        ['>=', ['get', 'proportion'], 15], '#2345B2',
        ['>=', ['get', 'proportion'], 10], '#BA1BBA',
        ['>=', ['get', 'proportion'], 5], '#FF4111',
        ['>=', ['get', 'proportion'], 0], '#FFCC00',
        '#000000',
      ],
    };

    this.invertedStyling = {
      cost: [
        'case',
        ['>=', ['get', 'cost'], 12], '#FFCC00',
        ['>=', ['get', 'cost'], 9], '#FF4111',
        ['>=', ['get', 'cost'], 6], '#BA1BBA',
        ['>=', ['get', 'cost'], 0], '#2345B2',
        '#000000',
      ],
      proportion: [
        'case',
        ['>=', ['get', 'proportion'], 15], '#FFCC00',
        ['>=', ['get', 'proportion'], 10], '#FF4111',
        ['>=', ['get', 'proportion'], 5], '#BA1BBA',
        ['>=', ['get', 'proportion'], 0], '#2345B2',
        '#000000',
      ],
    };

    const circleLayerStyling = {
      'type': 'circle',
      'paint': {
        'circle-color': this.styling['cost'],
        'circle-radius': [
          'interpolate', ['linear'], ['zoom'],
          0, 1,
          11, 1,
          13, 2,
          22, 2,
        ],
        'circle-opacity-transition': {
          'duration': 1000,
          'delay': 0,
        },
      },
    };

    this.map.on('load', (): void => {
      this.map.addLayer({
        'id': 'now-layer',
        'source': {
          type: 'vector',
          url: 'mapbox://thomaslorincz.4wzkqtyd',
        },
        'source-layer': 'output_now_v17-dzfkd2',
        ...circleLayerStyling,
      });

      this.map.addLayer({
        'id': 'bau-layer',
        'source': {
          type: 'vector',
          url: 'mapbox://thomaslorincz.416sq4pj',
        },
        'source-layer': 'output_bau_v17-d6o0lt',
        ...circleLayerStyling,
      });

      this.map.addLayer({
        'id': 'preferred-layer',
        'source': {
          type: 'vector',
          url: 'mapbox://thomaslorincz.4qhi3in5',
        },
        'source-layer': 'output_preferred_v17-1mmrtt',
        ...circleLayerStyling,
      });

      const boundaryLayerStyling = {
        'type': 'line',
        'paint': {
          'line-color': '#FFFFFF',
          'line-width': 1,
          'line-opacity-transition': {
            'duration': 500,
            'delay': 0,
          },
        },
      };

      this.map.addLayer({
        'id': 'nc-layer',
        'source': {
          type: 'vector',
          url: 'mapbox://thomaslorincz.d571qaco',
        },
        'source-layer': 'nc_CityII-axaip8',
        ...boundaryLayerStyling,
      });

      this.map.addLayer({
        'id': 'city-layer',
        'source': {
          type: 'vector',
          url: 'mapbox://thomaslorincz.48okpw5t',
        },
        'source-layer': 'city_boundary-d6ewoz',
        ...boundaryLayerStyling,
      });

      this.map.addLayer({
        'id': 'cma-layer',
        'source': {
          type: 'vector',
          url: 'mapbox://thomaslorincz.1kz18y39',
        },
        'source-layer': 'cma_boundary-5vtklc',
        ...boundaryLayerStyling,
      });

      this.emitter.emit('loaded');
    });
  }

  /** Redraw data on the map. Colour based on selections. */
  public draw(scenario: string, property: string, overlay: string,
      inverted: boolean): void {
    const styling = (inverted)
        ? this.invertedStyling[property]
        : this.styling[property];
    this.map.setPaintProperty('now-layer', 'circle-color', styling);
    this.map.setPaintProperty('bau-layer', 'circle-color', styling);
    this.map.setPaintProperty('preferred-layer', 'circle-color', styling);

    // Set visibility for circle layers
    this.map.setPaintProperty('now-layer', 'circle-opacity', 0);
    this.map.setPaintProperty('bau-layer', 'circle-opacity', 0);
    this.map.setPaintProperty('preferred-layer', 'circle-opacity', 0);

    this.map.setPaintProperty(`${scenario}-layer`, 'circle-opacity', 1);

    // Set visibility for boundary layers
    this.map.setPaintProperty('nc-layer', 'line-opacity', 0);
    this.map.setPaintProperty('city-layer', 'line-opacity', 0);
    this.map.setPaintProperty('cma-layer', 'line-opacity', 0);

    this.map.setPaintProperty(`${overlay}-layer`, 'line-opacity', 1);
  }
}
