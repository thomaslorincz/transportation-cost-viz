import Model from './Model';
import View from './View';
import * as EventEmitter from 'eventemitter3';

export default class Presenter {
  protected model: Model;
  protected view: View;
  protected emitter: EventEmitter;

  public constructor(model: Model, view: View, emitter: EventEmitter) {
    this.model = model;
    this.view = view;
    this.emitter = emitter;
  }
}
