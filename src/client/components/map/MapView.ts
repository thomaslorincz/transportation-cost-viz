import * as mapboxgl from 'mapbox-gl';
import View from '../../superclasses/View';
import * as EventEmitter from 'eventemitter3';

export default class MapView extends View {
  private map: mapboxgl.Map;
  private readonly styling: object;

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

    const layerStyling = {
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
      },
    };

    this.map.on('load', (): void => {
      this.map.addLayer({
        'id': 'now-layer',
        'source': {
          type: 'vector',
          url: 'mapbox://thomaslorincz.8gxm2azy',
        },
        'source-layer': 'output_now-4zfpzz',
        ...layerStyling,
      });

      this.map.addLayer({
        'id': 'bau-layer',
        'source': {
          type: 'vector',
          url: 'mapbox://thomaslorincz.80dvwacw',
        },
        'source-layer': 'output_bau-2z8aqv',
        ...layerStyling,
      });

      this.map.addLayer({
        'id': 'preferred-layer',
        'source': {
          type: 'vector',
          url: 'mapbox://thomaslorincz.155zvvkh',
        },
        'source-layer': 'output_preferred-2ll722',
        ...layerStyling,
      });

      this.emitter.emit('loaded');
    });
  }

  /** Redraw data on the map. Colour based on selections. */
  public draw(scenario: string, property: string): void {
    this.map.setPaintProperty(
        `${scenario}-layer`,
        'circle-color',
        this.styling[property]
    );

    this.map.setLayoutProperty('now-layer', 'visibility', 'none');
    this.map.setLayoutProperty('bau-layer', 'visibility', 'none');
    this.map.setLayoutProperty('preferred-layer', 'visibility', 'none');

    this.map.setLayoutProperty(`${scenario}-layer`, 'visibility', 'visible');
  }
}
