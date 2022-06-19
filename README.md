# Linja - find your bus connection

View the app live on [Netlify](https://linja-busapp.netlify.app/)

## Description
**Linja** is a simple web app created to help people in the Helsinki area search for bus stops by name, see the stop details, and view all busses that visit the stop. The UI language can be switched between Finnish and English.

## Installation instructions to run locally
Clone this repository and run `npm install` in the root directory. Run `npm start` to start the app in development mode, or `npm test` to run tests.

### Directory structure
In the `src` folder, the main body of the app can be found in `App.tsx` while individual components can be found in their own `components` subfolders. Some logic can be found in separate functions in the `hooks` and `utility` folders. There are also a few tests, which are located with the files they test.

## Tech stack
This app was made using [Create React App](https://github.com/facebook/create-react-app) and TypeScript. Tests are written with Jest. Styling is done with the Material UI library and regular CSS. Data source is the [DigiTransit API](https://digitransit.fi/en/developers/apis/1-routing-api/). Because this app only needs to make a few GraphQL queries, the native `fetch` function was used instead of installing an entire GraphQL library.

## Next steps
If development continues, some features for the next version could include:
- display any active alerts for each bus route
- display a small map using the latitude and longitude data instead of only a link to Google Maps
- ask for browser location permission to automatically find the nearest bus stops
