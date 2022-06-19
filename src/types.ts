export type NestedLabel = {
  [key: string]: string;
};

export type LabelType = {
  en: { [key: string]: NestedLabel; };
  fi: { [key: string]: NestedLabel; };
};

//for properties of imported translations file
export type LangType = keyof LabelType;

//for details of routes (busses)
export type DetailRoute = {
  gtfsId: string;
  shortName: string;
  longName: string;
  bikesAllowed: string; //e.g. NO_INFORMATION, NOT_ALLOWED, ALLOWED
};

export type DetailPattern = {
  directionId: number;
  headsign: string;
  id: string;
  name: string;
  route: {
    shortName: string;
  };
};

export type DetailStoptime = {
  arrivalDelay: number;
  departureDelay: number;
  dropoffType: string;
  headsign: string;
  pickupType: string;
  realtime: boolean;
  realtimeArrival: number;
  realtimeDeparture: number;
  serviceDay: number;
  shortName?: string;
};

export type StoptimesForPatterns = {
  pattern: DetailPattern;
  stoptimes: DetailStoptime[];
};

//for each stop in list of stops
export type ShortStop = {
  gtfsId: string; //data identifier
  name: string; //human readable name
  vehicleMode: string; //e.g. BUS
};

//for details of individual stops
export type DetailStop = {
  desc: string;
  gtfsId: string;
  lat: number;
  locationType: string; //e.g. STATION or STOP
  lon: number;
  name: string;
  routes: Array<DetailRoute>;
  stoptimesForPatterns: Array<StoptimesForPatterns>;
  wheelchairBoarding: string; //e.g. NO_INFORMATION, POSSIBLE, NOT_POSSIBLE
  zoneId: string;
};
