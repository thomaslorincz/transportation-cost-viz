import Presenter from '../../superclasses/Presenter';
import LegendView from './LegendView';
import AppModel from '../../app/AppModel';
import * as EventEmitter from 'eventemitter3';

export default class LegendPresenter extends Presenter<AppModel, LegendView> {
  public constructor(model: AppModel, view: LegendView, emitter: EventEmitter) {
    super(model, view, emitter);

    this.emitter.on('scenarioClicked', (scenario: string): void => {
      this.model.updateScenario(scenario);
    });

    this.emitter.on('propertyClicked', (property: string): void => {
      this.model.updateProperty(property);
    });
  }
}
