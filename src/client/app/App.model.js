import Model from '../superclasses/Model';

/**
 * Model that stores and controls the app's data and state.
 */
export default class AppModel extends Model {
  // eslint-disable-next-line
  constructor() {
    super();

    this.property = 'cost';
  }

  /**
   * A method for dispatching the initial draw event of the app.
   */
  initialDraw() {
    document.dispatchEvent(new CustomEvent('updateMap', {
      detail: this.property,
    }));
  }

  /**
   * @param {string} property
   */
  updateProperty(property) {
    this.property = property;
    document.dispatchEvent(new CustomEvent('updateMap', {
      detail: this.property,
    }));
  }
}
