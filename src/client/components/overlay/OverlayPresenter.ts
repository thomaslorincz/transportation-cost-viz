import OverlayView from './OverlayView';
import AppModel from '../../app/AppModel';
import Presenter from '../../superclasses/Presenter';
import * as EventEmitter from 'eventemitter3';

export default class OverlayPresenter extends Presenter<AppModel, OverlayView> {
  public constructor(model: AppModel, view: OverlayView,
      emitter: EventEmitter) {
    super(model, view, emitter);

    this.emitter.on('overlayClicked', (overlay: string): void => {
      this.model.updateOverlay(overlay);
    });
  }
}
