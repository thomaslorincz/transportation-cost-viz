import Model from '../superclasses/Model';
import * as EventEmitter from 'eventemitter3';

/** Model that stores and controls the app's data and state. */
export default class AppModel extends Model {
  private property: string = 'cost';

  public constructor(emitter: EventEmitter) {
    super(emitter);
  }

  /** A method for dispatching the initial draw event of the app. */
  public initialDraw(): void {
    this.emitter.emit('updateMap', this.property);
  }

  /** Update the currently selected property. */
  public updateProperty(property: string): void {
    this.property = property;
    this.emitter.emit('updateMap', this.property);
  }
}
