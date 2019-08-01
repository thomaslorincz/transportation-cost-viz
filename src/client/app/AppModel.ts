import Model from '../superclasses/Model';
import * as EventEmitter from 'eventemitter3';

/** Model that stores and controls the app's data and state. */
export default class AppModel extends Model {
  private scenario: string = 'now';
  private property: string = 'cost';
  private overlay: string = 'city';
  private infoVisible: boolean = false;

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

  /** Update the currently selected overlay. */
  public updateOverlay(overlay: string): void {
    this.overlay = overlay;
    this.dispatchDisplayUpdate();
  }

  /** Update the visible state of the info window. */
  public updateInfoVisibility(state: boolean): void {
    this.infoVisible = state;
    this.dispatchDisplayUpdate();
  }

  /** Dispatch an updateDisplay event. */
  private dispatchDisplayUpdate(): void {
    this.emitter.emit('updateDisplay', {
      scenario: this.scenario,
      property: this.property,
      overlay: this.overlay,
      infoVisible: this.infoVisible,
    });
  }
}
