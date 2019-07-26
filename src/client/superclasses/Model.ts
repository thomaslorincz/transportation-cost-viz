import * as EventEmitter from 'eventemitter3';

export default class Model {
  protected emitter: EventEmitter;

  public constructor(emitter: EventEmitter) {
    this.emitter = emitter;
  }
}
