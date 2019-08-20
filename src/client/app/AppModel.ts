import Model from '../superclasses/Model';
import * as EventEmitter from 'eventemitter3';
import * as d3 from 'd3';
import StatisticsDatum from '../lib/StatisticsDatum';

/** Model that stores and controls the app's data and state. */
export default class AppModel extends Model {
  private scenario: string = 'now';
  private property: string = 'cost';
  private overlay: string = 'city';
  private infoVisible: boolean = false;
  private scenarioSequence: Map<string, string> = new Map<string, string>();
  private animating: boolean = false;
  private statistics: StatisticsDatum[] = [];

  private animationInterval: number = undefined;
  private coloursInverted: boolean = false;
  private ranges: Map<string, [number[], number[], number[], number[]]>;

  private readonly data: Map<string, {cost: number; proportion: number}[]>;

  public constructor(emitter: EventEmitter) {
    super(emitter);
    this.scenarioSequence.set('now', 'bau');
    this.scenarioSequence.set('bau', 'preferred');
    this.scenarioSequence.set('preferred', 'now');

    this.ranges = new Map<string, [number[], number[], number[], number[]]>();
    this.ranges.set('cost', [
      [0, 499],
      [500, 749],
      [750, 1000],
      [1000, Number.MAX_SAFE_INTEGER],
    ]);
    this.ranges.set('proportion', [
      [0, 4],
      [5, 9],
      [10, 14],
      [15, Number.MAX_SAFE_INTEGER],
    ]);

    this.data = new Map<string, {cost: number; proportion: number}[]>();
    this.data.set('now', []);
    this.data.set('bau', []);
    this.data.set('preferred', []);

    Promise.all([
      d3.csv('assets/data/output_now_v17.csv'),
      d3.csv('assets/data/output_bau_v17.csv'),
      d3.csv('assets/data/output_preferred_v17.csv'),
    ]).then(([nowData, bauData, preferredData]): void => {
      for (let i = 0; i < nowData.length; i++) {
        this.data.get('now').push({
          cost: Math.round((parseInt(nowData[i]['cost']) * 1000) / 12),
          proportion: parseInt(nowData[i]['proportion']),
        });
      }

      for (let i = 0; i < bauData.length; i++) {
        this.data.get('bau').push({
          cost: Math.round((parseInt(bauData[i]['cost']) * 1000) / 12),
          proportion: parseInt(bauData[i]['proportion']),
        });
      }

      for (let i = 0; i < preferredData.length; i++) {
        this.data.get('preferred').push({
          cost: Math.round((parseInt(preferredData[i]['cost']) * 1000) / 12),
          proportion: parseInt(preferredData[i]['proportion']),
        });
      }
    });
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

  public toggleAnimation(): void {
    if (this.animating) {
      this.animating = false;
      window.clearInterval(this.animationInterval);
    } else {
      this.animating = true;
      this.animationInterval = window.setInterval((): void => {
        this.updateScenario(this.scenarioSequence.get(this.scenario));
      }, 2000);
    }
    this.dispatchDisplayUpdate();
  }

  /** Update the currently selected property. */
  public updateProperty(property: string): void {
    this.property = property;
    this.dispatchDisplayUpdate();
  }

  public toggleColourInversion(): void {
    this.coloursInverted = !this.coloursInverted;
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

  public updateStatistics(): void {
    const data = this.data.get(this.scenario);
    const ranges = this.ranges.get(this.property);

    const statistics: StatisticsDatum[] = [];
    for (let id = 0; id < 4; id++) {
      statistics.push(new StatisticsDatum(id, '', 0));
    }

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < ranges.length; j++) {
        if (ranges[j][0] <= data[i][this.property]
            && data[i][this.property] <= ranges[j][1]) {
          statistics[j].value++;
        }
      }
    }

    for (let id = 0; id < statistics.length; id++) {
      statistics[id].value
          = Math.round((statistics[id].value / data.length) * 100);
      statistics[id].label = `${statistics[id].value}%`;
    }

    this.statistics = statistics;
  }

  /** Dispatch an updateDisplay event. */
  private dispatchDisplayUpdate(): void {
    this.updateStatistics();
    this.emitter.emit('updateDisplay', {
      scenario: this.scenario,
      property: this.property,
      overlay: this.overlay,
      infoVisible: this.infoVisible,
      animating: this.animating,
      inverted: this.coloursInverted,
      statistics: this.statistics,
    });
  }
}
