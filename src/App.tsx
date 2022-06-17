import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import { IdBundle, LangType, StopDocument } from './types';
import SelectBusStop from './components/SelectBusStop';
import CardBusStop from './components/CardBusStop';
import useApi from './hooks/useApi';
import busStopImage from './undraw_bus_stop.svg';
import labels from './translations.json'; //interface text in different languages

const App = () => {
  //state default values
  const defaultBundle: IdBundle = {
    gtfsId: '',
    name: '',
  };
  const defaultArray: IdBundle[] = [];
  const defaultStop: StopDocument = { gtfsId: '', name: '', desc: '' };

  //state getters and setters
  const [lang, setLang] = useState('en') as [
    LangType,
    (arg0: LangType) => void
  ]; //for setting interface language
  const [stopValue, setStopValue] = useState(defaultBundle); //picked by user
  const [stopList, setStopList] = useState(defaultArray); //fetched from api
  const [stop, setStop] = useState(defaultStop); //fetched from api
  const [sendRequest] = useApi();

  //fetched when component mounts
  useEffect(() => {
    async function fetchInitialData() {
      const response = (await sendRequest('stops')) as IdBundle[];
      //todo: validate response
      setStopList(response);
    }
    fetchInitialData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //called when user picks a stop from the list
  const pickStop = async (newValue: IdBundle | null) => {
    if (newValue) {
      //set value in state
      setStopValue(newValue);
      //send query to api
      const response = (await sendRequest(
        'stop',
        newValue.gtfsId
      )) as StopDocument;
      setStop(response);
    } else {
      //if user's selection is null, revert to default
      setStopValue(defaultBundle);
    }
  };

  return (
    <main>
      <Typography component="h1">Linja</Typography>
      <SelectBusStop
        label={labels[lang].busStop}
        value={stopValue}
        setValue={pickStop}
        options={stopList}
      />
      {!stopValue.gtfsId ? (
        <img width="100%" src={busStopImage} alt="bus stop" />
      ) : (
        <CardBusStop
          stop={stop}
          stopName={stopValue.name}
          labels={labels[lang]}
        />
      )}
    </main>
  );
};

export default App;
