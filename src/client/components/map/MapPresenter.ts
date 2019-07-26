import Presenter from '../../superclasses/Presenter';
import AppModel from '../../app/AppModel';
import MapView from './MapView';
import * as EventEmitter from 'eventemitter3';

export default class MapPresenter extends Presenter<AppModel, MapView> {
  public constructor(model: AppModel, view: MapView, emitter: EventEmitter) {
    super(model, view, emitter);

    this.emitter.on('loaded', (): void => {
      this.model.initialDraw();
    });

    this.emitter.on('propertyClicked', (property: string): void => {
      this.model.updateProperty(property);
    });
  }
}
