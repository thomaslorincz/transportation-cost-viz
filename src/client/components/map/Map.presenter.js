import Presenter from '../../superclasses/Presenter';

// eslint-disable-next-line
export default class MapPresenter extends Presenter {
  /**
   * @param {AppModel} model
   * @param {MapView} view
   */
  constructor(model, view) {
    super(model, view);

    document.addEventListener('updateMap', (event) => {
      this.view.draw(event.detail);
    });

    this.view.container.addEventListener('loaded', () => {
      this.model.initialDraw();
    });

    this.view.container.addEventListener('propertyClicked', (event) => {
      this.model.updateProperty(event.detail);
    });
  }
}
