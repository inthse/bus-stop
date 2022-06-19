import { useState } from 'react';
import { CssBaseline, CircularProgress } from '@mui/material';

import { ShortStop, LangType, DetailStop } from './types';
import labels from './translations.json'; //interface text in different languages
import { defaultShortStop, defaultStop } from './utility/constants';
import useApi from './hooks/useApi';
import TitleBar from './components/TitleBar';
import SelectBusStop from './components/SelectBusStop';
import CardBusStop from './components/CardBusStop';
import busStopImage from './assets/undraw_bus_stop.svg';

const App = () => {
  //state getters and setters
  const [lang, setLang] = useState('en') as [
    LangType,
    (arg0: LangType) => void
  ]; //for setting interface language
  const [stopValue, setStopValue] = useState(defaultShortStop); //bus stop picked by user
  const [stopList, setStopList] = useState([defaultShortStop]); //list of bus stop options from api
  const [stop, setStop] = useState(defaultStop); //detailed stop data from api
  const [loading, setLoading] = useState(false); //for displaying loading indicator
  const [sendRequest] = useApi(); //trigger for api call

  //called when user starts typing
  const searchStop = async (search: string) => {
    //display loading indicator
    setLoading(true);
    //send query to api
    const response = (await sendRequest(
      'stopsByName',
      search
    )) as ShortStop[];
    setStopList(response);
    //remove loading indicator so response will display
    setLoading(false);
  };

  //called when user picks a stop from the list
  const pickStop = async (newValue: ShortStop | null) => {
    if (newValue) {
      //display loading indicator
      setLoading(true);
      //set value in state
      setStopValue(newValue);
      //send query to api
      const response = (await sendRequest(
        'stop',
        newValue.gtfsId
      )) as DetailStop;
      setStop(response);
      //remove loading indicator so response will display
      setLoading(false);
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
          labels={labels[lang].app}
          value={stopValue}
          searchValue={searchStop}
          setValue={pickStop}
          options={stopList}
          loading={loading}
        />
        {!stopValue.gtfsId ? (
          <img width="100%" src={busStopImage} alt="bus stop" />
        ) : (
          loading ? <CircularProgress /> : (
            <CardBusStop
              labels={labels[lang]}
              stop={stop}
            />
          )
        )}
      </main>
    </>
  );
};

export default App;
