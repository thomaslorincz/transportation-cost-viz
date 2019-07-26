import Presenter from '../superclasses/Presenter';
import MapView from '../components/map/MapView';
import MapPresenter from '../components/map/MapPresenter';
import View from '../superclasses/View';
import * as EventEmitter from 'eventemitter3';
import AppModel from './AppModel';

export default class AppPresenter extends Presenter {
  protected model: AppModel;
  private readonly mapView: MapView;

  public constructor(model: AppModel, view: View, emitter: EventEmitter) {
    super(model, view, emitter);

    this.mapView = new MapView(document.getElementById('map'), this.emitter);
    new MapPresenter(this.model, this.mapView, this.emitter);

    this.emitter.on('updateMap', (property: string): void => {
      this.mapView.draw(property);
    });
  }
}
