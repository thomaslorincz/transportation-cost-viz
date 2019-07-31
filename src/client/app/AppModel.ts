import Model from '../superclasses/Model';
import * as EventEmitter from 'eventemitter3';

/** Model that stores and controls the app's data and state. */
export default class AppModel extends Model {
  private scenario: string = 'now';
  private property: string = 'cost';

  public constructor(emitter: EventEmitter) {
    super(emitter);
  }

  /** A method for dispatching the initial draw event of the app. */
  public initialDraw(): void {
    this.dispatchDisplayUpdate();
  }

  /** Update the currently selected scenario. */
  public updateScenario(scenario: string): void {
    this.scenario = scenario;
    this.dispatchDisplayUpdate();
  }

  /** Update the currently selected property. */
  public updateProperty(property: string): void {
    this.property = property;
    this.dispatchDisplayUpdate();
  }

  /** Dispatch an updateDisplay event. */
  private dispatchDisplayUpdate(): void {
    this.emitter.emit('updateDisplay', {
      scenario: this.scenario,
      property: this.property,
    });
  }
}
