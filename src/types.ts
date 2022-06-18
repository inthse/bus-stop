export type LabelType = {
  en: { [key: string]: string; };
  fi: { [key: string]: string; };
};

//for properties of imported translations file
export type LangType = keyof LabelType;

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
  routes?: Array<ShortStop>;
  vehicleMode?: string; //e.g. BUS
};
