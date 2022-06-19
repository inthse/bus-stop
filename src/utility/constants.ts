import { ShortStop, DetailStop } from '../types';
import makeGraphQuery from './makeGraphQuery';

//App.tsx
export const defaultShortStop: ShortStop = {
  gtfsId: '',
  name: '',
  vehicleMode: '',
};

export const defaultStop: DetailStop = {
  gtfsId: '',
  name: '',
  desc: '',
  lat: 0,
  lon: 0,
  zoneId: '',
  locationType: '',
  wheelchairBoarding: '',
  routes: [],
  stoptimesForPatterns: [],
};


//useApi.ts
const patternNested = makeGraphQuery(
  'pattern',
  ['id', 'route {\nshortName\n}'],
  '',
  '',
  true
);

const stoptimesNested = makeGraphQuery(
  'stoptimes',
  [
    'headsign',
    'serviceDay',
    'realtimeArrival',
    'arrivalDelay',
    'realtimeDeparture',
    'departureDelay',
    'pickupType',
    'dropoffType',
    'realtime',
  ],
  '',
  '',
  true
);

export const stoptimesForPatternsNested = makeGraphQuery(
  'stoptimesForPatterns',
  [patternNested.query, stoptimesNested.query],
  '',
  '',
  true
);

export const routesNested = makeGraphQuery(
  'routes',
  ['gtfsId', 'shortName', 'longName', 'bikesAllowed'],
  '',
  '',
  true
);