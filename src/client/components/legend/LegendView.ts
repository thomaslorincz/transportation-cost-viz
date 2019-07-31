import View from '../../superclasses/View';
import * as EventEmitter from 'eventemitter3';

export default class LegendView extends View {
  private readonly labels: object;

  public constructor(container: Element, emitter: EventEmitter) {
    super(container, emitter);

    this.labels = {
      cost: [
        '$0 - $499/month',
        '$500 - $749/month',
        '$750 - $999/month',
        '$1000+/month',
      ],
      proportion: [
        '0% - 4%',
        '5% - 9%',
        '10% - 14%',
        '15%+',
      ],
    };

    this.container.querySelectorAll('.scenario-entry')
        .forEach((entry: HTMLElement): void => {
          entry.addEventListener('click', (event: Event): void => {
            if (event.target instanceof HTMLElement) {
              this.emitter.emit('scenarioClicked', event.target.dataset.value);
            }
          });
        });

    this.container.querySelectorAll('.property-entry')
        .forEach((entry: HTMLElement): void => {
          entry.addEventListener('click', (event: Event): void => {
            if (event.target instanceof HTMLElement) {
              this.emitter.emit('propertyClicked', event.target.dataset.value);
            }
          });
        });
  }

  /** Redraw the legend according to what is selected. */
  public draw(scenario: string, property: string): void {
    const lastSelected = this.container.querySelectorAll('.selected');
    lastSelected.forEach((element: HTMLElement): void => {
      element.classList.remove('selected');
    });

    document.getElementById(`${scenario}-entry`).classList.add('selected');
    document.getElementById(`${property}-entry`).classList.add('selected');

    const labels = this.labels[property];
    document.getElementById('first-bin').innerText = labels[0];
    document.getElementById('second-bin').innerText = labels[1];
    document.getElementById('third-bin').innerText = labels[2];
    document.getElementById('fourth-bin').innerText = labels[3];
  }
}
