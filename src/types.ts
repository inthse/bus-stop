export type LabelType = {
  en: { [key: string]: string; };
  fi: { [key: string]: string; };
};

//for properties of imported translations file
export type LangType = keyof LabelType;

//for details of routes (busses)
export type DetailRoute = {
  gtfsId: string;
  shortName: string;
  longName: string;
  bikesAllowed?: string; //e.g. NO_INFORMATION, NOT_ALLOWED, ALLOWED
};

//for each stop in list of stops
export type ShortStop = {
  gtfsId: string; //data identifier
  name: string; //human readable name
  vehicleMode?: string; //e.g. BUS
};

//for details of individual stops
export type DetailStop = {
  gtfsId: string;
  name: string;
  desc: string;
  lat?: number;
  lon?: number;
  zoneId?: string;
  locationType?: string; //e.g. STATION or STOP
  wheelchairBoarding?: string; //e.g. NO_INFORMATION, POSSIBLE, NOT_POSSIBLE
  routes?: Array<DetailRoute>;
};
