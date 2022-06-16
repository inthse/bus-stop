import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import { DisplayType, IdBundle, LangType, StationDocument } from './types';
import SelectBusStop from './components/SelectBusStop';
import CardBusStop from './components/CardBusStop';
import useApi from './hooks/useApi';
import busStopImage from './undraw_bus_stop.svg';

//interface text values in different languages
const display: DisplayType = {
  en: {
    busStop: 'Bus Stop',
    youSelected: 'Selected bus stop:',
  },
  fi: {
    busStop: 'Bus Stop',
    youSelected: 'Selected bus stop:',
  },
};

const App = () => {
  //state default values
  const defaultBundle: IdBundle = {
    id: '',
    label: '',
  };
  const defaultArray: IdBundle[] = [];
  const defaultStation: StationDocument = { details: '', busses: defaultArray };

  //state getters and setters
  const [lang, setLang] = useState('en') as [
    LangType,
    (arg0: LangType) => void
  ]; //for setting interface language
  const [stationValue, setStationValue] = useState(defaultBundle); //picked by user
  const [stationList, setStationList] = useState(defaultArray); //fetched from api
  const [station, setStation] = useState(defaultStation); //fetched from api
  const [sendRequest] = useApi();

  //fetched when component mounts
  useEffect(() => {
    async function fetchInitialData() {
      const response = (await sendRequest('stops')) as IdBundle[];
      //todo: validate response
      setStationList(response);
    }
    fetchInitialData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //called when user picks a station from the list
  const pickStation = async (newValue: IdBundle | null) => {
    if (newValue) {
      //set value in state
      setStationValue(newValue);
      //send query to api
      const response = (await sendRequest(
        'stop',
        newValue.id
      )) as StationDocument;
      //todo: validate response
      setStation(response);
    } else {
      //if user's selection is null, revert to default
      setStationValue(defaultBundle);
    }
  };

  return (
    <main>
      <Typography component="h1">Linja</Typography>
      <SelectBusStop
        label={display[lang].busStop}
        value={stationValue}
        setValue={pickStation}
        options={stationList}
      />
      {!stationValue.id ? (
        <img width="100%" src={busStopImage} alt="bus stop" />
      ) : (
        <CardBusStop
          youSelected={display[lang].youSelected}
          stationName={stationValue.label}
          station={station}
        />
      )}
    </main>
  );
};

export default App;
