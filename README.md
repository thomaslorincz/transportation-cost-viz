[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
# Transportation Cost Visualization
A data visualization comparison of household transportation costs in the Edmonton Central Metropolitan Area.

(Transportation Cost Visualization is a web app built with [React](https://reactjs.org/), [deck.gl](https://deck.gl/#/), and [react-map-gl](https://uber.github.io/react-map-gl/#/))
## Website
https://cost-viz.herokuapp.com

Note: All modern browsers except Internet Explorer are supported
## Development
### Setup
#### Requirements
- [Node.js](https://nodejs.org/) >=12.0.0
- [npm](https://www.npmjs.com/) >=6.0.0 (included with Node.js)
#### Install Dependencies
```
npm install
```
#### Set Environment Variables
Create a ```.env``` file in the project root directory.
Inside, add your [Mapbox API Access Token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/):
```
MAPBOX_TOKEN=...
```
### Update Data
To update the data of this tool, please use the [transportation-cost-viz-data](https://github.com/thomaslorincz/transportation-cost-viz-data) project.

When new data is produced, replace the appropriate file in the ```src/client/assets/data``` directory.
### Build
Note: Code building/bundling is performed using [Webpack](https://webpack.js.org/)
#### Development Mode
(The code is not minified and has access to [source map](https://webpack.js.org/configuration/devtool/) tools and [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/))
```
npm run build:dev
```
#### Production Mode
(The code is minified and does not have access to [source map](https://webpack.js.org/configuration/devtool/) tools or [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/))
```
npm run build:prod
```
### Run
Note: Setup must be completed and the code must be built in order to run
```
npm start
```
