import Presenter from '../superclasses/Presenter';
import MapView from '../components/map/Map.view';
import MapPresenter from '../components/map/Map.presenter';

/** @class */
export default class AppPresenter extends Presenter {
  /**
   * @param {AppModel} model
   * @param {View} view
   * @param {EventEmitter} emitter
   */
  constructor(model, view, emitter) {
    super(model, view, emitter);

    this.mapView = new MapView(document.getElementById('map'), this.emitter);
    new MapPresenter(this.model, this.mapView, this.emitter);

    this.emitter.on('updateMap', (property) => {
      this.mapView.draw(property);
    });
  }
}
