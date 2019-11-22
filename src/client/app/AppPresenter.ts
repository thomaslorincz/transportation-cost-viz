import Presenter from '../superclasses/Presenter';
import MapView from '../components/map/MapView';
import MapPresenter from '../components/map/MapPresenter';
import View from '../superclasses/View';
import * as EventEmitter from 'eventemitter3';
import AppModel from './AppModel';
import LegendView from '../components/legend/LegendView';
import LegendPresenter from '../components/legend/LegendPresenter';
import StatisticsView from '../components/statistics/StatisticsView';
import StatisticsPresenter from '../components/statistics/StatisticsPresenter';
import OverlayView from '../components/overlay/OverlayView';
import OverlayPresenter from '../components/overlay/OverlayPresenter';
import InfoView from '../components/info/InfoView';
import InfoPresenter from '../components/info/InfoPresenter';

export default class AppPresenter extends Presenter<AppModel, View> {
  private readonly mapView: MapView;
  private readonly legendView: LegendView;
  private readonly statisticsView: StatisticsView;
  private readonly overlayView: OverlayView;
  private readonly infoView: InfoView;

  public constructor(model: AppModel, view: View, emitter: EventEmitter) {
    super(model, view, emitter);

    this.mapView = new MapView(document.getElementById('map'), this.emitter);
    new MapPresenter(this.model, this.mapView, this.emitter);

    this.legendView = new LegendView(
        document.getElementById('legend'),
        this.emitter,
    );
    new LegendPresenter(this.model, this.legendView, this.emitter);

    this.statisticsView = new StatisticsView(
        document.getElementById('statistics'),
        this.emitter,
    );
    new StatisticsPresenter(this.model, this.statisticsView, this.emitter);

    this.overlayView = new OverlayView(
        document.getElementById('overlay'),
        this.emitter,
    );
    new OverlayPresenter(this.model, this.overlayView, this.emitter);

    this.infoView = new InfoView(
        document.getElementById('info-button'),
        this.emitter,
    );
    new InfoPresenter(this.model, this.infoView, this.emitter);

    this.emitter.on(
        'updateDisplay',
        ({scenario, property, overlay, infoVisible, animating,
          inverted, statistics}): void => {
          this.mapView.draw(scenario, property, overlay, inverted);
          this.legendView.draw(scenario, property, animating, inverted);
          this.overlayView.draw(overlay);
          this.infoView.draw(infoVisible);
          this.statisticsView.draw(statistics, inverted);
        },
    );
  }
}
