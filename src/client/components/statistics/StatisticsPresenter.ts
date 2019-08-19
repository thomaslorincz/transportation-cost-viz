import Presenter from '../../superclasses/Presenter';
import AppModel from '../../app/AppModel';
import StatisticsView from './StatisticsView';
import * as EventEmitter from 'eventemitter3';

export default class StatisticsPresenter
  extends Presenter<AppModel, StatisticsView> {
  public constructor(model: AppModel, view: StatisticsView,
      emitter: EventEmitter) {
    super(model, view, emitter);

    this.emitter.on('histogramClicked', (): void => {
      this.model.updateChart('histogram');
    });

    this.emitter.on('pieChartClicked', (): void => {
      this.model.updateChart('pie-chart');
    });
  }
}
