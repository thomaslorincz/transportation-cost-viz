import {describe, it} from 'mocha';
import {expect} from 'chai';
import EventEmitter from 'eventemitter3';
import AppModel from '../src/client/app/App.model';

describe('AppModel', () => {
  describe('#updateProperty', () => {
    it('should update the selected property', () => {
      const model = new AppModel(new EventEmitter());
      expect(model.property).to.equal('cost');
      model.updateProperty('proportion');
      expect(model.property).to.equal('proportion');
    });
  });
});
