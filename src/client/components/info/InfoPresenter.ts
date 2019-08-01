import InfoView from './InfoView';
import AppModel from '../../app/AppModel';
import Presenter from '../../superclasses/Presenter';
import * as EventEmitter from 'eventemitter3';

export default class InfoPresenter extends Presenter<AppModel, InfoView> {
  public constructor(model: AppModel, view: InfoView, emitter: EventEmitter) {
    super(model, view, emitter);

    this.emitter.on('infoButtonClicked', (): void => {
      this.model.updateInfoVisibility(true);
    });

    this.emitter.on('infoWindowClicked', (): void => {
      this.model.updateInfoVisibility(false);
    });

    this.emitter.on('infoCloseClicked', (): void => {
      this.model.updateInfoVisibility(false);
    });
  }
}
