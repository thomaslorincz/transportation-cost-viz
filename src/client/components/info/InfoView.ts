import View from '../../superclasses/View';
import * as EventEmitter from 'eventemitter3';

export default class InfoView extends View {
  private readonly infoWindow: HTMLElement;
  private readonly infoPage: HTMLElement;
  private readonly infoClose: HTMLElement;

  public constructor(container: Element, emitter: EventEmitter) {
    super(container, emitter);

    this.infoWindow = document.getElementById('info-window');
    this.infoPage = document.getElementById('info-page');
    this.infoClose = document.getElementById('info-close');

    this.container.addEventListener('click', (): void => {
      this.emitter.emit('infoButtonClicked');
    });

    this.infoWindow.addEventListener('click', (): void => {
      this.emitter.emit('infoWindowClicked');
    });

    this.infoPage.addEventListener('click', (event: Event): void => {
      event.stopPropagation();
    });

    this.infoClose.addEventListener('click', (event: Event): void => {
      event.stopPropagation();
      this.emitter.emit('infoCloseClicked');
    });
  }

  /** Show or hide the info window according to its visibility state. */
  public draw(visible: boolean): void {
    if (visible) {
      this.infoWindow.classList.add('visible');
    } else {
      this.infoWindow.classList.remove('visible');
    }
  }
}
