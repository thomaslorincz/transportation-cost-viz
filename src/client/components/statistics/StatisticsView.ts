import View from '../../superclasses/View';
import * as EventEmitter from 'eventemitter3';

export default class StatisticsView extends View {
  public constructor(container: Element, emitter: EventEmitter) {
    super(container, emitter);
  }
}
