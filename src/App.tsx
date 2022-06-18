import { useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';

import { ShortStop, LangType, DetailStop } from './types';
import TitleBar from './components/TitleBar';
import SelectBusStop from './components/SelectBusStop';
import CardBusStop from './components/CardBusStop';
import useApi from './hooks/useApi';
import busStopImage from './assets/undraw_bus_stop.svg';
import labels from './translations.json'; //interface text in different languages

const App = () => {
  //state default values
  const defaultShortStop: ShortStop = {
    gtfsId: '',
    name: '',
  };
  const defaultStop: DetailStop = { gtfsId: '', name: '', desc: '' };

  //state getters and setters
  const [lang, setLang] = useState('en') as [
    LangType,
    (arg0: LangType) => void
  ]; //for setting interface language
  const [stopValue, setStopValue] = useState(defaultShortStop); //to be picked by user
  const [stopList, setStopList] = useState([defaultShortStop]); //immediately fetched from api
  const [stop, setStop] = useState(defaultStop); //will be fetched from api
  const [sendRequest] = useApi();

  //fetched when component mounts
  useEffect(() => {
    async function fetchInitialData() {
      const response = (await sendRequest('stops')) as ShortStop[];
      setStopList(response);
    }
    fetchInitialData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //called when user picks a stop from the list
  const pickStop = async (newValue: ShortStop | null) => {
    if (newValue) {
      //set value in state
      setStopValue(newValue);
      //send query to api
      const response = (await sendRequest(
        'stop',
        newValue.gtfsId
      )) as DetailStop;
      setStop(response);
    } else {
      //if user's selection is null, revert to default
      setStopValue(defaultShortStop);
    }
  };

  return (
    <>
      <CssBaseline />
      <TitleBar lang={lang} setLang={setLang} />
      <main>
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
            labels={labels[lang].CardBusStop}
          />
        )}
      </main>
    </>
  );
};

export default App;
