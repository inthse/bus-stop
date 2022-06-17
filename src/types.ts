type PerLanguage = {
  [key: string]: string;
};

export type DisplayType = {
  en: PerLanguage;
  fi: PerLanguage;
};

export type LangType = keyof DisplayType;

//for each stop in list of stops
export type IdBundle = {
  gtfsId: string; //data identifier
  name: string; //human readable name
  vehicleMode?: string; //e.g. BUS
};

//for details of individual stops
export type StopDocument = {
  gtfsId: string;
  name: string;
  desc: string;
  lat?: number;
  lon?: number;
  zoneId?: string;
  routes?: Array<IdBundle>;
  vehicleMode?: string; //e.g. BUS
};