type PerLanguage = {
  [key: string]: string;
};

export type DisplayType = {
  en: PerLanguage;
  fi: PerLanguage;
};

export type LangType = keyof DisplayType;

export type  IdBundle = {
  id: string; //data identifier
  label: string; //human readable name
};

export type StationDocument = {
  details: string;
  busses: Array<IdBundle>;
};