import Presenter from '../superclasses/Presenter';
import MapView from '../components/map/MapView';
import MapPresenter from '../components/map/MapPresenter';
import View from '../superclasses/View';
import * as EventEmitter from 'eventemitter3';
import AppModel from './AppModel';
import LegendView from '../components/legend/LegendView';
import LegendPresenter from '../components/legend/LegendPresenter';
import OverlayView from '../components/overlay/OverlayView';
import OverlayPresenter from '../components/overlay/OverlayPresenter';

export default class AppPresenter extends Presenter<AppModel, View> {
  private readonly mapView: MapView;
  private readonly legendView: LegendView;
  private readonly overlayView: OverlayView;

  public constructor(model: AppModel, view: View, emitter: EventEmitter) {
    super(model, view, emitter);

    this.mapView = new MapView(document.getElementById('map'), this.emitter);
    new MapPresenter(this.model, this.mapView, this.emitter);

    this.legendView = new LegendView(
        document.getElementById('legend'),
        this.emitter
    );
    new LegendPresenter(this.model, this.legendView, this.emitter);

    this.overlayView = new OverlayView(
        document.getElementById('overlay'),
        this.emitter
    );
    new OverlayPresenter(this.model, this.overlayView, this.emitter);

    this.emitter.on('updateDisplay', ({scenario, property, overlay}): void => {
      this.mapView.draw(scenario, property, overlay);
      this.legendView.draw(scenario, property);
      this.overlayView.draw(overlay);
    });
  }
}
