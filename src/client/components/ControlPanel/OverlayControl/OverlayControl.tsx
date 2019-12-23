import * as React from 'react';
import '../Control.css';

export class OverlayControl extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return (
      <div className="control overlay-control">
        <div className="title">Overlay</div>
        <div className="divider" />
        <div className="control-entry-container">
          <div
            id="nc-entry"
            className="control-entry overlay-entry selectable"
            data-value="nc"
          >
            <i className="material-icons">layers</i>
            <div className="entry-label">Nodes and Corridors</div>
          </div>
          <div
            id="city-entry"
            className="control-entry overlay-entry selectable"
            data-value="city"
          >
            <i className="material-icons">layers</i>
            <div className="entry-label">City Boundary</div>
          </div>
          <div
            id="cma-entry"
            className="control-entry overlay-entry selectable"
            data-value="cma"
          >
            <i className="material-icons">layers</i>
            <div className="entry-label">Central Metropolitan Area</div>
          </div>
        </div>
      </div>
    );
  }
}
