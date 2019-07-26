import * as EventEmitter from 'eventemitter3';
import AppModel from './app/AppModel';
import AppPresenter from './app/AppPresenter';
import './style.css';

// Needed for Hot Module Replacement
if (typeof(module['hot']) !== 'undefined') {
  module['hot'].accept();
}

const emitter = new EventEmitter();
new AppPresenter(new AppModel(emitter), null, emitter);
