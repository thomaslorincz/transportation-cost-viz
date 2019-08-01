import View from '../../superclasses/View';
import * as EventEmitter from 'eventemitter3';

export default class OverlayView extends View {
  public constructor(container: Element, emitter: EventEmitter) {
    super(container, emitter);

    this.container.querySelectorAll('.overlay-entry')
        .forEach((entry: HTMLElement): void => {
          entry.addEventListener('click', (event: Event): void => {
            if (event.target instanceof HTMLElement) {
              this.emitter.emit('overlayClicked', event.target.dataset.value);
            }
          });
        });
  }

  /** Redraw the overlay panel according to what is selected. */
  public draw(overlay: string): void {
    const lastSelected = this.container.querySelector('.selected');
    if (lastSelected) {
      lastSelected.classList.remove('selected');
    }
    document.getElementById(`${overlay}-entry`).classList.add('selected');
  }
}
