import {describe, it} from 'mocha';
import {expect} from 'chai';
import EventEmitter from 'eventemitter3';
import AppModel from '../src/client/app/App.model';

describe('AppModel', () => {
  describe('#initialDraw()', () => {
    it('should dispatch an updateMap event', () => {
      const emitter = new EventEmitter();
      const model = new AppModel(emitter);

      let mapUpdated = false;
      emitter.on('updateMap', () => {
        mapUpdated = true;
      });

      model.initialDraw();
      expect(mapUpdated).to.be.true;
    });
  });

  describe('#updateProperty()', () => {
    it('should update the selected property', () => {
      const model = new AppModel(new EventEmitter());
      expect(model.property).to.equal('cost');
      model.updateProperty('proportion');
      expect(model.property).to.equal('proportion');
    });

    it('should dispatch an updateMap event', () => {
      const emitter = new EventEmitter();
      const model = new AppModel(emitter);

      let mapUpdated = false;
      emitter.on('updateMap', () => {
        mapUpdated = true;
      });

      model.initialDraw();
      expect(mapUpdated).to.be.true;
    });
  });
});
